import express from "express";
import {
  changeBookingStatus,
  checkAvailabilityOfCar,
  createBooking,
  getOwnerBookings,
  getUserBookings,
  assignDriver,
  driverAcceptOrReject,
  updateTripProgress,
  updateDriverLocation,
  getDriverBookings
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";
import Booking from "../models/Booking.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityOfCar);
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/driver", protect, getDriverBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, changeBookingStatus);

bookingRouter.post("/assign-driver", protect, assignDriver);
bookingRouter.post("/driver-respond", protect, driverAcceptOrReject);
bookingRouter.post("/trip-progress", protect, updateTripProgress);
bookingRouter.post("/driver-location", protect, updateDriverLocation);

export default bookingRouter;
