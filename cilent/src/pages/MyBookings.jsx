import React, { useState, useEffect } from "react";
import { useAppContext } from "../components/context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Calendar,
  MapPin,
  Eye,
  XCircle,
  RefreshCw,
  Car,
} from "lucide-react";

const MyBookings = () => {
  const { axios } = useAppContext();
  const navigate = useNavigate();
  const currency = "₹";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // 🔹 FETCH USER BOOKINGS (FIXED)
  const fetchMyBookings = async () => {
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

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  // 🔹 CANCEL BOOKING (FIXED)
  const confirmCancel = async () => {
    try {
      const { data } = await axios.post("/api/booking/change-status", {
        bookingId: selectedBooking._id,
        status: "Cancelled",
      });

      if (data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === selectedBooking._id
              ? { ...b, status: "Cancelled" }
              : b
          )
        );
        toast.success("Booking cancelled successfully");
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
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
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
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl">
          <Car className="mx-auto text-gray-300" size={80} />
          <p className="text-gray-500 mt-4">No bookings found</p>
        </div>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-xl shadow p-6 mb-6 grid md:grid-cols-4 gap-6"
          >
            <img
              src={booking.car?.images?.[0]}
              alt=""
              className="rounded-lg"
            />

            <div className="md:col-span-2">
              <p className="font-bold text-lg">
                {booking.car?.name} {booking.car?.model}
              </p>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${getStatusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>

              <p className="text-sm mt-3 flex gap-2">
                <Calendar size={16} />
                {formatDate(booking.pickupDate)} →{" "}
                {formatDate(booking.returnDate)}
              </p>

              <p className="text-sm mt-2 flex gap-2">
                <MapPin size={16} />
                {booking.car?.location}
              </p>
            </div>

            <div className="flex flex-col justify-between items-end">
              <p className="text-2xl font-bold">
                {currency}
                {booking.price}
              </p>

              {booking.status !== "Cancelled" &&
                booking.status !== "Completed" && (
                  <button
                    onClick={() => handleCancelBooking(booking)}
                    className="mt-4 px-4 py-2 border border-red-400 text-red-600 rounded-lg"
                  >
                    Cancel
                  </button>
                )}
            </div>
          </div>
        ))
      )}

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full">
            <h3 className="font-bold mb-4">Cancel Booking?</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border py-2 rounded"
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
