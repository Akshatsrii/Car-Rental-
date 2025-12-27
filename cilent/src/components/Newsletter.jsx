import React from "react";

const Newsletter = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center max-md:px-4 my-20 mb-32 overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>

      {/* Content Container with Card Style */}
      <div className="relative z-10 bg-gradient-to-br from-white via-blue-50/30 to-white backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-12 md:p-16 max-w-4xl w-full mx-4">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
            <div className="relative z-10 bg-gradient-to-br from-primary to-primary-dull p-4 rounded-full">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="md:text-5xl text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent mb-4 leading-tight">
          Never Miss a Deal!
        </h1>

        {/* Subtitle */}
        <p className="md:text-xl text-base text-gray-600 font-medium pb-10 max-w-2xl mx-auto leading-relaxed">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts delivered straight to your inbox
        </p>

        {/* Form */}
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl w-full mx-auto">
          <div className="relative w-full sm:flex-1 group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <input
              className="relative z-10 w-full h-14 border-2 border-gray-300 hover:border-primary focus:border-primary rounded-full outline-none px-6 text-gray-700 font-medium placeholder-gray-400 shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300 bg-white"
              type="email"
              placeholder="Enter your email address"
              required
            />
            <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>

          <button
            type="submit"
            className="relative group w-full sm:w-auto px-10 h-14 text-white font-bold text-base bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary rounded-full cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Subscribe
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </form>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">No spam, ever</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Unsubscribe anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Exclusive deals</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Newsletter;