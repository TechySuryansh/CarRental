// import React, { useEffect, useState } from 'react'
// import { dummyMyBookingsData } from '../assets/assets'
// import { Title } from '../components/Title'

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([])

//   const fetchMyBookings = async () => {
//     setBookings(dummyMyBookingsData)
//   }

//   useEffect(() => {
//     fetchMyBookings()
//   }, [])

//   return (
//     <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
      
//       <Title 
//         title="My Bookings"
//         subtitle="Review and manage your car rental bookings with ease."
//         align="left" 
//       />

//       <div>
//         {bookings.map((booking) => (
//           <div 
//             key={booking._id} 
//             className='border border-gray-300 rounded-xl p-6 mb-6 shadow-md flex items-center gap-8 bg-white hover:shadow-lg transition-shadow duration-300'
//           >

//             {/* Car Image */}
//             <div>
//               <img 
//                 src={booking.car.image} 
//                 alt={booking.car.model} 
//                 className='w-40 h-28 object-cover rounded-lg'
//               />
//             </div>

//             {/* Car Details */}
//             <div>
//               <p className='text-xl font-semibold'>
//                 {booking.car.model} {booking.car.brand}
//               </p>
//               <p className='text-gray-600 mt-1'>
//                 {booking.car.year} • {booking.car.category} • {booking.car.location}
//               </p>
//             </div>

//             {/* Booking Details */}
//             <div className='md:col-span-2'>
//   <div className='flex flex-col gap-2'>
//     {/* Booking Number */}
//     <p className='px-3 py-1.5 bg-gray-100 rounded font-medium'>
//       Booking #{index + 1}
//     </p>

//     {/* Booking Status */}
//     <p className={`px-3 py-1 text-xs rounded-full font-semibold ${
//       booking.status === "confirmed" 
//         ? "bg-green-100 text-green-600" 
//         : "bg-red-100 text-red-600"
//     }`}>
//       {booking.status}
//     </p>
//   </div>
// </div>


//           </div>
//         ))}
//       </div>

//     </div>
//   )
// }

// export default MyBookings
import React, { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../assets/assets'
import { Title } from '../components/Title'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])

  const fetchMyBookings = async () => {
    setBookings(dummyMyBookingsData || [])
  }

  useEffect(() => {
    fetchMyBookings()
  }, [])

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
      
      <Title 
        title="My Bookings"
        subtitle="Review and manage your car rental bookings with ease."
        align="left" 
      />

      <div className='grid grid-cols-1 gap-6 mt-6'>
        {bookings.length === 0 && <p>No bookings found.</p>}
        {bookings.map((booking, index) => {
          const car = booking.car || {}
          const status = booking.status || 'pending'

          return (
            <div 
              key={booking._id || index} 
              className='border border-gray-300 rounded-lg p-4 shadow-sm flex items-center gap-6'
            >
              {/* Car Image */}
              <div>
                {car.image ? (
                  <img 
                    src={car.image} 
                    alt={car.model || 'Car'} 
                    className='w-40 h-28 object-cover rounded-md'
                  />
                ) : (
                  <div className='w-40 h-28 bg-gray-200 flex items-center justify-center rounded-md'>
                    No Image
                  </div>
                )}
              </div>

              {/* Car Details */}
              <div className='flex flex-col gap-2'>
                <p className='text-lg font-medium'>
                  {car.model || 'Unknown'} {car.brand || ''}
                </p>
                <p className='text-gray-600'>
                  {car.year || 'Year N/A'} • {car.category || 'Category N/A'}
                </p>

                {/* Booking Number & Status */}
                <div className='flex items-center gap-2 mt-2'>
                  <p className='px-3 py-1.5 bg-gray-100 rounded font-medium'>
                    Booking #{index + 1}
                  </p>
                  <p className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    status === "confirmed" 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {status}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default MyBookings

