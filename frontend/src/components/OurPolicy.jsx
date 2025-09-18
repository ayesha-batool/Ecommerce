import React from 'react'
import { assets } from '../assets/assets'

export const OurPolicy = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
            <div>
                <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-400'>Hassle-free exchanges within 30 days for the perfect fit</p>
            </div>
            <div>
                <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>30 Days Return Policy</p>
                <p className='text-gray-400'>Full refund guarantee if you're not completely satisfied</p>
            </div>
            <div>
                <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>Premium Customer Support</p>
                <p className='text-gray-400'>Dedicated support team available 24/7 to help you</p>
            </div>
        </div>
    )
}
