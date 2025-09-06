import express from "express";
import {
  creerMouvement,
  deleteMouvement,
  getMouvementById,
  getMouvements,
  updateMouvement,
} from "../../controllers/caisse/caisseController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// 📌 Créer un mouvement (entrée ou sortie)
router.post("/", protect, creerMouvement);

// 📌 Récupérer tous les mouvements
router.get("/", getMouvements);

// 📌 Récupérer un mouvement par ID
router.get("/:id", getMouvementById);

// 📌 Mettre à jour un mouvement
router.put("/:id", protect, updateMouvement);

// 📌 Supprimer un mouvement
router.delete("/:id", deleteMouvement);

export default router;
