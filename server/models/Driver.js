import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    vehicleNumber: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleType: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "busy", "offline"],
      default: "offline",
    },
    currentLocation: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
    earnings: { type: Number, default: 0 },
    rating: { type: Number, default: 5 },
  },
  { timestamps: true }
);

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
