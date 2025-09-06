import express from "express";
import {
  createPaiement,
  deletePaiement,
  getPaiements,
  getPaiementsBySortie,
  updatePaiement,
} from "../../controllers/paiement/paiementController.js";

const router = express.Router();

router.post("/", createPaiement);
router.get("/", getPaiements);
router.get("/sortie/:stock_sortie_id", getPaiementsBySortie);
router.put("/:id", updatePaiement);
router.delete("/:id", deletePaiement);

export default router;
