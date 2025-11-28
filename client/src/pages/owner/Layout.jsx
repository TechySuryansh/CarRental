import React from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import { Sidebar } from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavbarOwner/>
      <div className='flex flex-1'>
        <Sidebar/>
        <div className='flex-1 p-6 bg-lightGray'>
          <Outlet/>
        </div>
      </div>

    </div>
  )
}

export default Layout