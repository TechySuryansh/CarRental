import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Loader from '../components/Loader';
import { carAPI, bookingAPI } from '../services/api';
import { useSelector } from 'react-redux';

const CarDetails = () => {
  const {id}= useParams();
  const navigate=useNavigate();
  const [car,setCar]=useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const currency = import.meta.env.VITE_CURRENCY || 'USD';
  const { user } = useSelector((state) => state.auth);
  
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  
  const getMinDate = () => new Date().toISOString().split('T')[0];

  useEffect(()=>{
    fetchCarDetails();
  },[id]);

  const fetchCarDetails = async () => {
    try {
      const response = await carAPI.getAllCars();
      if (response.data.success) {
        const foundCar = response.data.cars.find((c) => String(c._id) === String(id));
        setCar(foundCar);
      }
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to book a car');
      return;
    }

    if (!pickupDate || !returnDate) {
      alert('Please select pickup and return dates');
      return;
    }

    setBookingLoading(true);
    try {
      const response = await bookingAPI.createBooking({
        carId: id,
        pickupDate,
        returnDate
      });

      if (response.data.success) {
        alert('Booking created successfully!');
        navigate('/my-bookings');
      } else {
        alert(response.data.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!car) {
    return (
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16 text-center'>
        <p className='text-gray-500'>Car not found</p>
        <button onClick={() => navigate('/cars')} className='mt-4 text-blue-600 hover:underline'>
          Back to all cars
        </button>
      </div>
    );
  }

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      
      <button onClick={()=>navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer transition hover:text-blue-600'>
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65 h-4 w-4'/>
        <span className='font-medium'>Back to all Cars</span>
      </button>

      <div className='lg:flex lg:items-start lg:gap-10'>

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

        <form onSubmit={handleSubmit} className='lg:w-1/3 mt-10 lg:mt-0 sticky top-20 bg-white border border-gray-100 shadow-2xl h-max rounded-xl p-8 space-y-7 text-gray-700 w-full'>

          <p className='flex items-baseline justify-between text-5xl font-extrabold text-gray-900 pb-2'>
            <span className='text-blue-600'>
                {currency} {car.pricePerDay} 
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
                value={pickupDate}
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
                min={pickupDate || getMinDate()}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
          
          <button 
            type="submit"
            disabled={bookingLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-xl shadow-lg shadow-blue-500/50 transition duration-300 ease-in-out transform hover:scale-[1.01] ${bookingLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {bookingLoading ? 'Booking...' : '🚗 Book Now'}
          </button>

          <p className='text-center text-sm text-gray-500 pt-1'>
            <span className='font-medium text-green-600'>✅</span> No credit card required to reserve
          </p>

        </form>

      </div>

    </div>
  );
}

export default CarDetails;
