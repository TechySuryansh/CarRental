import React from 'react'
import { assets } from '../assets/assets'

export const Banner = () => {
  return (
    <div classNameclassName='flex flex-col md:flex-row md:items-start items-center 
    justify-between px-8 min-md:p1-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6x1 
    mx-3 md:mx-auto rounded-2x1 overflow-hidden'>
        <div>
            <h2>Do you own a luxury car</h2>
        </div>
        <img src={assets.banner_car_image} alt="car" className='max-h-45 mt-10'></img>
    </div>
  )
}
