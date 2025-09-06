import express from "express";
import {
  creerVente,
  deleteVente,
  getVenteById,
  getVentes,
  updateVente,
} from "../../controllers/vente/venteController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// CRUD ventes
router.post("/", protect, creerVente); // Créer une vente
router.get("/", getVentes); // Lister toutes les ventes
router.get("/:id", getVenteById); // Obtenir une vente par ID
router.put("/:id", updateVente); // Modifier une vente
router.delete("/:id", deleteVente); // Supprimer une vente

export default router;
