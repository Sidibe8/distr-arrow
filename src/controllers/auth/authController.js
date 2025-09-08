import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../../models/user/User.js";
import UserSession from "../../models/user/User_session.js";
import Role from "../../models/role/Role.js";

// Générer un token JWT lié à une session
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role.name },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

// ===================== INSCRIPTION =====================
export const register = async (req, res) => {
  try {
    const { nom, prenom, email, password, role, phoneNumber } = req.body;
    console.log({
      nom: nom,
      prenom: prenom,
      Email: email,
      password: password,
      role: role,
      num: phoneNumber,
    });

    if (!nom || !prenom || !email || !password || !role) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email déjà utilisé" });

    const roleExists = await Role.findById(role);
    if (!roleExists) return res.status(400).json({ error: "Rôle invalide" });

    const newUser = await User.create({
      nom,
      prenom,
      email,
      password,
      role,
      phoneNumber,
      enabled: false, // compte non activé par défaut
      deleted: false,
      emailVerified: false,
      phoneVerified: false,
    });

    // Générer token activation si nécessaire
    const activationToken = crypto.randomBytes(32).toString("hex");
    newUser.activationToken = crypto
      .createHash("sha256")
      .update(activationToken)
      .digest("hex");
    await newUser.save();

    res.status(201).json({
      message: "Utilisateur créé, activation requise",
      user: {
        id: newUser._id,
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        role: newUser.role,
      },
      activationToken, // à envoyer par mail ou sms
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ===================== LOGIN =====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("role");
    if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

    if (user.deleted) return res.status(403).json({ error: "Compte supprimé" });
    if (!user.enabled)
      return res.status(403).json({ error: "Compte non activé" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ error: "Mot de passe incorrect" });

    // 🔴 Fermer l’ancienne session active (s’il y en a une)
    const lastSession = await UserSession.findOne({
      user: user._id,
      logout_time: { $exists: false },
    }).sort({ login_time: -1 });

    if (lastSession) {
      lastSession.logout_time = new Date();
      await lastSession.save();
    }

    // 🟢 Créer une nouvelle session
    const session = await UserSession.create({
      user: user._id,
      login_time: new Date(),
      ip_address: req.ip,
      device_info: req.headers["user-agent"] || "Inconnu",
    });

    // Générer le token avec sessionId
    const token = jwt.sign(
      { id: user._id, role: user.role.name, sessionId: session._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Mise à jour dernière connexion
    user.lastLogin = new Date();
    await user.save();

    res.json({
      token,
      user,
      sessionId: session._id,
      redirectUrl: "/",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===================== LOGOUT =====================
export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token manquant" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Trouver la dernière session ouverte pour cet utilisateur
    const session = await UserSession.findOne({
      user: decoded.id,
      logout_time: { $exists: false },
      ip_address: req.ip,
    }).sort({ login_time: -1 });

    if (session) {
      session.logout_time = new Date();
      await session.save();
    }

    res.json({ message: "Déconnecté avec succès" });
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });
  }
};

// ===================== GET ME =====================
export const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token manquant" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate("role");
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });
  }
};

