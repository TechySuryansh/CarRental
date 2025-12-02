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
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [locationFilter, setLocationFilter] = useState('all')
  
  // Sort state
  const [sortBy, setSortBy] = useState('default')
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const carsPerPage = 9

  useEffect(() => {
    fetchCars()
  }, [])

  useEffect(() => {
    let filtered = [...cars]
    
    // Search filter
    if (input.trim() !== '') {
      filtered = filtered.filter(car => 
        car.brand?.toLowerCase().includes(input.toLowerCase()) ||
        car.model?.toLowerCase().includes(input.toLowerCase()) ||
        car.name?.toLowerCase().includes(input.toLowerCase()) ||
        car.category?.toLowerCase().includes(input.toLowerCase()) ||
        car.location?.toLowerCase().includes(input.toLowerCase())
      )
    }
    
    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(car => car.category === categoryFilter)
    }
    
    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(car => car.location === locationFilter)
    }
    
    // Price range filter
    filtered = filtered.filter(car => 
      car.pricePerDay >= priceRange.min && car.pricePerDay <= priceRange.max
    )
    
    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.pricePerDay - b.pricePerDay)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.pricePerDay - a.pricePerDay)
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => (a.brand + a.model).localeCompare(b.brand + b.model))
    }
    
    setFilteredCars(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [input, cars, categoryFilter, locationFilter, priceRange, sortBy])

  const fetchCars = async () => {
    try {
      const response = await carAPI.getAllCars()
      if (response.data.success) {
        setCars(response.data.cars)
        setFilteredCars(response.data.cars)
        
        // Set max price for price range filter
        const maxPrice = Math.max(...response.data.cars.map(car => car.pricePerDay))
        setPriceRange({ min: 0, max: maxPrice })
      }
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Get unique categories and locations
  const categories = ['all', ...new Set(cars.map(car => car.category))]
  const locations = ['all', ...new Set(cars.map(car => car.location))]
  
  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar)
  const totalPages = Math.ceil(filteredCars.length / carsPerPage)
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const clearFilters = () => {
    setCategoryFilter('all')
    setLocationFilter('all')
    const maxPrice = Math.max(...cars.map(car => car.pricePerDay))
    setPriceRange({ min: 0, max: maxPrice })
    setSortBy('default')
    setInput('')
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
            onClick={() => setShowFilters(!showFilters)}
            src={assets.filter_icon} 
            alt="filter" 
            className='w-[18px] h-[18px] ml-3 opacity-60 cursor-pointer hover:opacity-100'
          />
        </div>
      </div>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        {/* Filters Section */}
        {showFilters && (
          <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Filters</h3>
              <button onClick={clearFilters} className='text-sm text-blue-600 hover:underline'>Clear All</button>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {/* Category Filter */}
              <div>
                <label className='block text-sm font-medium mb-2'>Category</label>
                <select 
                  value={categoryFilter} 
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className='w-full border border-gray-300 rounded-lg p-2 outline-blue-500'
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className='block text-sm font-medium mb-2'>Location</label>
                <select 
                  value={locationFilter} 
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className='w-full border border-gray-300 rounded-lg p-2 outline-blue-500'
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc === 'all' ? 'All Locations' : loc}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className='block text-sm font-medium mb-2'>Max Price: ₹{priceRange.max}/day</label>
                <input 
                  type='range' 
                  min='0' 
                  max={Math.max(...cars.map(car => car.pricePerDay))}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                  className='w-full'
                />
              </div>
            </div>
          </div>
        )}

        {/* Sort and Results Bar */}
        <div className='flex justify-between items-center mb-4'>
          <p className='text-gray-600'>Showing {currentCars.length} of {filteredCars.length} Cars</p>
          <div className='flex items-center gap-2'>
            <label className='text-sm font-medium'>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className='border border-gray-300 rounded-lg px-3 py-1 outline-blue-500'
            >
              <option value='default'>Default</option>
              <option value='price-low'>Price: Low to High</option>
              <option value='price-high'>Price: High to Low</option>
              <option value='name'>Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Cars Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {currentCars.map((car) => (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-2 mt-8 mb-12'>
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === index + 1 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cars; 
