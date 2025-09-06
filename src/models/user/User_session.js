import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    login_time: {
      type: Date,
      default: Date.now,
    },
    logout_time: {
      type: Date,
    },
    ip_address: {
      type: String,
    },
    device_info: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserSession", userSessionSchema);
