import mongoose from "mongoose";

const encaissementSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  montant: { type: Number, required: true },
  destination: { type: String, enum: ["caisse", "banque"], required: true },
});

export default mongoose.model("Encaissement", encaissementSchema);
