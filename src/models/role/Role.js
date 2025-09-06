import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    permissions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);
