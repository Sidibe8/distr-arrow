import express from "express";
import {
  createModule,
  deleteModule,
  getModules,
  updateModule,
} from "../../controllers/module/moduleController.js";

const router = express.Router();

router.post("/", createModule);
router.get("/", getModules);
router.put("/:id", updateModule);
router.delete("/:id", deleteModule);

export default router;
