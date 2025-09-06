import mongoose from "mongoose";

const stockSortieSchema = new mongoose.Schema({
  produit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
  libelle: {
    type: String,
    trim: true,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  montant_total: {
    type: Number,
    default: 0,
  },
  statut: {
    type: String,
    enum: ["en attente", "confirmé", "annulé"],
    default: "en attente",
  },
  creePar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("StockSortie", stockSortieSchema);
