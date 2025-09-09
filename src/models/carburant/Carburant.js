import mongoose from "mongoose";

const carburantSchema = new mongoose.Schema(
  {
    cuve: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuve",
      required: true, // le carburant doit sortir d'une cuve
    },
    vehicule: {
      type: String, // ou ref vers Véhicule si tu as un module
      required: true,
    },
    typeCarburant: {
      type: String,
      enum: ["Essence", "Gasoil", "GPL", "Autre"],
      default: "Essence",
    },
    quantiteLitres: {
      type: Number,
      required: true,
    },
    prixUnitaire: {
      type: Number,
      required: true,
    },
    montantTotal: {
      type: Number,
      required: true,
    },
    dateAchat: {
      type: Date,
      default: Date.now,
    },
    sourcePaiement: {
      type: String,
      enum: ["caisse", "banque", "mobile_money", "autre"],
      default: "caisse",
    },
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
// console.log('s');

export default mongoose.model("Carburant", carburantSchema);
