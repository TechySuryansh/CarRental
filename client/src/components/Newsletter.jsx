import React from 'react'

const Newsletter = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center space-y-4 px-4 md:px-8 py-16 my-20 rounded-2xl 
    bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 shadow-xl overflow-hidden">

      {/* Floating glow overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 pointer-events-none"></div>

      <h1 className="md:text-4xl text-3xl font-bold text-white drop-shadow-lg">
        Never Miss a Deal!
      </h1>

      <p className="md:text-lg text-gray-200 max-w-2xl">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>

      <form className="relative flex items-center w-full max-w-xl mt-4">
        <input
          className="w-full h-12 md:h-14 px-4 bg-white/90 backdrop-blur-sm 
          border border-white/50 rounded-l-xl text-gray-700
          shadow-inner focus:outline-none focus:border-white focus:ring-2 focus:ring-white/70 transition-all"
          type="email"
          placeholder="Enter your email"
          required
        />
        
        <button
          type="submit"
          className="h-12 md:h-14 px-6 md:px-10 bg-black text-white font-semibold rounded-r-xl 
          hover:bg-gray-900 transition-all tracking-wide"
        >
          Subscribe
        </button>
      </form>

      {/* bottom accent bar */}
      <div className="w-24 h-1 mt-6 bg-white/80 rounded-full"></div>
    </div>
  )
}

export default Newsletter
