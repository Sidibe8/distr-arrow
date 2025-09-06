import UserSession from "../../models/user/User_session.js";

// 🔹 GET all sessions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await UserSession.find()
      .populate("user", "nom prenom email role")
      .sort({ login_time: -1 });

    // Formater les données si nécessaire côté serveur
    const formatted = sessions.map((s) => ({
      id: s._id,
      user: s.user,
      ip_address: s.ip_address,
      device_info: s.device_info,
      login_time: s.login_time,
      logout_time: s.logout_time || null,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 GET sessions by user
export const getSessionsByUser = async (req, res) => {
  try {
    const sessions = await UserSession.find({ user: req.params.userId });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 GET single session
export const getSession = async (req, res) => {
  try {
    const session = await UserSession.findById(req.params.id).populate(
      "user",
      "nom prenom email"
    );
    if (!session)
      return res.status(404).json({ message: "Session non trouvée" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 CREATE session
export const createSession = async (req, res) => {
  try {
    const session = new UserSession(req.body);
    const saved = await session.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🔹 UPDATE session
export const updateSession = async (req, res) => {
  try {
    const updated = await UserSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🔹 DELETE session
export const deleteSession = async (req, res) => {
  try {
    await UserSession.findByIdAndDelete(req.params.id);
    res.json({ message: "Session supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
