import mongoose from "mongoose";

const depenseSchema = new mongoose.Schema(
    {
        source: {
            type: String,
            enum: ["caisse", "banque", "mobile_money", "autre"],
            default: "caisse",
        },

        montant: {
            type: Number,
            required: true,
        },
        categorie: {
            type: String,
            trim: true,
            enum: ["Loyer", "Salaire", "Électricité", "Fournitures", "Autres"],
            default: "Autres",
        },
        description: {
            type: String,
            trim: true,
        },
        dateDepense: {
            type: Date,
            default: Date.now,
        },
        utilisateur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // celui qui a enregistré la dépense
        },
    },
    { timestamps: true }
);

export default mongoose.model("Depense", depenseSchema);
