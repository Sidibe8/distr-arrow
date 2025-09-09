import express from "express";

import { protect } from "../../middleware/auth.js";
import {
  ajouterCarburant,
  deleteCarburant,
  getCarburantById,
  getCarburants,
  updateCarburant,
} from "../../controllers/carburant/carburantController.js";

const router = express.Router();

// CRUD carburant
router.post("/", protect, ajouterCarburant);
router.get("/", getCarburants);
router.get("/:id", protect, getCarburantById);
router.put("/:id", protect, updateCarburant);
router.delete("/:id", protect, deleteCarburant);

export default router;
