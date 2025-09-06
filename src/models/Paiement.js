import mongoose from "mongoose";

const paiementSchema = new mongoose.Schema({
  stock_sortie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StockSortie",
    required: true,
  },
  montant: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  mode: { type: String, enum: ["cash", "banque", "mobile"], required: true },
  reste_a_payer: { type: Number, required: true },
});

export default mongoose.model("Paiement", paiementSchema);
