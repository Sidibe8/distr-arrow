import express from "express";
import {
  createFacture,
  deleteFacture,
  getAllFactures,
  getFactureById,
  updateFacture,
} from "../../controllers/facture/factureController.js";

const router = express.Router();

router.post("/", createFacture);
router.get("/", getAllFactures);
router.get("/:id", getFactureById);
router.put("/:id", updateFacture);
router.delete("/:id", deleteFacture);

export default router;
