import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

export const Hero = () => {
    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-orange-50 to-pink-50'>
            <div className='flex flex-col lg:flex-row min-h-[70vh]'>
                {/* Hero Content */}
                <div className="w-full lg:w-1/2 flex items-center justify-center py-16 px-6 lg:px-12">
                    <div className='text-gray-800 max-w-lg'>
                        <div className="flex items-center gap-3 mb-4">
                            <div className='w-12 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500'></div>
                            <p className='font-semibold text-sm tracking-wider text-gray-600'>PREMIUM FASHION</p>
                        </div>
                        <h1 className='text-4xl lg:text-6xl font-bold leading-tight mb-6'>
                            Discover Your
                            <span className='block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500'>
                                Perfect Style
                            </span>
                        </h1>
                        <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                            Curated collection of premium fashion pieces that blend timeless elegance with modern trends. 
                            Find your signature look with our carefully selected garments.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <Link 
                                to="/collection" 
                                className='bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-center'
                            >
                                Explore Collection
                            </Link>
                            <Link 
                                to="/about" 
                                className='border-2 border-orange-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 text-center'
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Hero Image */}
                <div className="w-full lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20 z-10"></div>
                    <img 
                        src={assets.hero_img} 
                        className='w-full h-full object-cover' 
                        alt="Premium Fashion Collection" 
                    />
                    {/* Floating Elements */}
                    <div className="absolute top-1/4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg z-20">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Free Shipping</span>
                        </div>
                    </div>
                    <div className="absolute bottom-1/4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg z-20">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Premium Quality</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
