import React from 'react'

const Title = ({ title, subTitle, align }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center mb-12 ${
        align === "left" && "md:items-start md:text-left"
      }`}
    >
      {/* Decorative Element Above Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary to-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="w-12 h-1 bg-gradient-to-l from-transparent via-primary to-primary rounded-full"></div>
      </div>

      {/* Main Title */}
      <h1 className='font-black text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent leading-tight tracking-tight'>
        {title}
      </h1>

      {/* Subtitle */}
      <p className='text-base md:text-lg lg:text-xl text-gray-600 font-medium mt-4 max-w-3xl leading-relaxed'>
        {subTitle}
      </p>

      {/* Decorative Underline */}
      <div className="relative mt-6 w-24 h-1 bg-gradient-to-r from-primary via-primary-dull to-primary rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_2s_infinite]"></div>
      </div>

      {/* Shimmer Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}

export default Title