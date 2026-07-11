import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../components/context/AppContext";
import toast from "react-hot-toast";

const ManageBookings = () => {
  const { axios } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const fetchOwnerBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/booking/owner");
      if (data.success) {
        const mappedBookings = (data.bookings || []).map((booking) => ({
          ...booking,
          car: {
            ...booking.car,
            brand: booking.car?.name || "Unknown",
            model: booking.car?.model || "Car",
            image: booking.car?.images && booking.car.images.length > 0 
              ? (booking.car.images[0].startsWith('http') ? booking.car.images[0] : `${import.meta.env.VITE_BASE_URL}/${booking.car.images[0]}`)
              : "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"
          }
        }));
        setBookings(mappedBookings);
      } else {
        toast.error(data.message || "Failed to load bookings");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  const handleStatusChange = async (index, newStatus) => {
    const booking = bookings[index];
    try {
      const { data } = await axios.post("/api/booking/change-status", {
        bookingId: booking._id,
        status: newStatus,
      });

      if (data.success) {
        toast.success(`Booking status updated to ${newStatus}`);
        setBookings((prev) =>
          prev.map((b, i) =>
            i === index ? { ...b, status: newStatus } : b
          )
        );
      } else {
        toast.error(data.message || "Failed to update booking status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update booking status");
    }
  };

  const handleCancelBooking = (booking, index) => {
    setSelectedBooking({ ...booking, index });
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    try {
      const { data } = await axios.post("/api/booking/change-status", {
        bookingId: selectedBooking._id,
        status: "cancelled",
      });

      if (data.success) {
        toast.success("Booking cancelled successfully");
        setBookings((prev) =>
          prev.map((b, i) =>
            i === selectedBooking.index ? { ...b, status: "cancelled" } : b
          )
        );
      } else {
        toast.error(data.message || "Failed to cancel booking");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking");
    } finally {
      setShowCancelModal(false);
      setSelectedBooking(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toISOString().split('T')[0];
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-700";
    switch (status.toLowerCase()) {
      case "confirmed":
      case "driver_assigned":
      case "driver_accepted":
        return "bg-green-100 text-green-700";
      case "driver_on_way":
      case "driver_arrived":
      case "started":
        return "bg-indigo-100 text-indigo-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "completed":
      case "paid":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  return (
    <div className="space-y-6">
      <div className="max-w-7xl">
        {/* TITLE */}
        <Title
          title="Manage Bookings"
          subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
        />

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
            <p className="text-2xl font-semibold text-gray-800">
              {bookings.length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Confirmed</p>
            <p className="text-2xl font-semibold text-green-600">
              {bookings.filter((b) => b.status === "confirmed").length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <p className="text-2xl font-semibold text-yellow-600">
              {bookings.filter((b) => b.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Cancelled</p>
            <p className="text-2xl font-semibold text-red-600">
              {bookings.filter((b) => b.status === "cancelled").length}
            </p>
          </div>
        </div>

        {/* TABLE WRAPPER */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              {/* TABLE HEAD */}
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="p-4 font-medium text-gray-700">Car</th>
                  <th className="p-4 font-medium text-gray-700">Date & Slot</th>
                  <th className="p-4 font-medium text-gray-700">Route Details</th>
                  <th className="p-4 font-medium text-gray-700">Payment Summary</th>
                  <th className="p-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      Loading bookings...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No bookings yet. Bookings will appear here once customers start renting your cars.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      {/* CAR INFO */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.car.image}
                            alt={`${booking.car.brand} ${booking.car.model}`}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {booking.car.brand} {booking.car.model}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* DATE & TIME SLOT */}
                      <td className="p-4 text-gray-600">
                        <p className="text-sm font-semibold text-gray-800">
                          {formatDate(booking.pickupDate)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Slot: {booking.pickupTime || "10:00"}
                        </p>
                      </td>

                      {/* ROUTE */}
                      <td className="p-4 text-gray-600">
                        <p className="text-xs font-bold text-gray-800 max-w-[200px] truncate" title={booking.pickupAddress}>
                          📍 {booking.pickupAddress}
                        </p>
                        <p className="text-xs text-gray-500 max-w-[200px] truncate" title={booking.dropAddress}>
                          🏁 {booking.dropAddress}
                        </p>
                        <p className="text-[10px] text-primary font-black mt-1">
                          {booking.distance || 0} KM
                        </p>
                      </td>

                      {/* PAYMENT SUMMARY */}
                      <td className="p-4">
                        <div className="text-xs text-gray-600 space-y-0.5">
                          <p className="font-bold text-gray-800">Total: {currency}{booking.price}</p>
                          <p className="text-green-600 font-semibold">Advance (50%): {currency}{Math.round(booking.price * 0.5)} (Paid)</p>
                          <p className="text-gray-500">To Driver (50%): {currency}{Math.round(booking.price * 0.5)} (Pending)</p>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusChange(index, e.target.value)
                          }
                          className={`px-3 py-1.5 rounded-md text-xs font-medium border-0 outline-none cursor-pointer ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="driver_assigned">Driver Assigned</option>
                          <option value="driver_accepted">Driver Accepted</option>
                          <option value="driver_on_way">Driver On Way</option>
                          <option value="driver_arrived">Driver Arrived</option>
                          <option value="started">Trip Started</option>
                          <option value="completed">Completed</option>
                          <option value="paid">Paid</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            {bookings.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No bookings yet. Bookings will appear here once customers start renting your cars.
              </div>
            ) : (
              bookings.map((booking, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-gray-100 last:border-b-0 space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={booking.car.image}
                      alt={`${booking.car.brand} ${booking.car.model}`}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 text-xs">
                      <p className="font-bold text-gray-800 text-sm">
                        {booking.car.brand} {booking.car.model}
                      </p>
                      <p className="text-gray-600 mt-1">
                        📅 {formatDate(booking.pickupDate)} ({booking.pickupTime || "10:00"})
                      </p>
                      <p className="text-gray-500 truncate mt-0.5">
                        📍 {booking.pickupAddress} ➔ {booking.dropAddress}
                      </p>
                      <p className="text-primary font-black mt-0.5">
                        {booking.distance || 0} KM
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t pt-2">
                    <div className="text-[10px] text-gray-600">
                      <p className="font-bold">Total: {currency}{booking.price}</p>
                      <p className="text-green-600">Advance (50%): {currency}{Math.round(booking.price * 0.5)}</p>
                    </div>
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border-0 outline-none cursor-pointer ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="driver_assigned">Driver Assigned</option>
                      <option value="driver_accepted">Driver Accepted</option>
                      <option value="driver_on_way">Driver On Way</option>
                      <option value="driver_arrived">Driver Arrived</option>
                      <option value="started">Trip Started</option>
                      <option value="completed">Completed</option>
                      <option value="paid">Paid</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* CANCEL CONFIRMATION MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Cancel Booking
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel the booking for{" "}
              <span className="font-medium">
                {selectedBooking?.car?.brand} {selectedBooking?.car?.model}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedBooking(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition font-medium"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition font-medium"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;