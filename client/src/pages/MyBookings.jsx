import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Title } from '../components/Title'
import Loader from '../components/Loader'
import { bookingAPI } from '../services/api'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }
    fetchMyBookings()
  }, [user])

  const fetchMyBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings()
      if (response.data.success) {
        setBookings(response.data.bookings)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
      
      <Title 
        title="My Bookings"
        subtitle="Review and manage your car rental bookings with ease."
        align="left" 
      />

      <div className='grid grid-cols-1 gap-6 mt-6'>
        {bookings.length === 0 && (
          <div className='text-center py-12 bg-white rounded-xl border border-gray-100'>
            <p className='text-gray-500'>No bookings found.</p>
            <button 
              onClick={() => navigate('/cars')}
              className='mt-4 text-blue-600 hover:underline'
            >
              Browse available cars
            </button>
          </div>
        )}
        
        {bookings.map((booking, index) => {
          const car = booking.car || {}
          const status = booking.status || 'pending'

          return (
            <div 
              key={booking._id || index} 
              className='border border-gray-300 rounded-lg p-4 shadow-sm flex items-center gap-6 bg-white hover:shadow-md transition-shadow'
            >
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

              <div className='flex flex-col gap-2 flex-grow'>
                <p className='text-lg font-medium'>
                  {car.brand || 'Unknown'} {car.model || car.name || ''}
                </p>
                <p className='text-gray-600'>
                  {car.year || 'Year N/A'} • {car.category || 'Category N/A'}
                </p>

                <div className='flex items-center gap-2 mt-2'>
                  <p className='px-3 py-1.5 bg-gray-100 rounded font-medium'>
                    Booking #{index + 1}
                  </p>
                  <p className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    status === "completed" 
                      ? "bg-green-100 text-green-600" 
                      : status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}>
                    {status}
                  </p>
                </div>

                <div className='flex items-start gap-2 mt-3'>
                  <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                  <div>
                    <p className='text-gray-500'>Rental Period</p>
                    <p>
                      {new Date(booking.pickupDate).toLocaleDateString()} 
                      &nbsp;to&nbsp; 
                      {new Date(booking.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-2 mt-3'>
                  <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                  <div>
                    <p className='text-gray-500'>Pickup Location</p>
                    <p>{car.location || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className='ml-auto text-right'>
                <p className='text-gray-500'>Total Price</p>
                <p className='text-xl font-semibold'>
                  ${booking.price || booking.totalAmount || 'N/A'}
                </p>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default MyBookings;
