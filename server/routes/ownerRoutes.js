import express from "express";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

import {
  changeRoleToOwner,
  getOwnerCars,
  toggleCarAvailability,
  deleteCar,
  getOwnerDashboard
} from "../controllers/ownerController.js";

import { addCar } from "../controllers/userController.js";

const ownerRouter = express.Router();

// OWNER ROLE
ownerRouter.post("/change-role", protect, changeRoleToOwner);

// ADD CAR
ownerRouter.post(
  "/add-car",
  protect,
  upload.array("images", 6), // ✅ MULTIPLE IMAGES
  addCar
);


// OWNER CARS
ownerRouter.get("/cars", protect, getOwnerCars);
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);
ownerRouter.post("/delete-car", protect, deleteCar);

// OWNER DASHBOARD
ownerRouter.get("/dashboard", protect, getOwnerDashboard);
// ADD THIS
ownerRouter.post(
  "/cars",
  protect,
  upload.array("images", 6),
  addCar
);

// UPDATE CAR (availability toggle etc.)
ownerRouter.put("/cars/:id", protect, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car || car.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    Object.assign(car, req.body);
    await car.save();

    res.json({ success: true, car });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// DELETE CAR
ownerRouter.delete("/cars/:id", protect, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car || car.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    await car.deleteOne();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});


export default ownerRouter;
