import React from 'react'
import Title from './Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from './CarCards'
import { useNavigate } from 'react-router-dom'

const FeaturedSection = () => {

  const navigate = useNavigate()

  return (
    <div className='relative flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden'>

      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>

      <div className='relative z-10'>
        <Title
          title='Featured Vehicles'
          subTitle='Explore our selection of premium vehicles available for your next adventure.'
        />
      </div>

      <div className='relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full max-w-7xl'>
        {dummyCarData.map((car, index) => (
          <div 
            key={car._id}
            className='transform hover:scale-105 transition-all duration-500'
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            <CarCard car={car} />
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/cars')
          scrollTo(0, 0)
        }}
        className='relative z-10 group flex items-center justify-center gap-3 px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full mt-16 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden'
      >
        <span className='relative z-10'>Explore all cars</span>
        <img 
          src={assets.arrow_icon} 
          alt='arrow' 
          className='relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-primary to-primary-dull opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </button>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  )
}

export default FeaturedSection