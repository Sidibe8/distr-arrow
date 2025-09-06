import mongoose from "mongoose";
import { config } from "./env.js";

export async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connecté");
  } catch (err) {
    console.error("Erreur connexion MongoDB", err);
    process.exit(1);
  }
}

//  => devscode3 => db_pwd
