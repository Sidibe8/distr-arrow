import express from "express";
import {
  createPointVente,
  getPointVentes,
  getPointVenteById,
  updatePointVente,
  deletePointVente,
} from "../../controllers/pointVente/pointVenteController.js";

const router = express.Router();

router.post("/", createPointVente);
router.get("/", getPointVentes);
router.get("/:id", getPointVenteById);
router.put("/:id", updatePointVente);
router.delete("/:id", deletePointVente);

export default router;
