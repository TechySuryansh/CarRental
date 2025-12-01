import React, { useState, useEffect } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { userAPI, ownerAPI } from '../../services/api'

export const Sidebar = () => {
    const [user, setUser] = useState(null)
    const location = useLocation()
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
        try {
            console.log('Fetching user data...')
            const response = await userAPI.getUserData()
            console.log('User data response:', response.data)
            if (response.data.success) {
                setUser(response.data.user)
                console.log('User set:', response.data.user)
            } else {
                console.error('Failed to fetch user:', response.data.message)
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
            console.error('Error details:', error.response?.data)
        }
    }

    const updateImage = async () => {
        if (!image) return
        
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('image', image)
            
            const response = await ownerAPI.updateImage(formData)
            
            if (response.data.success) {
                alert('Profile image updated successfully')
                setUser({ ...user, image: response.data.image })
                setImage(null)
            } else {
                alert(response.data.message || 'Failed to update image')
            }
        } catch (error) {
            console.error('Error updating image:', error)
            alert('Failed to update image')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className='relative min-h-screen md:flex flex-col items-center pt-8 
        max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>

            <div className='relative group'>
                <label htmlFor="image" className='cursor-pointer'>
                    <img
                        src={image ? URL.createObjectURL(image) : user?.image || "https://ui-avatars.com/api/?name=" + (user?.name || "User") + "&background=3b82f6&color=fff&size=150"}
                        alt="Profile"
                        className='w-24 h-24 object-cover rounded-full border-2 border-gray-200'
                    />
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                        onChange={e => setImage(e.target.files[0])}
                    />

                    <div className='absolute top-0 right-0 left-0 bottom-0 bg-black/10 hidden group-hover:flex items-center justify-center rounded-full'>
                        <img src={assets.edit_icon} alt="" className='w-6 h-6' />
                    </div>
                </label>

                {image && (
                    <button
                        className='absolute -bottom-2 right-0 flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary cursor-pointer rounded disabled:opacity-50'
                        onClick={updateImage}
                        disabled={uploading}
                    >
                        {uploading ? 'Saving...' : 'Save'}
                        <img src={assets.check_icon} width={13} alt="" />
                    </button>
                )}
            </div>

            {user ? (
                <>
                    <p className='mt-4 text-base max-md:hidden font-medium'>{user.name}</p>
                    <p className='text-xs text-gray-500 max-md:hidden'>{user.email}</p>
                </>
            ) : (
                <p className='mt-4 text-sm max-md:hidden text-gray-400'>Loading...</p>
            )}

            <div className='w-full mt-6'>
                {ownerMenuLinks.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.path}
                        className={`flex items-center gap-3 px-6 py-4 relative 
                        hover:bg-primary/10 cursor-pointer 
                        ${link.path === location.pathname ? 'bg-primary/10 font-medium' : ''}`}
                    >
                        <img
                            src={link.path === location.pathname ? link.coloredIcon : link.icon}
                            alt="menu icon"
                        />

                        <span className='max-md:hidden'>{link.name}</span>

                        {link.path === location.pathname && (
                            <div className='bg-primary w-1.5 h-8 rounded-xl right-0 absolute'></div>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
