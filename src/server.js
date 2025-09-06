import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

const app = express();

// routes imports
import roleRoutes from "./routes/role/roleRoutes.js";
import moduleRoutes from "./routes/module/moduleRoutes.js";
import authRoutes from "./routes/auth/authRoutes.js";
import userSessionsRoutes from "./routes/auth/userSessions.js";
import productRoutes from "./routes/produit/product.routes.js";
import pointVenteRoutes from "./routes/pointVente/pointVente.routes.js";
// stock
import stockRoutes from "./routes/stock/entre.routes.js";
import sortieStockRoutes from "./routes/stock/sortie.routes.js";

// caisse
import caisseRoutes from "./routes/caisse/caisse.routes.js";

import paiementRoutes from "./routes/paiment/paiement.routes.js";
import encaissementRoutes from "./routes/encaissement/encaissement.routes.js";
//facture
import factureRoutes from "./routes/facture/facture.routes.js";
// bon
import bonRoutes from "./routes/facture/bon.routes.js";
// /vente
import venteRoutes from "./routes/vente/vente.routes.js";
// depenses
import depenseRoutes from "./routes/depenses/depense.routes.js";

// routes ressouces humaine
import employeRoutes from "./routes/rh/employe.routes.js";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Connexion MongoDB
connectDB();

// Routes de test
app.get("/", (req, res) => {
  res.json({ message: "API Distribution OK " });
});
// log body
app.use((req, res, next) => {
  console.log(req.body);
  next();
});

// Routes
app.use("/api/modules", moduleRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user-sessions", userSessionsRoutes);
app.use("/api/produits", productRoutes);
app.use("/api/pointvente", pointVenteRoutes);
// stock
app.use("/api/stock", stockRoutes);
// sprtie
app.use("/api/stock-sorties", sortieStockRoutes);

app.use("/api/paiment", paiementRoutes);
app.use("/api/encaissements", encaissementRoutes);

// bon ticket
app.use("/api/bon-ticket", bonRoutes);

// factures
app.use("/api/factures", factureRoutes);

// ventes
app.use("/api/ventes", venteRoutes);

// caisse
app.use("/api/caisses", caisseRoutes);
// depense
app.use("/api/depenses", depenseRoutes);

// ressource humaine
app.use("/api/employes", employeRoutes);

// pour effacer le cache necessaire pour parfois avoir certaines modifs apporte
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue ");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
);
