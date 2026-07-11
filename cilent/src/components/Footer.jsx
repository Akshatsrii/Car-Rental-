import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="relative border-t mt-12 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-400/5 rounded-full blur-3xl"></div>
      
      {/* TOP FOOTER - COMPACT */}
      <div className="relative z-10 max-w-full px-6 lg:px-16 xl:px-24 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-md group-hover:blur-lg transition-all"></div>
              {/* SVG Logo Silhouette */}
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center relative z-10">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3C13 6.8 11.5 6 10 6H4c-1.1 0-2 .9-2 2v8c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
            </div>
            <span className="text-base font-black text-gray-900 tracking-tight relative z-10">
              Car<span className="text-primary font-extrabold">Dekho</span>
            </span>
          </div>

          <p className="text-gray-500 text-xs leading-5 font-medium">
            Premium, real-time Cab & Ride booking service. Instant driver matching, safety OTP verifications, and live GPS map tracking.
          </p>

          <div className="flex gap-4">
            {/* Social Icons */}
            {[
              { img: assets.facebook_logo, bg: "bg-blue-500/10 hover:bg-blue-500/20" },
              { img: assets.instagram_logo, bg: "bg-pink-500/10 hover:bg-pink-500/20" },
              { img: assets.twitter_logo, bg: "bg-blue-400/10 hover:bg-blue-400/20" },
              { img: assets.gmail_logo, bg: "bg-red-500/10 hover:bg-red-500/20" }
            ].map((social, index) => (
              <div key={index} className={`p-2 rounded-full cursor-pointer transition-all duration-250 hover:scale-110 ${social.bg}`}>
                <img src={social.img} className="h-4 w-4" alt="Social" />
              </div>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="space-y-3">
          <h4 className="font-black text-sm text-gray-900 uppercase tracking-wider relative inline-block">
            Quick Links
            <div className="absolute -bottom-1 left-0 w-8 h-[3px] bg-primary rounded-full"></div>
          </h4>
          <ul className="space-y-2 text-gray-600 text-xs font-semibold">
            <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors"></span>
              Home
            </li>
            <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors"></span>
              Book Ride
            </li>
            <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors"></span>
              Become a Driver
            </li>
            <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors"></span>
              About Us
            </li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div className="space-y-3">
          <h4 className="font-black text-sm text-gray-900 uppercase tracking-wider relative inline-block">
            Resources
            <div className="absolute -bottom-1 left-0 w-8 h-[3px] bg-primary rounded-full"></div>
          </h4>
          <ul className="space-y-2 text-gray-600 text-xs font-semibold">
            <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors"></span>
              Help Center
            </li>
            <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors"></span>
              Terms of Service
            </li>
            <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors"></span>
              Privacy Policy
            </li>
            <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors"></span>
              Safety SOS
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="space-y-3">
          <h4 className="font-black text-sm text-gray-900 uppercase tracking-wider relative inline-block">
            Contact Us
            <div className="absolute -bottom-1 left-0 w-8 h-[3px] bg-primary rounded-full"></div>
          </h4>
          <ul className="space-y-2.5 text-gray-600 text-xs font-semibold">
            <li className="flex items-start gap-2 hover:text-primary transition-colors">
              <svg className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Kota, Rajasthan, India</span>
            </li>
            <li className="flex items-center gap-2 hover:text-primary transition-colors">
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 70140 12345</span>
            </li>
            <li className="flex items-center gap-2 hover:text-primary transition-colors">
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@carrentalcab.in</span>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 border-t border-gray-200 bg-gray-50/50">
        <div className="max-w-full px-6 lg:px-16 xl:px-24 py-4 flex flex-col sm:flex-row items-center justify-between text-xs">
          <p className="text-gray-500 font-medium">
            © {new Date().getFullYear()} <span className="font-bold text-gray-900">CarDekho</span>. Kota, Rajasthan.
          </p>

          <div className="flex gap-4 mt-2 sm:mt-0 font-semibold text-gray-500">
            <span className="cursor-pointer hover:text-primary transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-primary transition-colors">Terms</span>
            <span className="cursor-pointer hover:text-primary transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;