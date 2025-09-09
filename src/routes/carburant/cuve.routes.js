import express from "express";

import { protect } from "../../middleware/auth.js";
import {
  ajouterCuve,
  deleteCuve,
  getCuveById,
  getCuves,
  updateCuve,
} from "../../controllers/carburant/cuveController.js";

const router = express.Router();

// CRUD carburant
router.post("/", protect, ajouterCuve);
router.get("/", getCuves);
router.get("/:id", protect, getCuveById);
router.put("/:id", protect, updateCuve);
router.delete("/:id", protect, deleteCuve);

export default router;
