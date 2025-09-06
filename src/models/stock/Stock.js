import mongoose from "mongoose";

const StockSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    categorie: {
      type: String,
      trim: true,
    },
    prixAchat: {
      type: Number,
      required: true,
    },
    prixVente: {
      type: Number,
      required: true,
    },
    quantiteEnStock: {
      type: Number,
      required: true,
      default: 0,
    },
    unite: {
      type: String,
      enum: ["pièce", "litre", "kg", "sac", "autre"],
      default: "pièce",
    },
    seuilAlerte: {
      type: Number,
      default: 0,
    },
    creePar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stock", StockSchema);
