import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  updateUser,
  deleteUser,
  enableUser,
  disableUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getAllUsers,
  checkEmail,
  checkPhoneNumber,
  activateUser,
} from "../../controllers/auth/authController.js";
import { protect } from "../../middleware/auth.js"; // middleware pour vérifier JWT
const router = express.Router();

// ===================== AUTHENTIFICATION =====================
router.post("/register", register); // api/auth/register
router.post("/login", login); // api/auth/login
router.post("/logout", protect, logout); // api/auth/logout
router.get("/me", protect, getMe); // api/auth/me

// ===================== UTILISATEURS =====================
router.get("/", getAllUsers); // liste tous les users
router.put("/update/:id", protect, updateUser); // mettre à jour un user

// actions admin / superAdmin
router.put("/enable/:id", protect, enableUser); // activer un compte
router.put("/disable/:id", protect, disableUser); // désactiver un compte
router.delete("/delete/:id", protect, deleteUser); // supprimer (soft delete)

// ===================== MOT DE PASSE =====================
router.post("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ===================== VÉRIFICATIONS =====================
router.post("/check-email", checkEmail); // vérifier email
router.post("/check-phone-number", checkPhoneNumber); // vérifier téléphone

// ===================== ACTIVATION =====================
router.post("/activate", activateUser); // activation via token

export default router;
