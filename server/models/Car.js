import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: String,
    model: String,
    year: Number,
    registrationNumber: String,

    pricePerDay: Number,
    location: String,

    fuelType: String,
    transmission: String,
    seatingCapacity: Number,
    mileage: String,
    color: String,

    category: String,
    description: String,
    features: [String],

    availability: {
      type: String,
      default: "Available",
    },

    insurance: String,
    insuranceExpiry: Date,

    images: [String], // ✅ MULTIPLE IMAGES

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 🔥 STATS (used by dashboard)
    totalBookings: { type: Number, default: 0 },
    completedBookings: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
