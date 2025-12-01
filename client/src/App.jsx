import { useState } from 'react'
import { NavBar } from './components/NavBar'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Home } from './pages/Home'
import CarDetails from './pages/CarDetails'
import MyBookings from './pages/MyBookings'
import Cars from './pages/Cars'
import Login from './components/Login'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import { Dashboard } from './pages/owner/Dashboard'
import { AddCar } from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'


const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {!isOwnerPath && <NavBar setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>

      </Routes>
      {!isOwnerPath && <Footer />}

      {/* Floating Home Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50 group"
        title="Go to Home"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="absolute right-full mr-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap top-1/2 -translate-y-1/2">
          Home
        </span>
      </button>
    </>

  )
}

export default App