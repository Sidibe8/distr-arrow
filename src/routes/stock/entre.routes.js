import express from "express";
import {
  creerStock,
  deleteStock,
  getStockById,
  getStocks,
  updateStock,
} from "../../controllers/stock/stockController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();
router.get("/", getStocks);
router.post("/", protect, creerStock);
router.get("/:id", getStockById);
router.put("/:id", protect, updateStock);
router.delete("/:id", deleteStock);

export default router;
