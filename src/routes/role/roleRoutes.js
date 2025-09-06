import express from "express";
import {
  deleteRole,
  createRole,
  getAllRoles,
  getRole,
  updateRole,
} from "../../controllers/role/roleController.js";
const router = express.Router();

router.get("/", getAllRoles);
router.get("/:id", getRole);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);
export default router;
