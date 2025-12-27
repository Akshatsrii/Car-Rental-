import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  dummyCarData } from "../assets/assets";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const currency = import.meta.env.VITE_CURRENCY || "$";

  useEffect(() => {
    const foundCar = dummyCarData.find((car) => car._id === id);
    setCar(foundCar);
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();
    // Add booking logic here
    console.log("Booking:", { car, pickupDate, returnDate });
  };

  return car ? (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 md:px-16 lg:px-24 xl:px-32 py-12 overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="relative z-10 flex items-center gap-3 mb-8 text-gray-600 hover:text-primary transition-colors duration-300 group"
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center group-hover:shadow-lg transition-all group-hover:scale-110">
          <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <span className="font-semibold">Back to all cars</span>
      </button>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-8">

          {/* IMAGE */}
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={car.image}
              alt={car.model}
              className="w-full md:max-h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Available Badge on Image */}
            {car.isAvaliable && (
              <span className="absolute top-6 left-6 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-sm">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Available Now
              </span>
            )}
          </div>

          {/* TITLE */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
              {car.brand} {car.model}
            </h1>
            <p className="text-gray-500 text-lg font-medium mt-2 flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-primary rounded-full text-sm font-semibold">
                {car.category}
              </span>
              · {car.year}
            </p>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                text: `${car.seating_capacity} Seats`,
                color: "blue",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                text: car.fuel_type,
                color: "green",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                text: car.transmission,
                color: "purple",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                text: car.location,
                color: "red",
              },
            ].map(({ icon, text, color }) => (
              <div
                key={text}
                className={`group flex flex-col items-center bg-white hover:bg-${color}-50 p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-${color}-200 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="mb-3">{icon}</div>
                <span className="text-sm text-gray-700 font-semibold text-center">{text}</span>
              </div>
            ))}
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary-dull rounded-full"></div>
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              {car.description || "Experience luxury and performance combined. This premium vehicle offers exceptional comfort, cutting-edge technology, and impressive performance. Perfect for business trips, special occasions, or simply enjoying the drive. Well-maintained and regularly serviced to ensure your complete satisfaction."}
            </p>
          </div>

          {/* FEATURES */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary-dull rounded-full"></div>
              Features & Amenities
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "360° Camera System",
                "Bluetooth Connectivity",
                "GPS Navigation",
                "Heated Seats",
                "Rear View Camera",
                "Premium Sound System",
                "Cruise Control",
                "Parking Sensors",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center text-gray-700 font-medium group"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT SECTION - BOOKING FORM */}
        <div className="lg:sticky lg:top-24 h-fit">
          <form onSubmit={handleBooking} className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
            
            {/* Price Header */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-5xl font-black text-gray-900">
                    {currency}{car.pricePerDay}
                  </span>
                  <span className="text-gray-500 text-lg font-medium ml-2">per day</span>
                </div>
              </div>
            </div>

            {/* Date Inputs */}
            <div className="space-y-6 mb-6">
              
              {/* Pickup Date */}
              <div>
                <label htmlFor="pickup" className="block text-sm font-bold text-gray-700 mb-3">
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="pickup"
                  value={pickupDate}
                  onChange={(e) => {
                    setPickupDate(e.target.value);
                    setReturnDate("");
                  }}
                  min={today}
                  required
                  className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-gray-700 font-medium"
                />
              </div>

              {/* Return Date */}
              <div>
                <label htmlFor="return" className="block text-sm font-bold text-gray-700 mb-3">
                  Return Date
                </label>
                <input
                  type="date"
                  id="return"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={pickupDate || today}
                  required
                  className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-gray-700 font-medium"
                />
              </div>
            </div>

            {/* Book Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 mb-4"
            >
              Book Now
            </button>

            {/* Info Text */}
            <p className="text-center text-sm text-gray-500 font-medium">
              No credit card required to reserve
            </p>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Free cancellation up to 24h</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Insurance included</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">24/7 roadside assistance</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-lg font-medium">Loading car details...</p>
      </div>
    </div>
  );
};

export default CarDetails;