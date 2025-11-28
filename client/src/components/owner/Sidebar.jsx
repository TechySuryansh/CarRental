import React, { useState } from 'react'
import { assets, dummyUserData, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'

export const Sidebar = () => {
    const user = dummyUserData
    const location = useLocation()
    const [image, setImage] = useState("")

    const updateImage = async () => {
        user.image = URL.createObjectURL(image)
        setImage("")
    }

    return (
        <div className='relative min-h-screen md:flex flex-col items-center pt-8 
        max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>

            <div className='relative group'>
                <label htmlFor="image" className='cursor-pointer'>
                    <img
                        src={image ? URL.createObjectURL(image) : user?.image || ""}
                        alt=""
                        className='w-24 h-24 object-cover rounded-full'
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
                        className='absolute -bottom-2 right-0 flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary cursor-pointer rounded'
                        onClick={updateImage}
                    >
                        Save
                        <img src={assets.check_icon} width={13} alt="" />
                    </button>
                )}
            </div>

            <p className='mt-4 text-base max-md:hidden'>{user?.name}</p>

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
