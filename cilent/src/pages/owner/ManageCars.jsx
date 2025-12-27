import React, { useEffect, useState } from "react";
import { dummyCarData, assets } from "../../assets/assets";
import Title from "../../components/owner/Title";

const ManageCars = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchOwnerCars = async () => {
    setCars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

  const toggleCarAvailability = (index) => {
    setCars(prev => 
      prev.map((car, i) => 
        i === index 
          ? { ...car, isAvailable: !car.isAvailable }
          : car
      )
    );
  };

  const handleDeleteCar = (car, index) => {
    setSelectedCar({ ...car, index });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCars(prev => prev.filter((_, i) => i !== selectedCar.index));
    setShowDeleteModal(false);
    setSelectedCar(null);
  };

  return (
    <div className="ml-0 md:ml-64 lg:ml-72 px-4 pt-10 md:px-10 min-h-screen bg-gray-50">
      <div className="max-w-7xl">
        {/* TITLE */}
        <Title
          title="Manage Cars"
          subTitle="View all listed cars, update their details, or remove them from the booking platform."
        />

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Cars</p>
            <p className="text-2xl font-semibold text-gray-800">{cars.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Available</p>
            <p className="text-2xl font-semibold text-green-600">
              {cars.filter(car => car.isAvailable).length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Unavailable</p>
            <p className="text-2xl font-semibold text-red-600">
              {cars.filter(car => !car.isAvailable).length}
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
                  <th className="p-4 font-medium text-gray-700">Category</th>
                  <th className="p-4 font-medium text-gray-700">Price</th>
                  <th className="p-4 font-medium text-gray-700">Status</th>
                  <th className="p-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {cars.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No cars listed yet. Add your first car to get started!
                    </td>
                  </tr>
                ) : (
                  cars.map((car, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      {/* CAR INFO */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={car.image}
                            alt={`${car.brand} ${car.model}`}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {car.brand} {car.model}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {car.seating_capacity} Seats · {car.transmission}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="p-4 text-gray-600">
                        {car.category}
                      </td>

                      {/* PRICE */}
                      <td className="p-4">
                        <span className="font-medium text-gray-800">
                          {currency}{car.pricePerDay}
                        </span>
                        <span className="text-gray-500 text-sm">/day</span>
                      </td>

                      {/* STATUS */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            car.isAvailable
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {car.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleCarAvailability(index)}
                            className="p-2 hover:bg-gray-100 rounded-md transition"
                            title={car.isAvailable ? "Mark as Unavailable" : "Mark as Available"}
                          >
                            <img
                              src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                              alt="Toggle visibility"
                              className="w-5 h-5"
                            />
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car, index)}
                            className="p-2 hover:bg-red-50 rounded-md transition"
                            title="Delete car"
                          >
                            <img
                              src={assets.delete_icon}
                              alt="Delete"
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            {cars.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No cars listed yet. Add your first car to get started!
              </div>
            ) : (
              cars.map((car, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex gap-3">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-800">
                            {car.brand} {car.model}
                          </p>
                          <p className="text-xs text-gray-500">
                            {car.category} · {car.seating_capacity} Seats
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            car.isAvailable
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {car.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <p className="font-medium text-gray-800">
                          {currency}{car.pricePerDay}
                          <span className="text-gray-500 text-sm font-normal">/day</span>
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleCarAvailability(index)}
                            className="p-2 hover:bg-gray-100 rounded-md transition"
                          >
                            <img
                              src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                              alt="Toggle"
                              className="w-5 h-5"
                            />
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car, index)}
                            className="p-2 hover:bg-red-50 rounded-md transition"
                          >
                            <img
                              src={assets.delete_icon}
                              alt="Delete"
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Delete Car</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-medium">{selectedCar?.brand} {selectedCar?.model}</span>? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCar(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;