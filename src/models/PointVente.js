import mongoose from "mongoose";

const pointVenteSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom_gerant: { type: String, required: true },
  telephone: { type: String, required: true },
  reference: { type: String, required: true },
});

export default mongoose.model("PointVente", pointVenteSchema);
