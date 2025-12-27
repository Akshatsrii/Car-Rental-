import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";

// 🔐 Generate JWT Token (✅ FIXED)
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ================= REGISTER USER =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 6) {
      return res.json({
        success: false,
        message: "Fill all the fields"
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "User registered successfully",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ================= LOGIN USER =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ================= GET USER DATA =================
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ================= ADD CAR (PLACEHOLDER) =================


// ================= GET ALL CARS =================
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvailable: true });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export const updateUserImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "No image uploaded",
      });
    }

    const user = await User.findById(req.user._id);

    user.image = req.file.path; // 🔥 store path in DB
    await user.save();

    res.json({
      success: true,
      message: "Image updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// ================= ADD CAR =================
export const addCar = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({
        success: false,
        message: "Only owners can add cars",
      });
    }

    const {
      name,
      model,
      year,
      registrationNumber,
      pricePerDay,
      location,
      fuelType,
      transmission,
      seatingCapacity,
      mileage,
      color,
      description,
      availability,
      insurance,
      insuranceExpiry,
    } = req.body;

    if (
      !name ||
      !model ||
      !year ||
      !registrationNumber ||
      !pricePerDay ||
      !location ||
      !fuelType ||
      !transmission ||
      !seatingCapacity
    ) {
      return res.json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const images = req.files?.map((file) => file.path) || [];

    const car = await Car.create({
      owner: req.user._id,
      name,
      model,
      year,
      registrationNumber,
      pricePerDay,
      location,
      fuelType,
      transmission,
      seatingCapacity,
      mileage,
      color,
      description,
      availability,
      insurance,
      insuranceExpiry,
      images,
      isAvailable: availability === "Available",
    });

    res.json({
      success: true,
      message: "Car added successfully",
      car,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
