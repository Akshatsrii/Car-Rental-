import React, { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../../assets/assets";
import Title from "../../components/owner/Title";

const ManageBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  const handleStatusChange = (index, newStatus) => {
    setBookings(prev =>
      prev.map((booking, i) =>
        i === index ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const handleCancelBooking = (booking, index) => {
    setSelectedBooking({ ...booking, index });
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setBookings(prev =>
      prev.map((booking, i) =>
        i === selectedBooking.index
          ? { ...booking, status: "cancelled" }
          : booking
      )
    );
    setShowCancelModal(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  return (
    <div className="ml-0 md:ml-64 lg:ml-72 px-4 pt-10 md:px-10 min-h-screen bg-gray-50">
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
                  <th className="p-4 font-medium text-gray-700">Date Range</th>
                  <th className="p-4 font-medium text-gray-700">Total</th>
                  <th className="p-4 font-medium text-gray-700">Payment</th>
                  <th className="p-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No bookings yet. Bookings will appear here once customers
                      start renting your cars.
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

                      {/* DATE RANGE */}
                      <td className="p-4 text-gray-600">
                        <p className="text-sm">
                          {formatDate(booking.pickupDate)} to {formatDate(booking.returnDate)}
                        </p>
                      </td>

                      {/* TOTAL */}
                      <td className="p-4">
                        <span className="font-medium text-gray-800">
                          {currency}
                          {booking.price}
                        </span>
                      </td>

                      {/* PAYMENT STATUS */}
                      <td className="p-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          offline
                        </span>
                      </td>

                      {/* ACTIONS - STATUS DROPDOWN */}
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
                          <option value="completed">Completed</option>
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
                No bookings yet. Bookings will appear here once customers start
                renting your cars.
              </div>
            ) : (
              bookings.map((booking, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex gap-3 mb-3">
                    <img
                      src={booking.car.image}
                      alt={`${booking.car.brand} ${booking.car.model}`}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {booking.car.brand} {booking.car.model}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(booking.pickupDate)} to {formatDate(booking.returnDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <p className="font-medium text-gray-800">
                        {currency}
                        {booking.price}
                      </p>
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
                      <option value="completed">Completed</option>
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