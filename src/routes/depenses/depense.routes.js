import express from "express";
import {
  creerDepense,
  deleteDepense,
  getDepenseById,
  getDepenses,
  updateDepense,
} from "../../controllers/depense/depenseController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// Créer une dépense
router.post("/", protect, creerDepense);

// Récupérer toutes les dépenses
router.get("/", getDepenses);

// Récupérer une dépense par ID
router.get("/:id", getDepenseById);

// Mettre à jour une dépense
router.put("/:id", updateDepense);

// Supprimer une dépense
router.delete("/:id", deleteDepense);

export default router;
