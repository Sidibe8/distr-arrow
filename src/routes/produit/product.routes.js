import express from "express";
import {
  getProduits,
  getProduitById,
  updateProduit,
  deleteProduit,
  creerProduit,
} from "../../controllers/pruduct/productController.js";

const router = express.Router();

router.post("/", creerProduit); // Créer un produit
router.get("/", getProduits); // Lister tous les produits
router.get("/:id", getProduitById); // Obtenir un produit par ID
router.put("/:id", updateProduit); // Modifier un produit
router.delete("/:id", deleteProduit); // Supprimer un produit

export default router;
