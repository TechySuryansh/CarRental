// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { assets, dummyCarData } from '../assets/assets';
// import Loader from '../components/Loader';

// const CarDetails = () => {
//   const {id}= useParams();
//   const navigate=useNavigate();
//   const [car,setCar]=useState(null);
//   const currency = import.meta.env.VITE_CURRENCY || 'USD';
//   const handleSubmit=async(e)=>{
//     e.preventDefault();
//     alert("Booking functionality coming soon!");
//   }

//   useEffect(()=>{
//     setCar(dummyCarData.find((c)=> String(c._id) === String(id)));
//   },[id]);

//   return car ?(
//     <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      
//       {/* Back button */}
//       <button onClick={()=>navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
//         <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65'/>
//         Back to all Cars
//       </button>

//       <div className='lg:flex lg:items-start lg:gap-10'>

//         {/* Car Image & left details */}
//         <div className='lg:w-2/3 space-y-6'>
//           <img src={car.image} alt="" className='w-full h-96 object-cover rounded-2xl shadow-lg'/>

//           <div>
//             <h1 className='text-3xl font-semibold'>{car.brand} {car.model}</h1>
//             <p className='text-gray-600'>{car.category} • {car.year}</p>
//           </div>

//           <hr className='border-gray-300 my-6' />

//           <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
//             {[
//               {icon:assets.users_icon, text:`${car.seating_capacity} Seats`},
//               {icon:assets.fuel_icon, text:car.fuel_type},
//               {icon:assets.car_icon, text:car.transmission},
//               {icon:assets.location_icon, text:car.location}
//             ].map((item,index)=>(
//               <div key={index} className='flex flex-col items-center bg-gray-100 p-4 rounded-lg'>
//                 <img src={item.icon} alt="" className='h-8 w-8 mb-2 opacity-75'/>
//                 <p className='text-sm text-gray-700 font-medium'>{item.text}</p>
//               </div>
//             ))}
//           </div>

//           <div>
//             <h1 className='text-xl font-medium mb-3'>Description</h1>
//             <p className='text-gray-600 mt-2 leading-relaxed'>{car.description}</p>
//           </div>

//           <div>
//             <h1 className='text-xl font-medium mb-3'>Features</h1>

//             <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
//               {[
//                 'Air Conditioning',
//                 'GPS Navigation',
//                 'Bluetooth Connectivity',
//                 'Backup Camera',
//                 'Cruise Control',
//                 'Heated Seats',
//                 'Sunroof/Moonroof',
//                 'Keyless Entry',
//                 'Alloy Wheels',
//                 'Premium Sound System'
//               ].map((feature)=>(
//                 <li key={feature} className='flex items-center gap-2'>
//                   <img src={assets.check_icon} alt="" className='h-4 w-4 opacity-70'/>
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Booking Form Placeholder */}
//         <form onSubmit={handleSubmit} className='sticky top-20 bg-white border border-gray-100 shadow-2xl h-max rounded-xl p-8 space-y-7 text-gray-700 max-w-sm mx-auto'>

//   <p className='flex items-baseline justify-between text-5xl font-extrabold text-gray-900 pb-2'>
//     ${car.priceperDay}
//     <span className='text-base font-semibold text-gray-500'>per day</span>
//   </p>
//       <hr className='border-gray-200 my-4'/>
      
//       <div className='flex flex-col gap-3'>
//         <label htmlFor="pickup-date" className='text-sm font-semibold text-gray-800 tracking-wider'>
//             🗓️ Pickup Date
//         </label>
//         <input 
//             type="date" 
//             className='w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out cursor-pointer text-gray-700 text-lg' 
//             required 
//             id='pickup-date' 
//             min={new Date().toISOString().split('T')[0]}
//         />
//       </div>

//        <div className='flex flex-col gap-3'>
//         <label htmlFor="return-date" className='text-sm font-semibold text-gray-800 tracking-wider'>
//             ↩️ Return Date
//         </label>
//         <input 
//             type="date" 
//             className='w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out cursor-pointer text-gray-700 text-lg' 
//             required 
//             id='return-date' 
//             min={new Date().toISOString().split('T')[0]}
//         />
//       </div>
      
//       <button 
//         type="submit"
//         className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg shadow-lg shadow-blue-500/50 transition duration-300 ease-in-out transform hover:scale-[1.01]'
//       >
//         🚗 Book Now
//       </button>

//       <p className='text-center text-sm text-gray-500 pt-1'>
//         <span className='font-medium text-green-600'>✅</span> No credit card required to reserve
//       </p>

// </form>

//       </div>

//     </div>
//   ):<Loader/>
// }

// export default CarDetails
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { assets, dummyCarData } from '../assets/assets';
import Loader from '../components/Loader';

