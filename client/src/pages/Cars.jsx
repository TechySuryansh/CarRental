import React, { useState } from 'react'
import { Title } from '../components/Title';
import { assets, dummyCarData } from '../assets/assets';
import CarCard from '../components/CarCard';
const Cars = () => {
  const [input,setInput]=useState("")
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

      <input  onClick={(e)=>setInput(e.target.value)} value={input}
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
  <div className='px-6 md:px-16 1g:px-24 x1:px-32 mt-10'>
    <p>Showing {dummyCarData.length} Cars</p>
    <div className='grid grid-cols-1 sm:grid-cols-2 lis:grid-cols-3 gap-8 mt-4
x1:px-20 max-w-7x1 mx-auto'>
  {dummyCarData.map((car,index)=>(
    <div key={index}>
      <CarCard car={car}/>
    </div>
  ))}

    </div>
  </div>
</div>

  )
}
export default Cars ; 
