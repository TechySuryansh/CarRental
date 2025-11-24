import React from 'react'
import { assets } from '../assets/assets'

export const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row items-center md:items-start justify-between px-10 md:px-16 py-12 bg-gradient-to-r from-[#0541E5] to-[#6EB3FF] max-w-6xl mx-auto rounded-3xl shadow-xl overflow-hidden'>

        {/* LEFT CONTENT */}
        <div className='text-white max-w-lg'>
            <h2 className='text-4xl font-bold leading-tight drop-shadow-sm'>
              Do you own a luxury car?
            </h2>

            <p className='mt-4 text-lg text-white/95 leading-relaxed'>
              Monetize your vehicle effortlessly by listing it on CarRental.
            </p>

            <p className='mt-2 text-white/80 leading-relaxed text-[15px]'>
              We handle insurance, driver verification, customer support, and secure payments — so you earn passive income stress-free.
            </p>

            <button className='mt-6 bg-white text-[#0541E5] font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-xl active:scale-95'>
                List Your Car
            </button>
        </div>

        {/* RIGHT IMAGE */}
        <img 
          src={assets.banner_car_image} 
          alt="car" 
          className='w-[340px] md:w-[420px] mt-10 md:mt-0 drop-shadow-2xl'
        />
    </div>
  )
}
