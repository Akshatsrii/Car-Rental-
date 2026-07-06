import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Driver from "../models/Driver.js";

// ================= CHANGE ROLE =================
export const changeRoleToOwner = async (req, res) => {
  try {
    const user = req.user;
    const { role } = req.body; // allow changing to admin / driver / customer
    
    user.role = role || "owner";
    await user.save();

    if (user.role === "driver") {
      const driverExists = await Driver.findOne({ user: user._id });
      if (!driverExists) {
        await Driver.create({
          user: user._id,
          vehicleNumber: "MH-12-AB-" + Math.floor(1000 + Math.random() * 9000),
          vehicleModel: "Maruti Suzuki Swift",
          vehicleType: "Sedan",
          status: "available"
        });
      }
    }

    res.json({
      success: true,
      message: `Role changed successfully to ${user.role}`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= GET OWNER CARS =================
export const getOwnerCars = async (req, res) => {
  try {
    const cars = await Car.find();
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

    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    car.isAvailable = !car.isAvailable;
    car.availability = car.isAvailable ? "Available" : "Maintenance";
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

    if (!car) {
      return res.json({ success: false, message: "Car not found" });
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

// ================= GET OWNER / ADMIN DASHBOARD STATS =================
export const getOwnerDashboard = async (req, res) => {
  try {
    const totalCars = await Car.countDocuments();
    const customersCount = await User.countDocuments({ role: "customer" });
    const driversCount = await User.countDocuments({ role: "driver" });

    // Fetch drivers availability stats
    const availableDrivers = await Driver.countDocuments({ status: "available" });
    const busyDrivers = await Driver.countDocuments({ status: "busy" });
    const offlineDrivers = await Driver.countDocuments({ status: "offline" });

    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("driver", "name email")
      .sort({ createdAt: -1 });

    const pendingBookings = bookings.filter((b) => b.status === "pending").length;
    const completedBookings = bookings.filter((b) => b.status === "completed" || b.status === "paid").length;
    const cancelledBookings = bookings.filter((b) => b.status === "cancelled").length;

    // Revenue calculations
    const totalEarnings = bookings
      .filter((b) => b.status === "completed" || b.status === "paid")
      .reduce((sum, b) => sum + b.price, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayRevenue = bookings
      .filter((b) => (b.status === "completed" || b.status === "paid") && new Date(b.createdAt) >= today)
      .reduce((sum, b) => sum + b.price, 0);

    // List of drivers (for dropdowns)
    const driversList = await User.find({ role: "driver" }).select("-password");

    res.json({
      success: true,
      stats: {
        totalCars,
        availableDrivers,
        busyDrivers,
        offlineDrivers,
        totalEarnings,
        todayRevenue,
        pendingBookings,
        completedBookings,
        cancelledBookings,
        customersCount,
        driversCount,
      },
      bookings,
      drivers: driversList,
      recentBookings: bookings.slice(0, 10),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
