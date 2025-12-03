import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Title } from '../components/Title'
import Loader from '../components/Loader'
import { bookingAPI } from '../services/api'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingBooking, setEditingBooking] = useState(null)
  const [newPickupDate, setNewPickupDate] = useState('')
  const [newReturnDate, setNewReturnDate] = useState('')
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

  const handleEditClick = (booking) => {
    setEditingBooking(booking)
    // Format dates for input type="date" (YYYY-MM-DD)
    setNewPickupDate(new Date(booking.pickupDate).toISOString().split('T')[0])
    setNewReturnDate(new Date(booking.returnDate).toISOString().split('T')[0])
  }

  const handleUpdateBooking = async () => {
    if (!newPickupDate || !newReturnDate) {
      toast.error('Please select both dates')
      return
    }

    try {
      const response = await bookingAPI.updateBooking({
        bookingId: editingBooking._id,
        pickupDate: newPickupDate,
        returnDate: newReturnDate
      })

      if (response.data.success) {
        toast.success('Booking updated successfully')
        setEditingBooking(null)
        fetchMyBookings()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Error updating booking:', error)
      toast.error('Failed to update booking')
    }
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await bookingAPI.deleteBooking(bookingId)
      if (response.data.success) {
        toast.success('Booking cancelled successfully')
        fetchMyBookings()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Error cancelling booking:', error)
      toast.error('Failed to cancel booking')
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
                  <p className={`px-3 py-1 text-xs rounded-full font-semibold ${status === "completed"
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
                  <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1' />
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
                  <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-1' />
                  <div>
                    <p className='text-gray-500'>Pickup Location</p>
                    <p>{car.location || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className='ml-auto text-right flex flex-col items-end gap-2'>
                <div>
                  <p className='text-gray-500'>Total Price</p>
                  <p className='text-xl font-semibold'>
                    ${booking.price || booking.totalAmount || 'N/A'}
                  </p>
                </div>

                {(status === 'pending' || status === 'confirmed') && (
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleEditClick(booking)}
                      className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm'
                    >
                      Edit Dates
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
                          handleCancelBooking(booking._id)
                        }
                      }}
                      className='px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm'
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit Booking Modal */}
      {editingBooking && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>Update Booking Dates</h2>

            <div className='flex flex-col gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Pickup Date</label>
                <input
                  type="date"
                  value={newPickupDate}
                  onChange={(e) => setNewPickupDate(e.target.value)}
                  className='w-full border border-gray-300 rounded px-3 py-2'
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Return Date</label>
                <input
                  type="date"
                  value={newReturnDate}
                  onChange={(e) => setNewReturnDate(e.target.value)}
                  className='w-full border border-gray-300 rounded px-3 py-2'
                  min={newPickupDate || new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className='flex justify-end gap-3 mt-4'>
                <button
                  onClick={() => setEditingBooking(null)}
                  className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded'
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateBooking}
                  className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                >
                  Update Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default MyBookings;
