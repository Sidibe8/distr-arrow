import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
  devise: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  dateDebutValidite: {
    type: Date,
    required: true,
  },
  dateFinValidite: {
    type: Date,
    required: true,
  },
  dateEmission: {
    type: Date,
    required: true,
    default: Date.now,
  },
  numeroVehicule: {
    type: String,
    default: null,
  },
});

export default mongoose.model("Ticket", ticketSchema);

// Création du modèle
