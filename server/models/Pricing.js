import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
  {
    baseFare: { type: Number, default: 50 },
    perKmRate: { type: Number, default: 12 },
    waitingChargePerMin: { type: Number, default: 2 },
    nightChargeMultiplier: { type: Number, default: 1.25 },
    festivalChargeMultiplier: { type: Number, default: 1.5 },
    gstRate: { type: Number, default: 5 }, // 5% GST
  },
  { timestamps: true }
);

const Pricing = mongoose.model("Pricing", pricingSchema);

export default Pricing;
