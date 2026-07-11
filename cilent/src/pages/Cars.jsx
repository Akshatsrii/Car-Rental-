import React, { useState, useEffect } from "react";
import { useAppContext } from "../components/context/AppContext";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const Cars = () => {
  const { axios, token, user } = useAppContext();
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [distance, setDistance] = useState(10);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState("");
  const [serviceType, setServiceType] = useState("driver_assigned");

  // Pricing engine factors
  const baseFare = 50;
  const perKmRate = 12;
  const gstRate = 5;
  const distanceFare = distance * perKmRate;
  const subTotal = baseFare + distanceFare;
  const gst = Math.round(subTotal * (gstRate / 100));
  const estimatedTotal = subTotal + gst;

  const fetchUserBookings = async () => {
    if (!token) return;
    try {
      setHistoryLoading(true);
      const { data } = await axios.get("/api/booking/user");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const isBookingDay = (pickupDateString) => {
    const today = new Date().toDateString();
    const pickupDate = new Date(pickupDateString).toDateString();
    return today === pickupDate;
  };

  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      if (data.success) {
        setCars(data.cars);
        if (data.cars.length > 0) {
          setSelectedCar(data.cars[0]._id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserBookings();
    fetchCars();
  }, [token]);

  useEffect(() => {
    if (!token || bookings.length === 0) return;

    // Connect to real-time WebSockets
    const socket = io(import.meta.env.VITE_BASE_URL || "https://car-rental-6nge.onrender.com");

    // Join room for each booking to listen to events
    bookings.forEach((b) => {
      socket.emit("joinBooking", b._id);
    });

    // Listen for live status transitions
    socket.on("statusChanged", ({ status, booking }) => {
      toast(`Trip Status Updated: ${status.replace("_", " ").toUpperCase()}`, {
        icon: "🚗",
        style: { background: "#2563eb", color: "#fff", fontWeight: "bold" }
      });
      fetchUserBookings();
    });

    return () => {
      socket.disconnect();
    };
  }, [bookings.length, token]);

  const handleBookRide = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to book a ride!");
      return;
    }
    if (!pickupAddress || !dropAddress || !pickupDate || !pickupTime) {
      toast.error("Please fill in all booking fields!");
      return;
    }

    try {
      setBookingLoading(true);
      const { data } = await axios.post("/api/booking/create", {
        pickupAddress,
        dropAddress,
        pickupDate,
        pickupTime,
        distance,
        car: selectedCar,
        serviceType
      });

      if (data.success) {
        toast.success("Ride requested successfully!");
        setPickupAddress("");
        setDropAddress("");
        setPickupDate("");
        setPickupTime("");
        fetchUserBookings();
      } else {
        toast.error(data.message || "Failed to book ride");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to request booking");
    } finally {
      setBookingLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "driver_assigned": return "bg-indigo-100 text-indigo-800";
      case "driver_accepted": return "bg-purple-100 text-purple-800";
      case "driver_on_way": return "bg-amber-100 text-amber-800";
      case "driver_arrived": return "bg-cyan-100 text-cyan-800";
      case "started": return "bg-orange-100 text-orange-800";
      case "completed":
      case "paid": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusStepIndex = (status) => {
    const steps = [
      "pending",
      "confirmed",
      "driver_assigned",
      "driver_accepted",
      "driver_on_way",
      "driver_arrived",
      "started",
      "completed",
      "paid"
    ];
    return steps.indexOf(status);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 md:px-16 lg:px-24 xl:px-32 py-12 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* LEFT COLUMN: BOOKING FORM & WALLET */}
        <div className="lg:col-span-5 space-y-6">
          {/* BOOKING FORM CARD */}
          <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Book Your Cab</h2>
            <p className="text-gray-500 text-sm mb-6">Enter details to request a driver partner instantly.</p>

            <form onSubmit={handleBookRide} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Pickup Address</label>
                <input
                  type="text"
                  placeholder="e.g., 221B Baker Street, London"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Drop Address</label>
                <input
                  type="text"
                  placeholder="e.g., Heathrow Airport Terminal 5"
                  value={dropAddress}
                  onChange={(e) => setDropAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-gray-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Time Slot</label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-gray-600 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                  <span>Estimated Distance</span>
                  <span className="text-primary font-black">{distance} KM</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Fare Breakdown Card */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-3">
                <h3 className="font-bold text-gray-800 border-b pb-2 mb-2 text-sm uppercase tracking-wider">Fare Breakdown</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Base Fare</span>
                  <span>₹{baseFare}.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Distance Charges ({distance} KM)</span>
                  <span>₹{distanceFare}.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>GST (5%)</span>
                  <span>₹{gst}.00</span>
                </div>
                <div className="flex justify-between font-black text-gray-900 text-lg border-t pt-3 mt-2">
                  <span>Estimated Fare</span>
                  <span className="text-primary">₹{estimatedTotal}.00</span>
                </div>
              </div>

              {/* Select Your Car */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  🚗 Choose Your Premium Ride
                </label>
                {cars.length === 0 ? (
                  <p className="text-gray-400 text-xs italic">Loading available cabs...</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                    {cars.map((c) => (
                      <div
                        key={c._id}
                        onClick={() => setSelectedCar(c._id)}
                        className={`group cursor-pointer border-2 rounded-2xl p-3 flex flex-col gap-2 transition-all duration-300 transform active:scale-95 ${
                          selectedCar === c._id
                            ? "border-primary bg-gray-50 shadow-md scale-[1.02] ring-2 ring-primary/20"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm hover:scale-[1.01]"
                        }`}
                      >
                        <div className="overflow-hidden rounded-xl">
                          <img
                            src={c.images?.[0] || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400"}
                            alt={c.name}
                            className="w-full h-16 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-xs truncate">{c.name}</p>
                          <p className="text-[9px] text-gray-500">{c.transmission} • {c.seatingCapacity} Seats</p>
                          <p className="text-primary font-black text-xs mt-0.5">₹{c.pricePerDay}/day</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Service/Facility Choice */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  ✨ Booking Option (Facility)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setServiceType("driver_assigned")}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 ${
                      serviceType === "driver_assigned"
                        ? "border-primary bg-primary text-white shadow"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>🚗 With Driver</span>
                    <span className="text-[8px] opacity-80">Our driver will drive</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType("self_drive_pickup")}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 ${
                      serviceType === "self_drive_pickup"
                        ? "border-primary bg-primary text-white shadow"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>🔑 Self-Drive Pickup</span>
                    <span className="text-[8px] opacity-80">Pick up at Hub point</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full py-4 bg-primary hover:bg-primary-dull text-white font-bold text-lg rounded-xl shadow-lg transition transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {bookingLoading ? "Requesting Driver..." : "Book Cab Now"}
              </button>
            </form>
          </div>

          {/* Wallet & Referral Widget */}
          <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Your Wallet</span>
                <h4 className="text-2xl font-black text-gray-900 mt-0.5">₹500.00</h4>
              </div>
              <button
                onClick={() => toast.success("Wallet top-up window is locked in demo mode.")}
                className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-xl transition"
              >
                + Add Cash
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-blue-500 font-bold uppercase">Refer & Earn</span>
                <p className="font-bold text-gray-800 text-xs mt-0.5">Get ₹100 Free Ride Cash</p>
                <p className="text-[10px] text-gray-500">Share code: CABREF100</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("CABREF100");
                  toast.success("Referral code copied to clipboard!");
                }}
                className="px-3 py-1.5 bg-white text-gray-700 hover:bg-gray-50 text-xs font-bold rounded-lg border shadow-sm transition"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE TRACKING & HISTORY */}
        <div className="lg:col-span-7 space-y-8">
          {/* Map Placeholder Graphic */}
          {/* Real Google Maps Iframe Embed */}
          <div className="bg-white border rounded-3xl shadow-xl relative overflow-hidden h-[350px]">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                pickupAddress || "Bengaluru, India"
              )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            ></iframe>

            {/* SOS emergency button */}
            <button
              onClick={() => {
                toast.error("🚨 EMERGENCY SOS SIGNAL SENT! Admin & Police notified. Stay calm, help is on the way.", {
                  duration: 6000,
                  style: { background: "#ef4444", color: "#fff", fontWeight: "bold" }
                });
              }}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-black text-xs px-3.5 py-2 rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center gap-1.5 z-20 animate-pulse"
            >
              🚨 EMERGENCY SOS
            </button>
          </div>

          {/* ACTIVE BOOKINGS & STEP TRACKER */}
          <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-6">Your Bookings & Live Status</h3>

            {historyLoading ? (
              <div className="text-center py-12">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-500 text-sm">Loading trip history...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">
                No bookings requested yet. Book a ride to see live tracking updates here!
              </div>
            ) : (
              <div className="space-y-8">
                {bookings.map((booking) => {
                  const stepIndex = getStatusStepIndex(booking.status);
                  
                  return (
                    <div key={booking._id} className="border-b pb-8 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-black text-gray-900 text-lg">Trip ID: {booking._id.slice(-6).toUpperCase()}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeClass(booking.status)}`}>
                              {booking.status.replace("_", " ").toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Pickup Date: {new Date(booking.pickupDate).toLocaleDateString()} | Time: {booking.pickupTime || "Anytime"}
                          </p>
                          <p className="text-xs text-gray-800 mt-1 font-bold">
                            🚗 Chosen Car: <span className="text-primary">{booking.car?.name || "Premium Ride"}</span> ({booking.car?.model || "Legender"})
                          </p>
                          <p className="text-[11px] text-indigo-600 font-bold mt-0.5">
                            Facility: {booking.serviceType === "self_drive_pickup" ? "🔑 Self-Drive Pickup (At Point/Hub)" : "🚗 Professional Driver Provided"}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-black text-primary">₹{booking.price}.00</span>
                          <p className="text-xs text-gray-400">Fare Calculated</p>
                        </div>
                      </div>

                      {/* Route specs */}
                      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border mb-6 text-sm">
                        <div>
                          <span className="block text-xs text-gray-400 font-bold uppercase">Pickup Point</span>
                          <span className="text-gray-700 font-semibold">{booking.pickupAddress}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-400 font-bold uppercase">Drop Point</span>
                          <span className="text-gray-700 font-semibold">{booking.dropAddress}</span>
                        </div>
                      </div>

                      {/* Driver Details Card (Only if driver assigned) */}
                      {booking.driver && (
                        isBookingDay(booking.pickupDate) ? (
                          <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                                {booking.driver.name?.charAt(0) || "D"}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">{booking.driver.name}</h4>
                                <p className="text-xs text-gray-500">Vehicle: Swift Dzire (MH12-TY-7843)</p>
                                <p className="text-xs text-gray-500">Contact: {booking.driver.phone || "+91 98765 43210"}</p>
                                <p className="text-xs text-green-600 font-semibold mt-1">● Live tracking & ETA sharing active</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="block text-xs text-gray-500 font-bold">Trip OTP Code</span>
                              <span className="text-xl font-black text-blue-600 tracking-widest bg-white border border-blue-200 px-3 py-1 rounded-lg">
                                {booking.otp || "----"}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl mb-6 text-sm text-amber-800 font-medium">
                            🔒 Driver assigned! Driver contact, vehicle number, and safety OTP will unlock automatically on the booking day ({new Date(booking.pickupDate).toLocaleDateString()}).
                          </div>
                        )
                      )}

                      {/* Horizontal Step Tracker */}
                      {booking.status !== "cancelled" && (
                        <div className="w-full mt-6">
                          <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase mb-2">
                            <span>Request Status Progress</span>
                            <span className="text-primary">{Math.min(100, Math.round((stepIndex / 8) * 100))}% Complete</span>
                          </div>
                          {/* Progress Line */}
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500" 
                              style={{ width: `${(stepIndex / 8) * 100}%` }}
                            ></div>
                          </div>
                          
                          {/* Steps indicators */}
                          <div className="grid grid-cols-4 gap-2 mt-2 text-center text-[10px] font-bold text-gray-500">
                            <div className={stepIndex >= 0 ? "text-primary" : ""}>Pending</div>
                            <div className={stepIndex >= 2 ? "text-primary" : ""}>Assigned</div>
                            <div className={stepIndex >= 5 ? "text-primary" : ""}>On The Way</div>
                            <div className={stepIndex >= 7 ? "text-primary" : ""}>Completed</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;