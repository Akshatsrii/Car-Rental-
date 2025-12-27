import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import fs from "fs";

// ================= CHANGE ROLE TO OWNER =================
export const changeRoleToOwner = async (req, res) => {
  try {
    const user = req.user;

    if (user.role === "owner") {
      return res.json({
        success: false,
        message: "User is already an owner",
      });
    }

    user.role = "owner";
    await user.save();

    res.json({
      success: true,
      message: "Role changed to owner",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= GET OWNER CARS =================
export const getOwnerCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id });

    res.json({
      success: true,
      cars,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= TOGGLE CAR AVAILABILITY =================
export const toggleCarAvailability = async (req, res) => {
  try {
    const { carId } = req.body;

    const car = await Car.findById(carId);

    if (!car || car.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({ success: true, car });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= DELETE CAR =================
export const deleteCar = async (req, res) => {
  try {
    const { carId } = req.body;

    const car = await Car.findById(carId);

    if (!car || car.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    await car.deleteOne();

    res.json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const cars = await Car.find({ owner: ownerId });
    const bookings = await Booking.find({ owner: ownerId })
      .populate("car", "name model images")
      .sort({ createdAt: -1 });

    const availableCars = cars.filter(c => c.availability === "Available").length;
    const rentedCars = cars.filter(c => c.availability === "Rented").length;
    const maintenanceCars = cars.filter(c => c.availability === "Maintenance").length;

    const totalEarnings = cars.reduce((sum, c) => sum + c.totalEarnings, 0);

    const monthlyRevenue = bookings
      .filter(b => b.status === "Completed")
      .reduce((sum, b) => sum + b.price, 0);

    res.json({
      success: true,
      stats: {
        totalCars: cars.length,
        availableCars,
        rentedCars,
        maintenanceCars,
        totalEarnings,
        monthlyRevenue,
        previousMonthRevenue: 0,
        carsChange: 0,
        earningsChange: 0,
      },
      myCars: cars,
      recentBookings: bookings.slice(0, 5),
      notifications: [],
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
