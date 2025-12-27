import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {

  if (!car) return null;

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "$";

  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-gray-100 hover:border-primary/30 h-full flex flex-col"
    >

      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 flex-shrink-0">
        <img
          src={car.image}
          alt="Car Image"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Available Badge */}
        {car.isAvaliable && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-sm">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Available Now
          </span>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-primary to-primary-dull backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl border border-white/20">
          <span className="text-lg">{currency}{car.pricePerDay}</span>
          <span className="text-xs opacity-90"> / day</span>
        </div>

        {/* Favorite Icon */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Add favorite logic here
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <svg className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-4 flex-grow flex flex-col">

        {/* TITLE */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors duration-300">
            {car.brand} {car.model}
          </h3>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {car.category} · {car.year}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        {/* INFO GRID */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 flex-grow">

          <div className="flex items-center gap-2 group/item">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover/item:bg-primary/10 transition-colors flex-shrink-0">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="font-medium">{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center gap-2 group/item">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center group-hover/item:bg-green-100 transition-colors flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-medium">{car.fuel_type}</span>
          </div>

          <div className="flex items-center gap-2 group/item">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center group-hover/item:bg-purple-100 transition-colors flex-shrink-0">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-medium">{car.transmission}</span>
          </div>

          <div className="flex items-center gap-2 group/item">
            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center group-hover/item:bg-red-100 transition-colors flex-shrink-0">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-medium">{car.location}</span>
          </div>

        </div>

        {/* View Details Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/car-details/${car._id}`);
            scrollTo(0, 0);
          }}
          className="w-full mt-auto py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primary hover:to-primary-dull text-gray-700 hover:text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-gray-200 hover:border-transparent"
        >
          <span>View Details</span>
          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default CarCard;