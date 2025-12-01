import React, { useState, useEffect } from 'react'
import { Title } from '../components/Title';
import { assets } from '../assets/assets';
import CarCard from '../components/CarCard';
import Loader from '../components/Loader';
import { carAPI } from '../services/api';

const Cars = () => {
  const [input, setInput] = useState("")
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCars()
  }, [])

  useEffect(() => {
    if (input.trim() === '') {
      setFilteredCars(cars)
    } else {
      const filtered = cars.filter(car => 
        car.brand?.toLowerCase().includes(input.toLowerCase()) ||
        car.model?.toLowerCase().includes(input.toLowerCase()) ||
        car.name?.toLowerCase().includes(input.toLowerCase()) ||
        car.category?.toLowerCase().includes(input.toLowerCase()) ||
        car.location?.toLowerCase().includes(input.toLowerCase())
      )
      setFilteredCars(filtered)
    }
  }, [input, cars])

  const fetchCars = async () => {
    try {
      const response = await carAPI.getAllCars()
      if (response.data.success) {
        setCars(response.data.cars)
        setFilteredCars(response.data.cars)
      }
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title 
          title="Available Cars" 
          subtitle="Browse through our extensive collection of vehicles to find the perfect match for your journey." 
          align="center"
        />

        <div className='flex items-center bg-white px-4 mt-6 max-w-[700px] w-full h-12 rounded-full shadow'>
          <img 
            src={assets.search_icon} 
            alt="search" 
            className='w-[18px] h-[18px] mr-3 opacity-60'
          />

          <input 
            onChange={(e) => setInput(e.target.value)} 
            value={input}
            type="text" 
            placeholder="Search by make, model, or features" 
            className='flex-grow outline-none text-gray-700'
          />

          <img 
            src={assets.filter_icon} 
            alt="filter" 
            className='w-[18px] h-[18px] ml-3 opacity-60 cursor-pointer hover:opacity-100'
          />
        </div>
      </div>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p>Showing {filteredCars.length} Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car) => (
            <div key={car._id}>
              <CarCard car={car}/>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-500'>No cars found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cars; 
