import React, { useState } from 'react';
import { dummyCarData } from '../assets/assets';
import CarCard from '../components/CarCards';
import Title from '../components/Title';

const Cars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter cars based on search query
  const filteredCars = dummyCarData.filter(car => 
    car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.fuel_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-br from-gray-100 via-blue-50/50 to-gray-100 py-20 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent leading-tight mb-4">
              Available Cars
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-medium">
              Browse our selection of premium vehicles available for your next adventure
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-full shadow-xl border-2 border-gray-200 hover:border-primary/50 focus-within:border-primary transition-all duration-300">
              
              {/* Search Icon */}
              <div className="pl-6">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search by make, model, or features"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-700 font-medium placeholder-gray-400"
              />

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="mr-3 p-3 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Filters"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>

            {/* Filter Dropdown (Optional) */}
            {showFilters && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 animate-[fadeIn_0.3s_ease-out]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                    <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-primary outline-none">
                      <option>All Categories</option>
                      <option>SUV</option>
                      <option>Sedan</option>
                      <option>Sports</option>
                      <option>Luxury</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Fuel Type</label>
                    <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-primary outline-none">
                      <option>All Types</option>
                      <option>Petrol</option>
                      <option>Diesel</option>
                      <option>Electric</option>
                      <option>Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Price Range</label>
                    <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-primary outline-none">
                      <option>Any Price</option>
                      <option>Under $100</option>
                      <option>$100 - $200</option>
                      <option>$200 - $300</option>
                      <option>$300+</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-primary to-primary-dull text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cars Grid Section */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        
        {/* Results Count */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Showing {filteredCars.length} {filteredCars.length === 1 ? 'Car' : 'Cars'}
          </h2>
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredCars.map((car, index) => (
              <div
                key={car._id}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-6">
              <svg className="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dull text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Cars;