import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { assets, dummyCarData } from '../assets/assets';
import Loader from '../components/Loader';

const CarDetails = () => {
  const {id}= useParams();
  const navigate=useNavigate();
  const [car,setCar]=useState(null);

  useEffect(()=>{
    setCar(dummyCarData.find((c)=> String(c._id) === String(id)));
  },[id]);

  return car ?(
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      
      {/* Back button */}
      <button onClick={()=>navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65'/>
        Back to all Cars
      </button>

      <div className='lg:flex lg:items-start lg:gap-10'>

        {/* Car Image & left details */}
        <div className='lg:w-2/3 space-y-6'>
          <img src={car.image} alt="" className='w-full h-96 object-cover rounded-2xl shadow-lg'/>

          <div>
            <h1 className='text-3xl font-semibold'>{car.brand} {car.model}</h1>
            <p className='text-gray-600'>{car.category} • {car.year}</p>
          </div>

          <hr className='border-gray-300 my-6' />

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {[
              {icon:assets.users_icon, text:`${car.seating_capacity} Seats`},
              {icon:assets.fuel_icon, text:car.fuel_type},
              {icon:assets.car_icon, text:car.transmission},
              {icon:assets.location_icon, text:car.location}
            ].map((item,index)=>(
              <div key={index} className='flex flex-col items-center bg-gray-100 p-4 rounded-lg'>
                <img src={item.icon} alt="" className='h-8 w-8 mb-2 opacity-75'/>
                <p className='text-sm text-gray-700 font-medium'>{item.text}</p>
              </div>
            ))}
          </div>

          <div>
            <h1 className='text-xl font-medium mb-3'>Description</h1>
            <p className='text-gray-600 mt-2 leading-relaxed'>{car.description}</p>
          </div>

          <div>
            <h1 className='text-xl font-medium mb-3'>Features</h1>

            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              {[
                'Air Conditioning',
                'GPS Navigation',
                'Bluetooth Connectivity',
                'Backup Camera',
                'Cruise Control',
                'Heated Seats',
                'Sunroof/Moonroof',
                'Keyless Entry',
                'Alloy Wheels',
                'Premium Sound System'
              ].map((feature)=>(
                <li key={feature} className='flex items-center gap-2'>
                  <img src={assets.check_icon} alt="" className='h-4 w-4 opacity-70'/>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking Form Placeholder */}
        <div className='lg:w-1/3 mt-10 lg:mt-0'>
          <form className='bg-gray-50 border border-gray-200 p-6 rounded-xl shadow'>
            <h1 className='text-xl font-semibold mb-4'>Book This Car</h1>
            <p className='text-gray-600 text-sm mb-4'>Booking functionality coming soon...</p>
            
            <button disabled className='w-full bg-gray-300 text-gray-600 py-3 rounded-lg cursor-not-allowed'>
              Booking Disabled
            </button>
          </form>
        </div>

      </div>

    </div>
  ):<Loader/>
}

export default CarDetails
