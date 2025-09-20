import React from 'react'
import { assets } from '../assets/assets'
const Navbar = ({setToken}) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
    };

    return (
        <div className='flex justify-between items-center  px-[4%] py-2 '>
          <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            StyleHub Admin
          </h2>
          <p className="text-sm text-gray-600 mt-1 bg-gradient-to-r from-orange-600 to-pink-600 ">Management Dashboard</p>
        </div>
            <button onClick={handleLogout} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )
}

export default Navbar