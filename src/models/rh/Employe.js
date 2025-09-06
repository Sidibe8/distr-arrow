import mongoose from "mongoose";

const employeSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    telephone: { type: String },

    // 🎯 Partie RH
    typeContrat: {
      type: String,
      enum: ["CDI", "CDD", "Stage", "Intérim", "Autre"],
      default: "CDI",
    },
    poste: { type: String, trim: true },
    departement: { type: String, trim: true },
    salaireBase: { type: Number, default: 0 },
    dateEmbauche: { type: Date, default: Date.now },
    statut: {
      type: String,
      enum: ["actif", "inactif"],
      default: "actif",
    },

    // 📌 Congés
    conges: [
      {
        type: {
          type: String,
          enum: ["annuel", "maladie", "maternité", "exceptionnel"],
        },
        dateDebut: Date,
        dateFin: Date,
        statut: {
          type: String,
          enum: ["en_attente", "approuvé", "refusé"],
          default: "en_attente",
        },
      },
    ],

    // 📌 Paie
    paies: [
      {
        mois: String, // ex: "2025-09"
        salaireBase: Number,
        primes: { type: Number, default: 0 },
        retenues: { type: Number, default: 0 },
        netAPayer: Number,
        statut: {
          type: String,
          enum: ["payé", "non_payé"],
          default: "non_payé",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Employe", employeSchema);
