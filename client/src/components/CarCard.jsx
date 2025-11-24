import React, { use } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const CarCard = ({car}) => {
  const currency = import.meta.env.VITE_CURRENCY || 'USD';
  const navigate=useNavigate()

  return (
    <div onClick={()=>{navigate(`/car-details/${car._id}`); scrollTo(0,0);}}
    className='group rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer'>
       
       {/* Image Section */}
       <div className='relative h-52 overflow-hidden'>
        <img 
          src={car.image} 
          alt={car.model} 
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
        />

        {car.isAvailable && (
          <p className='absolute top-3 left-3 bg-green-600 text-white text-[10px] px-3 py-1 font-medium rounded-full shadow-md'>
            Available Now
          </p>
        )}

        <div className='absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg shadow-lg'>
          <span className='font-bold tracking-wide text-sm'>{currency}{car.pricePerDay}</span>
          <span className='text-xs opacity-75'> /day</span>
        </div>
       </div>


       {/* Content */}
       <div className='p-5'>
          <div className='mb-2'>
            <h3 className='text-xl font-semibold text-gray-900 leading-tight'>
              {car.brand} {car.model}
            </h3>
            <p className='text-sm text-gray-500'>
              {car.category} • {car.year}
            </p>
          </div>

        {/* Features Row */}
        <div className='mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-700'>
          
          <div className='flex items-center'>
            <img src={assets.users_icon} alt="" className='h-4 w-4 mr-2 opacity-70'/>
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className='flex items-center'>
            <img src={assets.fuel_icon} alt="" className='h-4 w-4 mr-2 opacity-70'/>
            <span>{car.fuel_type}</span>
          </div>

          <div className='flex items-center'>
            <img src={assets.car_icon} alt="" className='h-4 w-4 mr-2 opacity-70'/>
            <span>{car.transmission}</span>
          </div>

          <div className='flex items-center'>
            <img src={assets.location_icon} alt="" className='h-4 w-4 mr-2 opacity-70'/>
            <span>{car.location}</span>
          </div>

        </div>
       </div>

    </div>
  )
}

export default CarCard
