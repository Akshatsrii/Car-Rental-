import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/cars");
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center gap-12 md:gap-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4 py-12 overflow-hidden">

      {/* Soft white glow wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-white/80 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gray-400/10 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gray-300/10 rounded-full blur-3xl"></div>

      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)",
        }}
      ></div>

      {/* Fine grain texture for tactile feel */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      ></div>

      {/* Soft scattered sparkle dots */}
      <div className="absolute top-16 right-24 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_4px_rgba(255,255,255,0.9)]"></div>
      <div className="absolute top-40 left-1/3 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_3px_rgba(255,255,255,0.8)]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_4px_rgba(255,255,255,0.9)]"></div>

      {/* Heading Section */}
      <div className="relative z-10 text-center space-y-5">
        <span className="inline-block text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-primary/80 mb-1">
          Ride in Style
        </span>
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-sm">
          Premium Cabs & Drivers
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
          Experience comfort and safety with our verified driver partners
        </p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:py-7 md:px-10 rounded-3xl md:rounded-full w-full max-w-80 md:max-w-[1200px] bg-white/70 backdrop-blur-2xl shadow-[0px_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-white/60 hover:shadow-[0px_30px_80px_rgba(0,0,0,0.18)] border border-gray-100/80 transition-all duration-500 hover:scale-[1.015]"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 w-full">

          {/* PICKUP LOCATION */}
          <div className="flex flex-col items-start gap-3 w-full md:flex-1 group">
            <div className="flex items-center gap-2 text-gray-400 group-focus-within:text-primary group-hover:text-primary transition-colors duration-300">
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
              className="outline-none bg-transparent text-base font-semibold cursor-pointer w-full text-gray-800 hover:text-primary focus:text-primary transition-colors duration-300"
            >
              <option value="">Select your city</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="h-0.5 w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 group-hover:via-primary group-focus-within:via-primary transition-all duration-300"></div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

          {/* PICKUP DATE */}
          <div className="flex flex-col items-start gap-3 w-full md:flex-1 group">
            <div className="flex items-center gap-2 text-gray-400 group-focus-within:text-primary group-hover:text-primary transition-colors duration-300">
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
              className="text-base text-gray-800 font-semibold bg-transparent outline-none cursor-pointer w-full hover:text-primary focus:text-primary transition-colors duration-300"
              required
            />
            <div className="h-0.5 w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 group-hover:via-primary group-focus-within:via-primary transition-all duration-300"></div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

          {/* RETURN DATE */}
          <div className="flex flex-col items-start gap-3 w-full md:flex-1 group">
            <div className="flex items-center gap-2 text-gray-400 group-focus-within:text-primary group-hover:text-primary transition-colors duration-300">
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
              className="text-base text-gray-800 font-semibold bg-transparent outline-none cursor-pointer w-full hover:text-primary focus:text-primary transition-colors duration-300"
              required
            />
            <div className="h-0.5 w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 group-hover:via-primary group-focus-within:via-primary transition-all duration-300"></div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

          {/* SEARCH BUTTON */}
          <button
            type="submit"
            className="relative flex items-center justify-center gap-3 px-10 py-4 mt-6 md:mt-0 bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary text-white font-bold rounded-full cursor-pointer shadow-[0px_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0px_18px_45px_rgba(0,0,0,0.3)] w-full md:w-auto transform hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden group md:flex-shrink-0 ring-1 ring-white/20"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <img
              src={assets.search_icon}
              alt="search"
              className="brightness-300 w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300"
            />
            <span className="relative z-10 text-base tracking-wide">Search</span>
          </button>

        </div>
      </form>

      {/* Car Image with Animation */}
      <div className="relative z-10 w-full flex justify-center">
        <div className="relative">
          {/* Glow effect behind car */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-primary/5 to-transparent blur-2xl scale-110"></div>

          <img
            src={assets.main_car}
            alt="car"
            className="max-h-74 relative z-10 grayscale brightness-105 contrast-110 drop-shadow-[0px_20px_50px_rgba(0,0,0,0.25)] hover:drop-shadow-[0px_35px_70px_rgba(0,0,0,0.35)] transform hover:scale-110 transition-all duration-700 animate-[float_6s_ease-in-out_infinite]"
          />

          {/* Reflection effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-b from-gray-400/25 to-transparent blur-xl rounded-full"></div>
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;