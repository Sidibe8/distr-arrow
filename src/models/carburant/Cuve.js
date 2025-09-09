import mongoose from "mongoose";

const cuveSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    typeCarburant: {
      type: String,
      enum: ["Essence", "Gasoil", "GPL", "Autre"],
      default: "Essence",
    },
    capaciteTotale: {
      type: Number, // en litres
      required: true,
    },
    niveauActuel: {
      type: Number, // en litres
      required: true,
    },
    localisation: {
      type: String,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cuve", cuveSchema);

// console.log("ls");
