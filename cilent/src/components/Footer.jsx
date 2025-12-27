import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="relative border-t mt-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>
      
      {/* TOP FOOTER */}
      <div className="relative z-10 max-w-full px-6 lg:px-16 xl:px-24 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-md group-hover:blur-lg transition-all"></div>
              <img src={assets.logo} alt="CarRental" className="h-8 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-7 font-medium">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>

          <div className="flex gap-5">
            <div className="group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all"></div>
                <img 
                  src={assets.facebook_logo} 
                  className="h-6 relative z-10 group-hover:scale-125 transition-transform duration-300" 
                  alt="Facebook"
                />
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all"></div>
                <img 
                  src={assets.instagram_logo} 
                  className="h-6 relative z-10 group-hover:scale-125 transition-transform duration-300" 
                  alt="Instagram"
                />
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all"></div>
                <img 
                  src={assets.twitter_logo} 
                  className="h-6 relative z-10 group-hover:scale-125 transition-transform duration-300" 
                  alt="Twitter"
                />
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all"></div>
                <img 
                  src={assets.gmail_logo} 
                  className="h-6 relative z-10 group-hover:scale-125 transition-transform duration-300" 
                  alt="Gmail"
                />
              </div>
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="space-y-5">
          <h4 className="font-bold text-lg text-gray-900 relative inline-block">
            Quick Links
            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
          </h4>
          <ul className="space-y-3 text-gray-600 text-sm font-medium">
            <li className="cursor-pointer hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
              <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
              Home
            </li>
            <li className="cursor-pointer hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
              <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
              Browse Cars
            </li>
            <li className="cursor-pointer hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
              <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
              List Your Car
            </li>
            <li className="cursor-pointer hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
              <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
              About Us
            </li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div className="space-y-5">
          <h4 className="font-bold text-lg text-gray-900 relative inline-block">
            Resources
            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
          </h4>
          <ul className="space-y-3 text-gray-600 text-sm font-medium">
            <li className="cursor-pointer hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
              <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
              Help Center
            </li>
            <li className="cursor-pointer hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
              <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
              Terms of Service
            </li>
            <li className="cursor-pointer hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
              <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
              Privacy Policy
            </li>
            <li className="cursor-pointer hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
              <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
              Insurance
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="space-y-5">
          <h4 className="font-bold text-lg text-gray-900 relative inline-block">
            Contact
            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
          </h4>
          <ul className="space-y-4 text-gray-600 text-sm font-medium">
            <li className="flex items-start gap-3 group hover:text-primary transition-colors">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>1234 Luxury Drive<br/>San Francisco, CA 94107</span>
            </li>
            <li className="flex items-center gap-3 cursor-pointer group hover:text-primary transition-colors">
              <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 234 567890</span>
            </li>
            <li className="flex items-center gap-3 cursor-pointer group hover:text-primary transition-colors">
              <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@example.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 border-t border-gray-200">
        <div className="max-w-full px-6 lg:px-16 xl:px-24 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-gray-600 font-medium">
            © 2025 <span className="font-bold text-gray-900">Brand</span>. All rights reserved.
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="cursor-pointer text-gray-600 hover:text-primary font-medium transition-colors relative group">
              Privacy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
            <span className="cursor-pointer text-gray-600 hover:text-primary font-medium transition-colors relative group">
              Terms
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
            <span className="cursor-pointer text-gray-600 hover:text-primary font-medium transition-colors relative group">
              Cookies
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;