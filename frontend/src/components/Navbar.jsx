import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
export const Navbar = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'>
                <img src={assets.logo} alt="" className='w-36' />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className=' hidden w-2/4 h-[1.5px] border-none bg-gray-700' />
                </NavLink>
                <NavLink to='/collection' className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className=' hidden w-2/4 h-[1.5px] border-none bg-gray-700' />
                </NavLink>
                <NavLink to='/about' className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className=' hidden w-2/4 h-[1.5px] border-none bg-gray-700' />
                </NavLink> <NavLink to='/contact' className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className=' hidden w-2/4 h-[1.5px] border-none bg-gray-700' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
                <div className='group relative'>
                    <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
                </Link>
                <img onClick={() => { setVisible(true) }} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>
            {/* Side bar */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div className='flex items-center gap-4 p-3 cursor-pointer' onClick={() => { setVisible(false) }}>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Black</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to='/' className="py-2 pl-6 border">
                        <p>HOME</p>
                    </NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/collection' className="py-2 pl-6 border">
                        <p>COLLECTION</p>
                    </NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/about' className="py-2 pl-6 border">
                        <p>ABOUT</p>
                    </NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/contact' className="py-2 pl-6 border">
                        <p>CONTACT</p>
                    </NavLink>

                </div>
            </div>
        </div>
    )
}
