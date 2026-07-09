import React, { useState, useEffect } from "react";
import { useAppContext } from "../components/context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Calendar,
  MapPin,
  XCircle,
  RefreshCw,
  Clock,
  Compass,
} from "lucide-react";

const MyBookings = () => {
  const { axios, token, user } = useAppContext();
  const navigate = useNavigate();
  const currency = "₹";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // 🔹 FETCH USER BOOKINGS
  const fetchMyBookings = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get("/api/booking/user");

      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const isBookingDay = (pickupDateString) => {
    const today = new Date().toDateString();
    const pickupDate = new Date(pickupDateString).toDateString();
    return today === pickupDate;
  };

  const printInvoice = (booking) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>CarRental Cabs - Invoice #${booking._id.slice(-6).toUpperCase()}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; margin: 40px; }
            .invoice-box { max-width: 800px; margin: auto; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, .15); padding: 30px; border-radius: 10px; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
            .details { margin: 20px 0; font-size: 14px; line-height: 24px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 30px; }
            .table th, .table td { border-bottom: 1px solid #eee; padding: 12px; text-align: left; }
            .table th { background-color: #f9fafb; font-weight: bold; }
            .total { text-align: right; margin-top: 30px; font-size: 18px; font-weight: bold; color: #2563eb; }
            .footer { margin-top: 50px; font-size: 12px; text-align: center; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <div class="header">
              <div class="logo">CarRental Cabs</div>
              <div>
                <strong>Invoice #${booking._id.slice(-6).toUpperCase()}</strong><br/>
                Date: ${new Date(booking.pickupDate).toLocaleDateString()}<br/>
                Status: PAID
              </div>
            </div>
            <div class="details">
              <table style="width: 100%">
                <tr>
                  <td>
                    <strong>Customer Details:</strong><br/>
                    Name: ${user?.name || "Passenger partner"}<br/>
                    Email: ${user?.email || "N/A"}<br/>
                  </td>
                  <td style="text-align: right">
                    <strong>Trip Route Details:</strong><br/>
                    Pickup: ${booking.pickupAddress}<br/>
                    Drop: ${booking.dropAddress}<br/>
                    Distance: ${booking.distance || 10} KM
                  </td>
                </tr>
              </table>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Fare Description</th>
                  <th style="text-align: right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Base Ride Charge</td>
                  <td style="text-align: right">₹50.00</td>
                </tr>
                <tr>
                  <td>Distance Charge (${booking.distance || 10} KM)</td>
                  <td style="text-align: right">₹${(booking.distance || 10) * 12}.00</td>
                </tr>
                <tr>
                  <td>State Toll / CGST & SGST (5%)</td>
                  <td style="text-align: right">₹${Math.round((50 + (booking.distance || 10) * 12) * 0.05)}.00</td>
                </tr>
              </tbody>
            </table>
            <div class="total">
              Total Amount Paid: ₹${booking.price}.00
            </div>
            <div class="footer">
              Thank you for riding with CarRental Cabs! Safety and Comfort is our commitment.<br/>
              © ${new Date().getFullYear()} CarRental Cabs Ltd. Bengaluru, India.
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  useEffect(() => {
    fetchMyBookings();
  }, [token]);

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  // 🔹 CANCEL BOOKING (Saves lowercase status matching DB validation constraints)
  const confirmCancel = async () => {
    try {
      const { data } = await axios.post("/api/booking/change-status", {
        bookingId: selectedBooking._id,
        status: "cancelled",
      });

      if (data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === selectedBooking._id
              ? { ...b, status: "cancelled" }
              : b
          )
        );
        toast.success("Ride cancelled successfully");
      } else {
        toast.error(data.message || "Failed to cancel ride");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking");
    } finally {
      setShowCancelModal(false);
      setSelectedBooking(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "driver_assigned":
      case "driver_accepted":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "driver_on_way":
      case "driver_arrived":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "started":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "completed":
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="animate-spin text-primary mx-auto mb-3" size={40} />
          <p className="text-gray-500 text-sm">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-500 text-sm mb-8">View booking histories, live track status, or cancel pending rides.</p>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border shadow-sm">
            <Compass className="mx-auto text-gray-300 mb-4 animate-pulse" size={64} />
            <p className="text-gray-500 font-semibold">No bookings found</p>
            <button
              onClick={() => navigate("/cars")}
              className="mt-4 px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-sm"
            >
              Book Your First Ride
            </button>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-3xl shadow-md p-6 mb-6 border border-gray-100 grid md:grid-cols-4 gap-6 items-center"
            >
              {/* Trip summary info */}
              <div className="md:col-span-3 space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-black text-gray-900 text-lg">
                    Trip #{booking._id.slice(-6).toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>

                {/* Pickup and Drop Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl border">
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Pickup Point</span>
                    <span className="font-semibold text-gray-700">{booking.pickupAddress}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Drop Point</span>
                    <span className="font-semibold text-gray-700">{booking.dropAddress}</span>
                  </div>
                </div>

                <div className="flex gap-4 text-xs font-bold bg-gray-50/50 p-3 rounded-xl border border-dashed flex-wrap">
                  <span className="text-gray-800">
                    🚗 Chosen Car: <span className="text-primary">{booking.car?.name || "Premium Sedan"}</span> ({booking.car?.model || "Legender"})
                  </span>
                  <span className="text-indigo-600">
                    Facility: {booking.serviceType === "self_drive_pickup" ? "🔑 Self-Drive (Pick up at Hub)" : "🚗 Driver Assigned"}
                  </span>
                </div>

                <div className="flex gap-6 text-sm text-gray-500 font-semibold flex-wrap">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    Date: {formatDate(booking.pickupDate)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    Time Slot: {booking.pickupTime || "Anytime"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Compass size={16} className="text-primary" />
                    Distance: {booking.distance || 10} KM
                  </span>
                </div>

                {/* Driver Info Display (if assigned) */}
                {booking.driver && (
                  isBookingDay(booking.pickupDate) ? (
                    <div className="bg-indigo-50/50 border border-indigo-150 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] text-indigo-400 font-bold uppercase">Assigned Driver</span>
                        <p className="font-bold text-gray-800 text-sm mt-0.5">{booking.driver.name}</p>
                        <p className="text-[11px] text-gray-500">Vehicle: Swift Dzire (MH12-TY-7843)</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {/* Dynamic scanable QR Code */}
                        <div className="text-center bg-white p-2 rounded-xl border">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${booking._id}`}
                            alt="booking QR code"
                            className="w-12 h-12"
                          />
                          <span className="block text-[8px] text-gray-400 font-bold mt-1 uppercase">Scan to Start</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] text-indigo-400 font-bold uppercase">Security OTP</span>
                          <span className="text-lg font-black text-indigo-600 tracking-wider">
                            {booking.otp || "----"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-800 font-medium">
                      🔒 Driver assigned! Driver contact, vehicle number, and safety OTP will unlock automatically on the booking day ({new Date(booking.pickupDate).toLocaleDateString()}).
                    </div>
                  )
                )}

                {booking.status === "pending" && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-2xl text-xs text-green-800 font-bold flex items-center gap-2">
                    <span>🎉</span>
                    <span>Order Placed Successfully! Awaiting Admin confirmation & driver assignment.</span>
                  </div>
                )}
              </div>

              {/* Price and Cancel controls */}
              <div className="flex flex-col justify-center items-end h-full border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                <span className="text-xs text-gray-400 font-semibold uppercase">Total Fare</span>
                <p className="text-3xl font-black text-primary">
                  {currency}{booking.price}
                </p>

                {booking.status !== "cancelled" &&
                  booking.status !== "completed" &&
                  booking.status !== "paid" && (
                    <button
                      onClick={() => handleCancelBooking(booking)}
                      className="mt-6 w-full md:w-auto px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-bold rounded-xl transition"
                    >
                      Cancel Ride
                    </button>
                  )}

                {(booking.status === "completed" || booking.status === "paid") && (
                  <button
                    onClick={() => printInvoice(booking)}
                    className="mt-4 w-full md:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition flex items-center gap-1.5 shadow-md"
                  >
                    📄 Invoice PDF
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full border text-center shadow-2xl animate-scaleUp">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle size={28} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Cancel Ride Request?</h3>
            <p className="text-gray-500 text-xs mb-6">Are you sure you want to cancel this booking? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border py-2.5 rounded-xl font-bold text-gray-500 text-sm"
              >
                No, Keep
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-bold text-sm"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
