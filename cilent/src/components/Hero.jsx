import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center gap-12 md:gap-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 px-4 py-12 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
      
      {/* Heading Section */}
      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent leading-tight tracking-tight">
          Luxury cars on Rent
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-medium">
          Experience premium comfort with our exclusive fleet
        </p>
      </div>

      {/* Search Form */}
      <form className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:py-6 md:px-8 rounded-3xl md:rounded-full w-full max-w-80 md:max-w-[1200px] bg-white/80 backdrop-blur-xl shadow-[0px_20px_60px_rgba(0,0,0,0.12)] hover:shadow-[0px_25px_70px_rgba(0,0,0,0.15)] border border-gray-100 transition-all duration-500 hover:scale-[1.02]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 w-full">
          
          {/* PICKUP LOCATION */}
          <div className="flex flex-col items-start gap-3 w-full md:flex-1 group">
            <div className="flex items-center gap-2 text-gray-400 group-hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider">Location</span>
            </div>
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="outline-none bg-transparent text-base font-semibold cursor-pointer w-full text-gray-800 hover:text-primary transition-colors"
            >
              <option value="">Select your city</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="h-0.5 w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 group-hover:via-primary transition-all"></div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

          {/* PICKUP DATE */}
          <div className="flex flex-col items-start gap-3 w-full md:flex-1 group">
            <div className="flex items-center gap-2 text-gray-400 group-hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <label htmlFor="pickup-date" className="text-xs font-bold uppercase tracking-wider cursor-pointer">
                Pick-up
              </label>
            </div>
            <input
              type="date"
              id="pickup-date"
              value={pickupDate}
              onChange={(e) => {
                setPickupDate(e.target.value);
                setReturnDate("");
              }}
              min={today}
              className="text-base text-gray-800 font-semibold bg-transparent outline-none cursor-pointer w-full hover:text-primary transition-colors"
              required
            />
            <div className="h-0.5 w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 group-hover:via-primary transition-all"></div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

          {/* RETURN DATE */}
          <div className="flex flex-col items-start gap-3 w-full md:flex-1 group">
            <div className="flex items-center gap-2 text-gray-400 group-hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <label htmlFor="return-date" className="text-xs font-bold uppercase tracking-wider cursor-pointer">
                Return
              </label>
            </div>
            <input
              type="date"
              id="return-date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={pickupDate || today}
              className="text-base text-gray-800 font-semibold bg-transparent outline-none cursor-pointer w-full hover:text-primary transition-colors"
              required
            />
            <div className="h-0.5 w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 group-hover:via-primary transition-all"></div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

          {/* SEARCH BUTTON */}
          <button
            type="submit"
            className="relative flex items-center justify-center gap-3 px-10 py-4 mt-6 md:mt-0 bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary text-white font-bold rounded-full cursor-pointer shadow-[0px_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0px_15px_40px_rgba(0,0,0,0.3)] w-full md:w-auto transform hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden group md:flex-shrink-0"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <img
              src={assets.search_icon}
              alt="search"
              className="brightness-300 w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300"
            />
            <span className="relative z-10 text-base">Search</span>
          </button>

        </div>
      </form>

      {/* Car Image with Animation */}
      <div className="relative z-10 w-full flex justify-center">
        <div className="relative">
          {/* Glow effect behind car */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent blur-2xl scale-110"></div>
          
          <img
            src={assets.main_car}
            alt="car"
            className="max-h-74 relative z-10 drop-shadow-[0px_20px_50px_rgba(0,0,0,0.25)] hover:drop-shadow-[0px_30px_60px_rgba(0,0,0,0.3)] transform hover:scale-110 transition-all duration-700 animate-[float_6s_ease-in-out_infinite]"
          />
          
          {/* Reflection effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-b from-gray-400/20 to-transparent blur-xl"></div>
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Hero;