import mongoose from "mongoose";

const VenteSchema = new mongoose.Schema(
  {
    clientNom: {
      type: String,
      trim: true,
    },

    clientTelephone: {
      type: String,
      trim: true,
    },

    clientAdresse: {
      type: String,
      trim: true,
    },

    clientEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    clientType: {
      type: String,
      enum: ["particulier", "entreprise", "autre"], // utile si tu veux différencier
      default: "particulier",
    },

    clientNIF: {
      // Numéro d'identification fiscale (utile si facture entreprise)
      type: String,
      trim: true,
    },

    clientNote: {
      type: String,
      trim: true,
    },

    produits: [
      {
        produit: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Stock",
          required: true,
        },
        quantite: {
          type: Number,
          required: true,
          min: 1,
        },
        prixUnitaire: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],

    // Montants
    montantTotal: {
      type: Number,
      required: true,
    },
    remise: {
      type: Number,
      default: 0,
    },
    montantFinal: {
      type: Number,
      required: true,
    },

    modePaiement: {
      type: String,
      enum: ["cash", "carte", "mobile_money", "credit"],
      required: true,
    },
    statutPaiement: {
      type: String,
      enum: ["payé", "impayé", "partiel"],
      default: "impayé",
    },

    // Utilisateur
    creePar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    statutVente: {
      type: String,
      enum: ["en_cours", "terminée", "annulée"],
      default: "terminée",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vente", VenteSchema);
