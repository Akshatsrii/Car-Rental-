import React, { useState, useEffect } from "react";
import { useAppContext } from "../../components/context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DriverDashboard = () => {
  const { axios, token, user, fetchUser } = useAppContext();
  const navigate = useNavigate();
  const [status, setStatus] = useState("offline"); // available, busy, offline
  const [earnings, setEarnings] = useState(0);
  const [tripsCount, setTripsCount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otpInput, setOtpInput] = useState("");
  const [showOtpPrompt, setShowOtpPrompt] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState(null);

  const fetchDriverStats = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get("/api/booking/driver");
      if (data.success) {
        setBookings(data.bookings);
        // Calculate earnings & completed trips count
        const completed = data.bookings.filter((b) => b.status === "completed" || b.status === "paid");
        setTripsCount(completed.length);
        const total = completed.reduce((sum, b) => sum + b.price, 0);
        setEarnings(total);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriverStats();
  }, [token]);

  const handleStatusChange = async (newStatus) => {
    try {
      setStatus(newStatus);
      toast.success(`You are now ${newStatus.toUpperCase()}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleProposalResponse = async (bookingId, responseStatus) => {
    try {
      const { data } = await axios.post("/api/booking/driver-respond", {
        bookingId,
        status: responseStatus,
      });

      if (data.success) {
        toast.success(data.message);
        fetchDriverStats();
      } else {
        toast.error(data.message || "Failed to update response");
      }
    } catch (error) {
      toast.error("Error submitting response");
    }
  };

  const handleProgressChange = async (bookingId, progressStatus) => {
    if (progressStatus === "started") {
      setActiveBookingId(bookingId);
      setShowOtpPrompt(true);
      return;
    }

    try {
      const { data } = await axios.post("/api/booking/trip-progress", {
        bookingId,
        status: progressStatus,
      });

      if (data.success) {
        toast.success(data.message);
        fetchDriverStats();
      } else {
        toast.error(data.message || "Error updating progress");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const { data } = await axios.post("/api/booking/trip-progress", {
        bookingId: activeBookingId,
        status: "started",
        otp: otpInput,
      });

      if (data.success) {
        toast.success("OTP verified! Trip started.");
        setShowOtpPrompt(false);
        setOtpInput("");
        fetchDriverStats();
      } else {
        toast.error(data.message || "Invalid OTP code. Try again!");
      }
    } catch (error) {
      toast.error("Verification failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      {/* Header bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white p-6 rounded-3xl shadow-md border mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Driver Console</h1>
          <p className="text-gray-500 text-sm">Welcome back, {user?.name || "Driver partner"}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 p-2.5 rounded-2xl border">
            <span className="text-xs text-gray-500 font-bold uppercase">Status:</span>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="outline-none bg-transparent font-bold text-sm text-gray-800"
            >
              <option value="offline">🔴 Offline</option>
              <option value="available">🟢 Available</option>
              <option value="busy">🟡 Busy</option>
            </select>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl transition text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* KPI block */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border flex justify-between items-center">
          <div>
            <span className="text-gray-400 font-bold uppercase text-xs">Total Earnings</span>
            <h3 className="text-3xl font-black text-primary mt-1">₹{earnings}.00</h3>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-lg">₹</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border flex justify-between items-center">
          <div>
            <span className="text-gray-400 font-bold uppercase text-xs">Trips Completed</span>
            <h3 className="text-3xl font-black text-gray-800 mt-1">{tripsCount}</h3>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 font-bold">✓</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border flex justify-between items-center">
          <div>
            <span className="text-gray-400 font-bold uppercase text-xs">Rating</span>
            <h3 className="text-3xl font-black text-yellow-600 mt-1">4.9 ★</h3>
          </div>
          <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 font-bold">★</div>
        </div>
      </div>

      {/* TRIP PROPOSALS AND ACTIVE RIDES */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Trips / Offers List */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-2xl font-black text-gray-800 mb-2">Assigned Rides & Requests</h2>

          {loading ? (
            <div className="bg-white p-12 text-center rounded-3xl border shadow-sm">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-500">Loading assignments...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border shadow-sm text-gray-500 text-sm">
              No rides assigned to you yet. Change your status to "Available" to get requests!
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white p-6 rounded-3xl shadow-md border border-gray-150">
                  <div className="flex justify-between items-start flex-wrap gap-4 border-b pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-gray-900">Ride #{booking._id.slice(-6).toUpperCase()}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                          {booking.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Date: {new Date(booking.pickupDate).toLocaleDateString()} | Slot: {booking.pickupTime || "Anytime"}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-primary">₹{booking.price}.00</span>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Estimated Fare</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="bg-gray-50 p-4 rounded-2xl border">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Pickup Location</span>
                      <p className="font-semibold text-gray-700 mt-1">{booking.pickupAddress}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Drop Location</span>
                      <p className="font-semibold text-gray-700 mt-1">{booking.dropAddress}</p>
                    </div>
                  </div>

                  <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Customer Details</span>
                      <p className="font-bold text-gray-800 mt-1">{booking.user?.name || "Passenger Partner"}</p>
                      <p className="text-xs text-gray-500">Email: {booking.user?.email || "N/A"}</p>
                      <p className="text-xs text-gray-500 font-semibold text-primary">Phone: {booking.user?.phone || "No phone registered"}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Estimated Distance</span>
                      <p className="font-black text-indigo-600 text-lg">{booking.distance || 10} KM</p>
                    </div>
                  </div>

                  {/* Actions based on booking state */}
                  {booking.status === "driver_assigned" && (
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleProposalResponse(booking._id, "driver_accepted")}
                        className="flex-1 py-3 bg-primary hover:bg-primary-dull text-white font-bold rounded-xl transition shadow hover:scale-[1.01] active:scale-95"
                      >
                        Accept Ride Proposal
                      </button>
                      <button
                        onClick={() => handleProposalResponse(booking._id, "cancelled")}
                        className="py-3 px-6 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition active:scale-95"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {booking.status === "driver_accepted" && (
                    <button
                      onClick={() => handleProgressChange(booking._id, "driver_on_way")}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition shadow active:scale-95"
                    >
                      Start heading to Pickup location (On the Way)
                    </button>
                  )}

                  {booking.status === "driver_on_way" && (
                    <button
                      onClick={() => handleProgressChange(booking._id, "driver_arrived")}
                      className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition shadow active:scale-95"
                    >
                      Arrived at Pickup Address (Verify OTP next)
                    </button>
                  )}

                  {booking.status === "driver_arrived" && (
                    <button
                      onClick={() => handleProgressChange(booking._id, "started")}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow active:scale-95"
                    >
                      Start Trip (Requires Customer OTP)
                    </button>
                  )}

                  {booking.status === "started" && (
                    <button
                      onClick={() => handleProgressChange(booking._id, "completed")}
                      className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow active:scale-95"
                    >
                      End & Complete Trip
                    </button>
                  )}

                  {booking.status === "completed" && (
                    <button
                      onClick={() => handleProgressChange(booking._id, "paid")}
                      className="w-full py-3 bg-primary hover:bg-primary-dull text-white font-bold rounded-xl transition shadow active:scale-95"
                    >
                      Confirm Payment received
                    </button>
                  )}

                  {booking.status === "paid" && (
                    <div className="text-center py-2 text-green-600 font-bold text-sm bg-green-50 rounded-xl border border-green-200">
                      ✓ Trip paid & closed successfully
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: GPS NAVIGATION */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-3xl border shadow-sm sticky top-6">
            <h3 className="font-black text-gray-800 mb-4 text-lg">GPS Navigation Monitor</h3>
            <div className="h-64 bg-gray-100 rounded-2xl flex items-center justify-center border relative overflow-hidden mb-4">
              <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:12px_12px] opacity-40"></div>
              
              {/* Navigation route illustration */}
              <div className="w-4 h-4 bg-primary rounded-full absolute top-1/3 left-1/3 animate-ping"></div>
              <div className="w-3 h-3 bg-primary rounded-full absolute top-1/3 left-1/3 border border-white"></div>
              
              <span className="text-gray-400 text-xs font-bold relative z-10 text-center px-4">
                🗺️ Google Maps Live Location sharing active.
              </span>
            </div>
            <button
              onClick={() => window.open("https://maps.google.com", "_blank")}
              className="w-full py-3 border-2 border-primary text-primary hover:bg-primary/5 font-bold rounded-xl transition flex items-center justify-center gap-2 text-sm"
            >
              Open External GPS Navigation
            </button>
          </div>
        </div>
      </div>

      {/* OTP MODAL DIALOG */}
      {showOtpPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-sm w-full border text-center animate-scaleUp">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Trip Start Verification</h3>
            <p className="text-gray-500 text-xs mb-6">Ask the passenger for the 4-digit code displayed on their active booking card.</p>
            
            <input
              type="text"
              placeholder="Enter 4-Digit OTP"
              maxLength="4"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-2xl font-black tracking-widest outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition mb-6"
            />

            <div className="flex gap-4">
              <button
                onClick={handleVerifyOtp}
                className="flex-1 py-3 bg-primary hover:bg-primary-dull text-white font-bold rounded-xl transition"
              >
                Verify & Start
              </button>
              <button
                onClick={() => setShowOtpPrompt(false)}
                className="py-3 px-5 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
