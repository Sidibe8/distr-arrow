import express from "express";
import {
  deleteSession,
  createSession,
  getAllSessions,
  getSession,
  getSessionsByUser,
  updateSession,
} from "../../controllers/auth/userSessionController.js";

const router = express.Router();

router.get("/", getAllSessions);
router.get("/user/:userId", getSessionsByUser);
router.get("/:id", getSession);
router.post("/", createSession);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);

export default router;
