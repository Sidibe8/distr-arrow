import mongoose from "mongoose";

const CaisseSchema = new mongoose.Schema(
  {
    typeMouvement: {
      type: String,
      enum: ["entree", "sortie"],
      required: true,
    },

    montant: {
      type: Number,
      required: true,
      min: 0,
    },

    modePaiement: {
      type: String,
      enum: ["cash", "mobile_money", "carte", "cheque", "virement"],
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    vente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vente",
    },

    creePar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    dateOperation: {
      type: Date,
      default: Date.now,
    },

    soldeApresOperation: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Caisse", CaisseSchema);
