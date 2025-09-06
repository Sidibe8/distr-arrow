import express from "express";
import {
  checkTicketValidity,
  createTicket,
  deleteTicket,
  getTicketByNumero,
  getTickets,
  updateTicket,
} from "../../controllers/facture/bonController.js";

const router = express.Router();

// CRUD classique
router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:numero", getTicketByNumero);
router.put("/:numero", updateTicket);
router.delete("/:numero", deleteTicket);

// Vérifier la validité d'un ticket
router.get("/check/:numero", checkTicketValidity);

export default router;
