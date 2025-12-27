import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

/*
|--------------------------------------------------------------------------
| Function to Check Availability of Car for a given Date
|--------------------------------------------------------------------------
*/
const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate }
  });

  return bookings.length === 0;
};

/*
|--------------------------------------------------------------------------
| API to Check Availability of Cars (Date + Location)
|--------------------------------------------------------------------------
*/
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    if (!location || !pickupDate || !returnDate) {
      return res.json({
        success: false,
        message: "Location, pickupDate and returnDate are required"
      });
    }

    // Fetch all available cars for the given location
    const cars = await Car.find({
      location,
      isAvailable: true
    });

    // Check availability for each car
    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );

      return {
        ...car._doc,
        isAvailable
      };
    });

    const availableCars = await Promise.all(availableCarsPromises);

    res.json({
      success: true,
      cars: availableCars
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
| API to Create Booking
|--------------------------------------------------------------------------
*/
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    // Check availability
    const isAvailable = await checkAvailability(
      car,
      pickupDate,
      returnDate
    );

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Car is not available"
      });
    }

    const carData = await Car.findById(car);

    if (!carData) {
      return res.json({
        success: false,
        message: "Car not found"
      });
    }

    // Calculate number of days
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil(
      (returned - picked) / (1000 * 60 * 60 * 24)
    );

    const price = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price
    });

    res.json({
      success: true,
      message: "Booking Created"
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
| API to Get User Bookings
|--------------------------------------------------------------------------
*/
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;

    const bookings = await Booking.find({ user: _id })
      .populate("car")
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
| API to Get Owner Bookings
|--------------------------------------------------------------------------
*/
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({
        success: false,
        message: "Unauthorized"
      });
    }

    const bookings = await Booking.find({
      owner: req.user._id
    })
      .populate("car user")
      .select("-user.password")
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
| API to Change Booking Status (Owner)
|--------------------------------------------------------------------------
*/
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found"
      });
    }

    if (booking.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "Unauthorized"
      });
    }

    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      message: "Booking status updated"
    });

  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message
    });
  }
};