// ===================== GET ALL USERS =====================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ===================== UPDATE USER =====================
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // ID de l'utilisateur à mettre à jour
    const updates = req.body; // Données à mettre à jour

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    // Vérifier si le requérant est le propriétaire ou un admin/superAdmin
    const requester = await User.findById(req.userId).populate("role");
    const isAdmin = ["Admin", "SuperAdmin"].includes(requester.role.nom);
    const isOwner = req.userId === id;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Action non autorisée" });
    }

    const allowedRoles = ["Admin", "SuperAdmin"];
    // Éviter certaines mises à jour sensibles pour les non-SuperAdmin
    if (!allowedRoles.includes(requester.role.nom)) {
      delete updates.role; // impossible de changer le rôle
      delete updates.enabled; // impossible d’activer/désactiver
      delete updates.deleted; // impossible de supprimer
    }

    // Mettre à jour uniquement les champs autorisés
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    await user.save();

    res.json({ message: "Utilisateur mis à jour avec succès", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===================== ENABLE USER =====================
export const enableUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    // Vérifier rôle du requérant
    const requester = await User.findById(req.userId).populate("role");
    if (!["Admin", "SuperAdmin"].includes(requester.role.name))
      return res.status(403).json({ error: "Action non autorisée" });

    user.enabled = true;
    await user.save();
    res.json({ message: "Compte activé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===================== DISABLE USER =====================
export const disableUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const requester = await User.findById(req.userId).populate("role");
    if (requester.role.nom !== "Admin")
      return res.status(403).json({ error: "Action non autorisée" });

    user.enabled = false;
    await user.save();
    res.json({ message: "Compte désactivé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===================== DELETE USER (SOFT) =====================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const requester = await User.findById(req.userId).populate("role");
    if (requester.role.nom !== "Admin")
      return res.status(403).json({ error: "Action non autorisée" });

    user.deleted = true;
    await user.save();
    res.json({ message: "Utilisateur supprimé (soft delete)" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===================== CHECK EMAIL / PHONE =====================
export const checkEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.json({ exists: !!user });
};

export const checkPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.body;
  const user = await User.findOne({ phoneNumber });
  res.json({ exists: !!user });
};

// ===================== FORGOT / RESET PASSWORD =====================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Vérifie si l’utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Générer le token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 3600000; // 1h
    await user.save();

    // Envoi de l’email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Réinitialisation du mot de passe",
      html: `
        <div class="email-container" style="width: 100%; background-color: #ffffff; overflow: hidden;">
          <!-- Header -->
          <div class="email-header" style="background: linear-gradient(135deg, #0a1929 0%, #1a3a75 100%); padding: 30px 20px; text-align: center; color: white;">
            <div class="email-logo" style="font-size: 28px; font-weight: bold; margin-bottom: 10px;">VotreApp</div>
            <h1 class="email-title" style="font-size: 24px; font-weight: 600; margin: 15px 0 10px 0;">Réinitialisation du mot de passe</h1>
          </div>
          
          <!-- Body -->
          <div class="email-body" style="padding: 40px 30px; color: #4a5568;">
            <p class="email-text" style="font-size: 16px; line-height: 1.7; margin-bottom: 25px;">
              Bonjour,<br><br>
              Vous avez demandé la réinitialisation de votre mot de passe. Cliquez
              sur le bouton ci-dessous pour créer un nouveau mot de passe.
            </p>
            
            <!-- Bouton de réinitialisation -->
            <a href="${resetURL}" class="reset-button" style="display: block; width: 100%; padding: 16px; background: linear-gradient(135deg, #2550a6 0%, #3a6bd4 100%); color: white; text-decoration: none; border-radius: 8px; text-align: center; font-weight: 600; font-size: 16px; margin: 30px 0; box-shadow: 0 4px 12px rgba(37, 80, 166, 0.3); transition: all 0.3s ease;">
              Réinitialiser mon mot de passe
            </a>
            
            <!-- Lien alternatif -->
            <p class="alternative-link" style="font-size: 14px; color: #718096; margin-top: 25px; text-align: center;">
              Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre
              navigateur :<br>
              <a href="${resetURL}" class="link-url" style="color: #3a6bd4; word-break: break-all; display: inline-block; margin-top: 10px; text-decoration: none;">
                ${resetURL}
              </a>
            </p>
            
            <!-- Note de sécurité -->
            <div class="security-notice" style="background-color: #f8fafc; border-left: 4px solid #e2e8f0; padding: 15px; margin-top: 30px; border-radius: 4px;">
              <p class="security-text" style="font-size: 14px; color: #718096; margin: 0;">
                <strong>Note de sécurité :</strong> Ce lien expirera dans 1 heure
                pour des raisons de sécurité. Si vous n'avez pas demandé cette
                réinitialisation, veuillez ignorer cet email.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="email-footer" style="background-color: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
            <p style="margin-bottom: 10px;">&copy; 2024 VotreApp. Tous droits réservés.</p>
            <div class="footer-links" style="margin: 10px 0;">
              <a href="#" class="footer-link" style="color: #3a6bd4; text-decoration: none; margin: 0 10px;">Support</a> • 
              <a href="#" class="footer-link" style="color: #3a6bd4; text-decoration: none; margin: 0 10px;">Confidentialité</a>
            </div>
          </div>
        </div>
    
  `,
    });
    res.json({ message: "Email de réinitialisation envoyé" });
  } catch (err) {
    console.error("Erreur forgotPassword:", err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Fonction pour réinitialiser le mot de passe
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token ou mot de passe manquant" });
    }

    const resetTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });

    console.log(user, "user");

    if (!user) {
      return res.status(400).json({ error: "Token invalide ou expiré" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (err) {
    console.error("Erreur resetPassword:", err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch)
      return res.status(400).json({ error: "Mot de passe incorrect" });

    user.password = newPassword;
    await user.save();

    res.json({ message: "Mot de passe changé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===================== ACTIVATE USER VIA TOKEN =====================
export const activateUser = async (req, res) => {
  try {
    const { token } = req.body;
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({ activationToken: tokenHash });
    if (!user) return res.status(400).json({ error: "Token invalide" });

    user.enabled = true;
    user.activationToken = undefined;
    await user.save();

    res.json({ message: "Compte activé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
