import express from "express";
import {
  createEncaissement,
  deleteEncaissement,
  getEncaissement,
  getEncaissements,
  updateEncaissement,
} from "../../controllers/encaissement/encaissement.js";

const router = express.Router();

// Routes CRUD
router.post("/", createEncaissement);
router.get("/", getEncaissements);
router.get("/:id", getEncaissement);
router.put("/:id", updateEncaissement);
router.delete("/:id", deleteEncaissement);

export default router;
