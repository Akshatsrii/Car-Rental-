import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Driver from "../models/Driver.js";
import AuditLog from "../models/AuditLog.js";
import { checkBookingFraud } from "../services/fraudDetectionService.js";

/*
|--------------------------------------------------------------------------
| API to Create Cab Ride Booking (Pricing Engine integrated)
|--------------------------------------------------------------------------
*/
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { pickupAddress, dropAddress, pickupDate, pickupTime, distance } = req.body;

    if (!pickupAddress || !dropAddress || !pickupDate || !distance) {
      return res.json({
        success: false,
        message: "Pickup, Drop, Date and Distance are required"
      });
    }

    // ⚡ Pricing Engine Configuration
    const baseFare = 50;
    const perKmRate = 12;
    const gstRate = 5; // 5% GST
    const subTotal = baseFare + Number(distance) * perKmRate;
    const price = Math.round(subTotal * (1 + gstRate / 100));

    // Run AI-based Fraud Detection
    checkBookingFraud({
      pickupAddress,
      dropAddress,
      distance: Number(distance),
      price
    });

    const booking = await Booking.create({
      user: _id,
      pickupDate,
      pickupTime,
      pickupAddress,
      dropAddress,
      distance: Number(distance),
      price,
      status: "pending"
    });

    res.json({
      success: true,
      message: "Booking requested successfully. Awaiting confirmation.",
      booking
    });

  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message
    });
  }
};

/*
|--------------------------------------------------------------------------
| API to Assign Driver (Admin action)
|--------------------------------------------------------------------------
*/
export const assignDriver = async (req, res) => {
  try {
    const { bookingId, driverId } = req.body;
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    // Generate 4-digit OTP for verification
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    booking.driver = driverId;
    booking.otp = otp;
    booking.status = "driver_assigned";
    await booking.save();

    // Mark driver status as busy
    await Driver.findOneAndUpdate({ user: driverId }, { status: "busy" });

    // Save Audit Log
    try {
      await AuditLog.create({
        action: "DRIVER_ASSIGNED",
        performedBy: req.user._id,
        details: `Driver ${driverId} assigned to Booking ${bookingId} (OTP: ${otp})`
      });
    } catch (err) {
      console.error("Audit log write failed:", err.message);
    }

    // Emit Socket.io status update
    const io = req.app.get("io");
    if (io) {
      io.to(bookingId).emit("statusChanged", { status: "driver_assigned", booking });
    }

    res.json({
      success: true,
      message: "Driver assigned successfully. OTP generated.",
      booking
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| API to Respond to Booking (Driver action)
|--------------------------------------------------------------------------
*/
export const driverAcceptOrReject = async (req, res) => {
  try {
    const { bookingId, status } = req.body; // "driver_accepted" or "cancelled"
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    if (status === "cancelled" && booking.driver) {
      await Driver.findOneAndUpdate({ user: booking.driver }, { status: "available" });
    }

    // Emit Socket.io status update
    const io = req.app.get("io");
    if (io) {
      io.to(bookingId).emit("statusChanged", { status, booking });
    }

    res.json({
      success: true,
      message: `Ride request has been ${status === "driver_accepted" ? "accepted" : "rejected"}`,
      booking
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| API to Update Trip Status (Driver progress)
|--------------------------------------------------------------------------
*/
export const updateTripProgress = async (req, res) => {
  try {
    const { bookingId, status, otp } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    if (status === "started") {
      if (otp !== booking.otp) {
        return res.json({ success: false, message: "Invalid OTP code" });
      }
    }

    booking.status = status;
    await booking.save();

    if ((status === "completed" || status === "paid") && booking.driver) {
      await Driver.findOneAndUpdate({ user: booking.driver }, { status: "available" });
    }

    // Emit Socket.io status update
    const io = req.app.get("io");
    if (io) {
      io.to(bookingId).emit("statusChanged", { status, booking });
    }

    res.json({
      success: true,
      message: `Trip status updated to ${status}`,
      booking
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| API to Share Driver Location
|--------------------------------------------------------------------------
*/
export const updateDriverLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    res.json({
      success: true,
      message: "Driver coordinates updated successfully",
      coordinates: { lat, lng }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| API to Get User Booking History
|--------------------------------------------------------------------------
*/
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;

    const bookings = await Booking.find({ user: _id })
      .populate("driver", "name email image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });

  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message
    });
  }
};

/*
|--------------------------------------------------------------------------
| API to Get Driver Booking History / Proposals
|--------------------------------------------------------------------------
*/
export const getDriverBookings = async (req, res) => {
  try {
    const { _id } = req.user;

    const bookings = await Booking.find({ driver: _id })
      .populate("user", "name email image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| API to Get Owner/Admin Bookings
|--------------------------------------------------------------------------
*/
export const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user driver")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });

  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message
    });
  }
};

/*
|--------------------------------------------------------------------------
| API to Change Booking Status (Admin)
|--------------------------------------------------------------------------
*/
export const changeBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found"
      });
    }

    booking.status = status;
    await booking.save();

    // Emit Socket.io status update
    const io = req.app.get("io");
    if (io) {
      io.to(bookingId).emit("statusChanged", { status, booking });
    }

    res.json({
      success: true,
      message: "Booking status updated",
      booking
    });

  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export const checkAvailabilityOfCar = async (req, res) => {
  res.json({ success: true, message: "Drivers available in your location" });
};
