import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { sessionWatcher } from "./middleware/sessionWatcher.js";

const app = express();
// Middleware global
app.use(sessionWatcher);

import routes from "./routes/index.js";

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

app.use("/api", routes);
// for the test

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
);
