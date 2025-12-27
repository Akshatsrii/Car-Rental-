import express from "express";
import {
  changeBookingStatus,
  checkAvailabilityOfCar,
  createBooking,
  getOwnerBookings,
  getUserBookings
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityOfCar);
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, changeBookingStatus);
bookingRouter.get("/owner/bookings", protect, getOwnerBookings);

bookingRouter.put("/owner/bookings/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false });
    }

    booking.status = req.body.status;
    await booking.save();

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});


export default bookingRouter;
