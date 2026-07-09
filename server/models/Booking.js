import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const bookingSchema = new mongoose.Schema(
  {
    car: {
      type: ObjectId,
      ref: "Car",
      required: false
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    driver: {
      type: ObjectId,
      ref: "User",
      required: false
    },
    owner: {
      type: ObjectId,
      ref: "User",
      required: false
    },
    pickupDate: {
      type: Date,
      required: true
    },
    pickupTime: {
      type: String,
      required: false
    },
    pickupAddress: { type: String, required: true },
    dropAddress: { type: String, required: true },
    distance: { type: Number, default: 0 },
    otp: { type: String, default: "" },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "driver_assigned",
        "driver_accepted",
        "driver_on_way",
        "driver_arrived",
        "started",
        "completed",
        "paid",
        "cancelled"
      ],
      default: "pending"
    },
    price: {
      type: Number,
      required: true
    },
    serviceType: {
      type: String,
      enum: ["driver_assigned", "self_drive_pickup"],
      default: "driver_assigned"
    },
    rating: { type: Number, default: 0 },
    review: { type: String, default: "" }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
