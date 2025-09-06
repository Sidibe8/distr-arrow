import express from "express";
import {
  creerEmploye,
  getEmployes,
  getEmployeById,
  updateEmploye,
  deleteEmploye,
  ajouterConge,
  updateConge,
  deleteConge,
  ajouterPaie,
  updatePaie,
  deletePaie,
} from "../../controllers/rh/employeController.js";

const router = express.Router();

// =============================
// 📌 Routes Employés
// =============================
router.post("/", creerEmploye); // Créer un employé
router.get("/", getEmployes); // Récupérer tous les employés
router.get("/:id", getEmployeById); // Récupérer un employé par ID
router.put("/:id", updateEmploye); // Mettre à jour un employé
router.delete("/:id", deleteEmploye); // Supprimer un employé

// =============================
// 📌 Routes Congés
// =============================
router.post("/:id/conges", ajouterConge); // Ajouter un congé
router.put("/:id/conges/:congeId", updateConge); // Modifier un congé
router.delete("/:id/conges/:congeId", deleteConge); // Supprimer un congé

// =============================
// 📌 Routes Paie
// =============================
router.post("/:id/paies", ajouterPaie); // Ajouter une paie
router.put("/:id/paies/:paieId", updatePaie); // Modifier une paie
router.delete("/:id/paies/:paieId", deletePaie); // Supprimer une paie

export default router;
