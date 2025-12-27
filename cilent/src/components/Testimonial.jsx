import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";

const testimonials = [
  {
    id: 1,
    name: "Riya Bansal",
    location: "Bharatpur, India",
    image: assets.testimonial_image_1,
    rating: 5,
    review:
      "I've rented cars from various platforms, but CarRental truly stands out. The service was smooth and reliable.",
  },
  {
    id: 2,
    name: "Akshat Srivastava",
    location: "Kota, India",
    image: assets.testimonial_image_2,
    rating: 5,
    review:
      "CarRental made my journey stress-free. Booking was easy, the car was clean, and customer support was excellent.",
  },
  {
    id: 3,
    name: "Aashi Srivastava",
    location: "Lucknow, India",
    image: assets.testimonial_image_1,
    rating: 5,
    review:
      "Amazing experience! Great car options, transparent pricing, and very professional service. Highly recommended.",
  },
];

const Testimonial = () => {
  return (
    <div className="relative py-28 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>

      {/* TITLE */}
      <div className="relative z-10">
        <Title
          title="What Our Customers Say"
          subTitle="Discover why discerning travelers choose us for their luxury car rental needs around the world."
        />
      </div>

      {/* TESTIMONIAL CARDS */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 mb-10 max-w-7xl mx-auto">

        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 flex flex-col"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
            }}
          >

            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
              <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* USER INFO */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover relative z-10 ring-4 ring-white group-hover:ring-primary/20 transition-all duration-300"
                />
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {testimonial.name}
                </p>
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {testimonial.location}
                </div>
              </div>
            </div>

            {/* STAR RATING */}
            <div className="flex gap-1 mb-5">
              {Array(testimonial.rating)
                .fill("")
                .map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                    style={{ transitionDelay: `${index * 50}ms` }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
            </div>

            {/* REVIEW */}
            <p className="text-base text-gray-700 leading-relaxed font-medium flex-grow">
              "{testimonial.review}"
            </p>

            {/* Decorative Bottom Line */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-semibold">Verified Customer</span>
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonial;