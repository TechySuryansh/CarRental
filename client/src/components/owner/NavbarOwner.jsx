import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { userAPI } from '../../services/api'

const NavbarOwner = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
        try {
            console.log('NavbarOwner: Fetching user data...')
            const response = await userAPI.getUserData()
            console.log('NavbarOwner: Response:', response.data)
            if (response.data.success) {
                setUser(response.data.user)
                console.log('NavbarOwner: User set:', response.data.user)
            } else {
                console.error('NavbarOwner: Failed:', response.data.message)
            }
        } catch (error) {
            console.error('NavbarOwner: Error fetching user data:', error)
            console.error('NavbarOwner: Error details:', error.response?.data)
        }
    }

    return (
        <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 
        border-b border-bordercolor relative transition-all'>
            <Link to="/" >
                <img src={assets.logo} alt="" className="h-7"/>
                CarRental Owner
            </Link>
            <p>Welcome, {user?.name || "Owner"}</p>
        </div>
    )
}

export default NavbarOwner