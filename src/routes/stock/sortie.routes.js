import express from "express";
import {
  creerStockSortie,
  getStockSorties,
  getStockSortieById,
  updateStockSortie,
  deleteStockSortie,
} from "../../controllers/stock/stockSortie.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// Routes pour StockSortie

// Créer une sortie
router.post("/", protect, creerStockSortie);

// Récupérer toutes les sorties
router.get("/", getStockSorties);

// Récupérer une sortie par ID
router.get("/:id", getStockSortieById);

// Mettre à jour une sortie
router.put("/:id", protect, updateStockSortie);

// Supprimer une sortie
router.delete("/:id", deleteStockSortie);

export default router;