const CarDetails = () => {
  const {id}= useParams();
  const navigate=useNavigate();
  const [car,setCar]=useState(null);
  const currency = import.meta.env.VITE_CURRENCY || 'USD';
  
  // State for date inputs
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  
  // Function to get today's date in 'YYYY-MM-DD' format
  const getMinDate = () => new Date().toISOString().split('T')[0];

  const handleSubmit=async(e)=>{
    e.preventDefault();
    // In a real app, you would calculate total price and handle booking here
    console.log("Booking details:", { carId: id, pickupDate, returnDate });
    alert("Booking functionality coming soon!");
  }

  useEffect(()=>{
    setCar(dummyCarData.find((c)=> String(c._id) === String(id)));
  },[id]);

  return car ?(
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      
      {/* Back button */}
      <button onClick={()=>navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer transition hover:text-blue-600'>
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65 h-4 w-4'/>
        <span className='font-medium'>Back to all Cars</span>
      </button>

      <div className='lg:flex lg:items-start lg:gap-10'>

        {/* Car Image & left details */}
        <div className='lg:w-2/3 space-y-6'>
          <img src={car.image} alt="" className='w-full h-[450px] object-cover rounded-2xl shadow-xl border border-gray-100'/>

          <div className='pt-2'>
            <h1 className='text-4xl font-bold text-gray-900'>{car.brand} {car.model}</h1>
            <p className='text-lg text-gray-600 font-medium mt-1'>{car.category} • {car.year}</p>
          </div>

          <hr className='border-gray-200 my-6' />

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {[
              {icon:assets.users_icon, text:`${car.seating_capacity} Seats`},
              {icon:assets.fuel_icon, text:car.fuel_type},
              {icon:assets.car_icon, text:car.transmission},
              {icon:assets.location_icon, text:car.location}
            ].map((item,index)=>(
              <div key={index} className='flex flex-col items-center bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200'>
                <img src={item.icon} alt="" className='h-7 w-7 mb-2 text-blue-500'/>
                <p className='text-sm text-gray-700 font-medium'>{item.text}</p>
              </div>
            ))}
          </div>

          <div className='pt-4'>
            <h1 className='text-2xl font-semibold mb-3 text-gray-800'>Description</h1>
            <p className='text-gray-600 mt-2 leading-relaxed text-base'>{car.description}</p>
          </div>

          <div className='pt-4'>
            <h1 className='text-2xl font-semibold mb-4 text-gray-800'>Features</h1>

            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3'>
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
                <li key={feature} className='flex items-center gap-2 text-gray-700'>
                  <img src={assets.check_icon} alt="" className='h-4 w-4 text-green-500'/>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking Form - Wonderful CSS Applied */}
        <form onSubmit={handleSubmit} className='lg:w-1/3 mt-10 lg:mt-0 sticky top-20 bg-white border border-gray-100 shadow-2xl h-max rounded-xl p-8 space-y-7 text-gray-700 w-full'>

          <p className='flex items-baseline justify-between text-5xl font-extrabold text-gray-900 pb-2'>
            {/* CORRECTED PRICE DISPLAY */}
            <span className='text-blue-600'>
                {/* Shows currency symbol followed by price */}
                $ {car.priceperDay} 
            </span>
            <span className='text-base font-semibold text-gray-500'>per day</span>
          </p>
              <hr className='border-gray-200 my-4'/>
              
              <div className='flex flex-col gap-3'>
                <label htmlFor="pickup-date" className='text-sm font-semibold text-gray-800 tracking-wider'>
                    🗓️ Pickup Date
                </label>
                <input 
                    type="date" 
                    className='w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out cursor-pointer text-gray-700 text-lg' 
                    required 
                    id='pickup-date' 
                    min={getMinDate()}
                    onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>

              <div className='flex flex-col gap-3'>
                <label htmlFor="return-date" className='text-sm font-semibold text-gray-800 tracking-wider'>
                    ↩️ Return Date
                </label>
                <input 
                    type="date" 
                    className='w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out cursor-pointer text-gray-700 text-lg' 
                    required 
                    id='return-date' 
                    // Ensures return date cannot be before pickup date
                    min={pickupDate || getMinDate()}
                    onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
              
              <button 
                type="submit"
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-xl shadow-lg shadow-blue-500/50 transition duration-300 ease-in-out transform hover:scale-[1.01]'
              >
                🚗 Book Now
              </button>

              <p className='text-center text-sm text-gray-500 pt-1'>
                <span className='font-medium text-green-600'>✅</span> No credit card required to reserve
              </p>

        </form>

      </div>

    </div>
  ):<Loader/>
}

export default CarDetails
