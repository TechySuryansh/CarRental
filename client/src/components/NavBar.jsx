import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/Slices/AuthSlice'

export const NavBar = ({ setShowLogin }) => {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <div className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600
    border-b border-borderColor relative transition-all ${location.pathname === "/" && "bg-light"}`}>
      <Link to="/">
        <img src={assets.logo} alt="logo" className='h-8' />

      </Link>
      <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor
        right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all
        duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}
        <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56'>
          <input type="text" className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500'
            placeholder='Search Products' />
          <img src={assets.search_icon} alt="search" />
        </div>
        <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
          {user && (
            <button onClick={() => navigate(user.role === 'owner' ? '/owner' : '/my-bookings')}
              className='cursor-pointer hover:text-primary transition-all'>Dashboard</button>
          )}
          {user ? (
            <div className='relative'>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className='flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all'
              >
                <div className='w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold'>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className='max-sm:inline hidden sm:inline'>{user.name}</span>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>
              
              {showDropdown && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
                  <div className='px-4 py-2 border-b border-gray-200'>
                    <p className='font-semibold text-gray-800'>{user.name}</p>
                    <p className='text-xs text-gray-500'>{user.email}</p>
                    <p className='text-xs text-blue-600 mt-1 capitalize'>{user.role}</p>
                  </div>
                  <button 
                    onClick={() => {
                      navigate('/my-bookings')
                      setShowDropdown(false)
                    }}
                    className='w-full text-left px-4 py-2 hover:bg-gray-100 transition-all'
                  >
                    My Bookings
                  </button>
                  {user.role === 'owner' && (
                    <button 
                      onClick={() => {
                        navigate('/owner')
                        setShowDropdown(false)
                      }}
                      className='w-full text-left px-4 py-2 hover:bg-gray-100 transition-all'
                    >
                      Owner Dashboard
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      handleLogout()
                      setShowDropdown(false)
                    }}
                    className='w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition-all'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) :
            <button onClick={() => setShowLogin(true)} className='cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg'>
              Login
            </button>}
        </div>

      </div>
      <button className='sm:hidden cursor-pointer' aria-label="Menu" onClick={() => setOpen(!open)}>
        <img src={open ? assets.close_icon : assets.menu_icon} alt="" />
      </button>
    </div>
  )
}
