import express from "express";

// imports de toutes les routes
import roleRoutes from "./role/roleRoutes.js";
import moduleRoutes from "./module/moduleRoutes.js";
import authRoutes from "./auth/authRoutes.js";
import userSessionsRoutes from "./auth/userSessions.js";
import productRoutes from "./produit/product.routes.js";
import pointVenteRoutes from "./pointVente/pointVente.routes.js";

// stock
import stockRoutes from "./stock/entre.routes.js";
import sortieStockRoutes from "./stock/sortie.routes.js";

// caisse
import caisseRoutes from "./caisse/caisse.routes.js";

// paiement & encaissement
import paiementRoutes from "./paiment/paiement.routes.js";
import encaissementRoutes from "./encaissement/encaissement.routes.js";

// facture & bons
import factureRoutes from "./facture/facture.routes.js";
import bonRoutes from "./facture/bon.routes.js";

// ventes
import venteRoutes from "./vente/vente.routes.js";

// depenses
import depenseRoutes from "./depenses/depense.routes.js";

// ressources humaines
import employeRoutes from "./rh/employe.routes.js";

// carburant and cuve
import carburantRoutes from "./carburant/carburant.routes.js";
import cuveRoutes from "./carburant/cuve.routes.js";

const router = express.Router();

// ff
// ici tu montes tous les sous-routes
router.use("/modules", moduleRoutes);
router.use("/roles", roleRoutes);
router.use("/auth", authRoutes);
router.use("/user-sessions", userSessionsRoutes);
router.use("/produits", productRoutes);
router.use("/pointvente", pointVenteRoutes);

// stock
router.use("/stock", stockRoutes);
router.use("/stock-sorties", sortieStockRoutes);

// caisse
router.use("/caisses", caisseRoutes);

// paiements & encaissements
router.use("/paiment", paiementRoutes);
router.use("/encaissements", encaissementRoutes);

// factures & bons
router.use("/factures", factureRoutes);
router.use("/bon-ticket", bonRoutes);

// ventes
router.use("/ventes", venteRoutes);

// dépenses
router.use("/depenses", depenseRoutes);

// ressources humaines
router.use("/employes", employeRoutes);

// carburant and cuves
router.use("/carburants", carburantRoutes);
router.use("/cuves", cuveRoutes);

export default router;
