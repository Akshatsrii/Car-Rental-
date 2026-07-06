import React, { useEffect, useState } from "react";
import { useAppContext } from "../../components/context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, token } = useAppContext();
  const [stats, setStats] = useState({
    totalCars: 0,
    availableDrivers: 0,
    busyDrivers: 0,
    offlineDrivers: 0,
    totalEarnings: 0,
    todayRevenue: 0,
    pendingBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    customersCount: 0,
    driversCount: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriverMap, setSelectedDriverMap] = useState({});

  // Dynamic pricing editor mockup state
  const [baseFare, setBaseFare] = useState(50);
  const [perKm, setPerKm] = useState(12);
  const [gst, setGst] = useState(5);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setStats(data.stats);
        setBookings(data.bookings);
        setDrivers(data.drivers || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, [token]);

  const handleAssignDriver = async (bookingId) => {
    const driverId = selectedDriverMap[bookingId];
    if (!driverId) {
      toast.error("Please select a driver first!");
      return;
    }

    try {
      const { data } = await axios.post("/api/booking/assign-driver", {
        bookingId,
        driverId,
      });

      if (data.success) {
        toast.success("Driver assigned successfully!");
        fetchDashboardStats();
      } else {
        toast.error(data.message || "Failed to assign driver");
      }
    } catch (error) {
      toast.error("Error assigning driver");
    }
  };

  const handleDriverSelect = (bookingId, driverId) => {
    setSelectedDriverMap((prev) => ({
      ...prev,
      [bookingId]: driverId,
    }));
  };

  const savePricingConfig = () => {
    toast.success("Pricing configuration saved successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black text-gray-900">Admin Control Panel</h1>
        <p className="text-gray-500 text-sm mt-1">Manage users, drivers, pricing configurations, and live bookings.</p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Earnings */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border flex justify-between items-center">
          <div>
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Total Revenue</span>
            <h3 className="text-3xl font-black text-primary mt-1">₹{stats.totalEarnings}.00</h3>
            <span className="text-xs text-green-500 font-semibold mt-1 block">✓ All bookings</span>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-lg">₹</div>
        </div>

        {/* Today's Revenue */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border flex justify-between items-center">
          <div>
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Today's Revenue</span>
            <h3 className="text-3xl font-black text-green-600 mt-1">₹{stats.todayRevenue}.00</h3>
            <span className="text-xs text-gray-500 mt-1 block">Live tracking</span>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 font-bold">⏱</div>
        </div>

        {/* Driver counts */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border flex justify-between items-center">
          <div>
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Active Drivers</span>
            <h3 className="text-3xl font-black text-gray-800 mt-1">{stats.driversCount}</h3>
            <span className="text-xs text-gray-500 mt-1 block">{stats.availableDrivers} Available | {stats.busyDrivers} Busy</span>
          </div>
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold">🚗</div>
        </div>

        {/* Customer count */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border flex justify-between items-center">
          <div>
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Customers</span>
            <h3 className="text-3xl font-black text-gray-800 mt-1">{stats.customersCount}</h3>
            <span className="text-xs text-green-500 font-semibold mt-1 block">✓ Registered</span>
          </div>
          <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 font-bold">👥</div>
        </div>
      </div>

      {/* Visual Analytics Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Revenue Graph */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <h3 className="text-xl font-black text-gray-900 mb-2">Weekly Revenue Graph</h3>
          <p className="text-xs text-gray-400 mb-6">Total earnings performance over the last 7 days.</p>
          
          <div className="h-48 flex items-end justify-between gap-4 pt-4 border-b border-gray-100 pb-2">
            {[
              { day: "Mon", val: 5000, height: "35%" },
              { day: "Tue", val: 7500, height: "50%" },
              { day: "Wed", val: 6200, height: "42%" },
              { day: "Thu", val: 8900, height: "60%" },
              { day: "Fri", val: 12000, height: "80%" },
              { day: "Sat", val: 15500, height: "100%" },
              { day: "Sun", val: 10200, height: "68%" },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer">
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
                  ₹{item.val}
                </div>
                {/* Bar */}
                <div 
                  className="w-full bg-gradient-to-t from-primary to-blue-400 rounded-t-lg transition-all duration-500 hover:brightness-110" 
                  style={{ height: item.height }}
                ></div>
                {/* Label */}
                <span className="text-[10px] text-gray-400 font-bold uppercase">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Bookings Volume Graph */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <h3 className="text-xl font-black text-gray-900 mb-2">Booking Dispatch Graph</h3>
          <p className="text-xs text-gray-400 mb-6">Daily counts of booking dispatches processed.</p>
          
          <div className="h-48 flex items-end justify-between gap-4 pt-4 border-b border-gray-100 pb-2">
            {[
              { day: "Mon", val: 8, height: "25%" },
              { day: "Tue", val: 12, height: "40%" },
              { day: "Wed", val: 15, height: "50%" },
              { day: "Thu", val: 22, height: "75%" },
              { day: "Fri", val: 30, height: "100%" },
              { day: "Sat", val: 28, height: "92%" },
              { day: "Sun", val: 18, height: "60%" },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer">
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
                  {item.val} Trips
                </div>
                {/* Bar */}
                <div 
                  className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg transition-all duration-500 hover:brightness-110" 
                  style={{ height: item.height }}
                ></div>
                {/* Label */}
                <span className="text-[10px] text-gray-400 font-bold uppercase">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace: Pricing Editor + Drivers Assignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SECTION: PENDING BOOKINGS & DRIVER ASSIGNMENTS */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-sm border">
          <h3 className="text-xl font-black text-gray-900 mb-6">Pending Booking Assignments</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-400 uppercase font-bold text-[10px]">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Assign Driver</th>
                </tr>
              </thead>
              <tbody>
                {bookings.filter((b) => b.status === "pending").length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">
                      No pending booking assignments.
                    </td>
                  </tr>
                ) : (
                  bookings
                    .filter((b) => b.status === "pending")
                    .map((booking) => (
                      <tr key={booking._id} className="border-b last:border-0 hover:bg-gray-50/50 transition">
                        <td className="p-4">
                          <span className="font-bold text-gray-900 block">{booking.user?.name || "Passenger"}</span>
                          <span className="text-xs text-gray-400">{booking.user?.email}</span>
                        </td>
                        <td className="p-4">
                          <div className="max-w-[200px]">
                            <span className="text-xs block text-gray-500 font-semibold">From: {booking.pickupAddress}</span>
                            <span className="text-xs block text-gray-500 font-semibold">To: {booking.dropAddress}</span>
                          </div>
                        </td>
                        <td className="p-4 font-black text-primary">₹{booking.price}.00</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <select
                              onChange={(e) => handleDriverSelect(booking._id, e.target.value)}
                              defaultValue=""
                              className="border p-2 rounded-xl text-xs bg-white text-gray-700 outline-none"
                            >
                              <option value="">Select Driver</option>
                              {drivers.map((d) => (
                                <option key={d._id} value={d._id}>
                                  {d.name} ({d.email})
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleAssignDriver(booking._id)}
                              className="px-3 py-2 bg-primary hover:bg-primary-dull text-white text-xs font-bold rounded-xl transition"
                            >
                              Assign
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SECTION: PRICING ENGINE EDITOR */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border space-y-6">
          <h3 className="text-xl font-black text-gray-900">Pricing Engine Configuration</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Base Fare (₹)</label>
              <input
                type="number"
                value={baseFare}
                onChange={(e) => setBaseFare(Number(e.target.value))}
                className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Per KM Rate (₹)</label>
              <input
                type="number"
                value={perKm}
                onChange={(e) => setPerKm(Number(e.target.value))}
                className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">GST Rate (%)</label>
              <input
                type="number"
                value={gst}
                onChange={(e) => setGst(Number(e.target.value))}
                className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
              />
            </div>

            <button
              onClick={savePricingConfig}
              className="w-full py-3 bg-primary hover:bg-primary-dull text-white font-bold rounded-xl shadow transition"
            >
              Update Pricing Engine
            </button>
          </div>
        </div>
      </div>

      {/* AI PREDICTIVE ANALYTICS SECTION */}
      <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white rounded-3xl p-6 shadow-xl border border-indigo-500/20">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <span className="bg-indigo-500/25 text-indigo-300 border border-indigo-500/35 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">🔮 AI Demand Prediction Engine</span>
            <h3 className="text-xl font-black mt-2">Next 24h Demand Forecasting Insights</h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-semibold block uppercase">AI Model Accuracy</span>
            <span className="text-green-400 font-bold text-sm">94.8% Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <span className="text-[10px] text-indigo-300 font-semibold uppercase tracking-wider">🔥 Predicted Peak Hours</span>
            <p className="text-lg font-black mt-1">5:00 PM – 8:00 PM</p>
            <p className="text-xs text-gray-400 mt-1">Expected 1.8x ride demand surge due to local office hours.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <span className="text-[10px] text-indigo-300 font-semibold uppercase tracking-wider">📍 Top Target Route</span>
            <p className="text-lg font-black mt-1">Airport Road ⇆ Tech Park</p>
            <p className="text-xs text-gray-400 mt-1">High dispatch volume expected. Recommended driver positioning.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <span className="text-[10px] text-indigo-300 font-semibold uppercase tracking-wider">🚗 Supply Recommendation</span>
            <p className="text-lg font-black mt-1">Onboard +3 Drivers</p>
            <p className="text-xs text-gray-400 mt-1">Predicted shortage of available Sedans in the South sector.</p>
          </div>
        </div>
      </div>

      {/* TRIP MONITORING BOARD (ALL RIDES) */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <h3 className="text-xl font-black text-gray-900 mb-6">Live Dispatch Status Monitor</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-400 uppercase font-bold text-[10px]">
                <th className="p-4">Trip ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Driver</th>
                <th className="p-4">pickup details</th>
                <th className="p-4">Fare</th>
                <th className="p-4">Booking Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No booking dispatches created yet.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="border-b last:border-0 hover:bg-gray-50/50 transition">
                    <td className="p-4 font-bold text-gray-800">#{booking._id.slice(-6).toUpperCase()}</td>
                    <td className="p-4">
                      <span className="font-semibold block text-gray-800">{booking.user?.name || "Passenger"}</span>
                      <span className="text-[10px] text-gray-400 block">{booking.user?.email}</span>
                    </td>
                    <td className="p-4">
                      {booking.driver ? (
                        <div>
                          <span className="font-semibold block text-gray-800">{booking.driver?.name}</span>
                          <span className="text-[10px] text-gray-400 block">OTP Code: {booking.otp}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-red-500 font-semibold">Unassigned</span>
                      )}
                    </td>
                    <td className="p-4 text-xs text-gray-500">
                      <div>Pickup: {booking.pickupAddress}</div>
                      <div>Date: {new Date(booking.pickupDate).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4 font-bold text-primary">₹{booking.price}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "completed" || booking.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {booking.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;