import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className='relative flex flex-col md:flex-row md:items-center items-center justify-between px-8 md:px-12 lg:px-16 py-12 md:py-8 bg-gradient-to-br from-[#0558FE] via-[#2D73FF] to-[#A9CFFF] max-w-7xl mx-4 md:mx-auto rounded-3xl overflow-hidden shadow-2xl my-20'>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl"></div>
      
      {/* Decorative Dots Pattern */}
      <div className="absolute top-10 left-10 opacity-20">
        <div className="grid grid-cols-8 gap-2">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
          ))}
        </div>
      </div>

      <div className='relative z-10 text-white max-w-xl md:pr-8'>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/30">
          <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-bold">Earn Extra Income</span>
        </div>

        <h2 className='text-4xl md:text-5xl font-black leading-tight mb-4'>
          Do You Own a <br className="hidden md:block"/>Luxury Car?
        </h2>

        <p className='text-lg md:text-xl font-medium mb-4 text-white/95'>
          Monetize your vehicle effortlessly by listing it on our platform.
        </p>

        <p className='text-base text-white/90 leading-relaxed mb-6 max-w-lg'>
          We take care of insurance, driver verification and secure payments – so you can earn passive income, stress-free.
        </p>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          {[
            'Comprehensive insurance coverage',
            'Verified driver screening',
            'Secure & timely payments'
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/95 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        <button className='group relative px-8 py-4 bg-white hover:bg-gray-50 text-primary font-bold rounded-full text-base shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:scale-105 active:scale-95'>
          <span className='relative z-10 flex items-center gap-2'>
            List your car
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Car Image with Animation */}
      <div className='relative z-10 mt-10 md:mt-0 flex-shrink-0'>
        <div className="relative">
          {/* Glow effect behind car */}
          <div className="absolute inset-0 bg-white/20 blur-2xl scale-110 rounded-full"></div>
          
          <img
            src={assets.banner_car_image}
            alt='car'
            className='relative z-10 max-h-52 md:max-h-64 lg:max-h-72 drop-shadow-2xl transform hover:scale-110 transition-all duration-700 animate-[float_6s_ease-in-out_infinite]'
          />
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
      
    </div>
  )
}

export default Banner