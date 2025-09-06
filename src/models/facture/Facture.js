import mongoose from "mongoose";

const factureSchema = new mongoose.Schema(
  {
    entreprise: {
      nom: { type: String, required: true },
      adresse: { type: String, default: "" },
      email: { type: String, default: "" },
      telephone: { type: String, default: "" },
    },
    destinataire: {
      facturerA: {
        nom: { type: String },
        adresse: { type: String },
      },
      envoyerA: {
        nom: { type: String },
        adresse: { type: String },
      },
    },
    factureInfo: {
      numero: { type: String, required: true },
      date: { type: Date, default: Date.now },
      commande: { type: String },
      echeance: { type: Date },
    },
    items: [
      {
        quantite: { type: Number, default: 1 },
        designation: { type: String, required: true },
        prixUnitaireHT: { type: Number, required: true },
        montantHT: { type: Number, required: true },
      },
    ],
    totalHT: { type: Number, required: true },
    tva: { type: Number, default: 0 },
    totalTTC: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Facture", factureSchema);
