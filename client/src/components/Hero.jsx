import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'

export const Hero = () => {
    const [pickupLocation, setPickupLocation] = useState("")

    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-10 bg-gradient-to-b from-blue-50 to-white text-center relative overflow-hidden px-4 pt-20'>
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="z-10 flex flex-col items-center gap-6 animate-fade-in">
                <span className="px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-medium tracking-wide uppercase">
                    Premium Car Rental
                </span>
                <h1 className='text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 leading-tight'>
                    Drive Your <span className="text-blue-600">Dream</span> Today
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
                    Experience the thrill of the road with our premium fleet of luxury vehicles.
                    Unbeatable prices, unlimited miles, and unforgettable memories.
                </p>
            </div>

            <form className='z-10 flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-2xl md:rounded-full w-full max-w-4xl bg-white shadow-2xl border border-gray-100 animate-slide-up' style={{ animationDelay: '0.2s' }}>
                <div className='flex flex-col md:flex-row items-center gap-4 w-full px-4'>
                    <div className='flex flex-col items-start gap-1 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0'>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Location</label>
                        <select
                            required
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            className="w-full bg-transparent font-semibold text-gray-700 outline-none cursor-pointer"
                        >
                            <option value="">Select City</option>
                            {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
                        </select>
                    </div>

                    <div className='flex flex-col items-start gap-1 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pl-4'>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Pick-up Date</label>
                        <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className='w-full bg-transparent font-semibold text-gray-700 outline-none cursor-pointer'
                            required
                        />
                    </div>

                    <div className='flex flex-col items-start gap-1 w-full md:w-1/3 md:pl-4'>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Return Date</label>
                        <input
                            type="date"
                            className='w-full bg-transparent font-semibold text-gray-700 outline-none cursor-pointer'
                            required
                        />
                    </div>
                </div>

                <button className='w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl md:rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 mt-4 md:mt-0'>
                    <img src={assets.search_icon} alt="search" className='w-5 h-5 brightness-0 invert' />
                    <span>Search</span>
                </button>
            </form>

            <div className="relative w-full max-w-5xl mt-8 animate-float">
                <img
                    src={assets.main_car}
                    alt="Luxury Car"
                    className='w-full h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-700'
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-black/20 blur-3xl -z-10 rounded-full"></div>
            </div>
        </div>
    )
}
