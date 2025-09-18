import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

export const ProductItem = ({ data }) => {
    const { currency } = useContext(ShopContext);
    
    // Destructure the data object
    const { _id, image, name, price, category, BestSeller } = data || {};
    
    // Add safety checks for image array
    const imageUrl = image && image.length > 0 ? image[0] : '';
    
    return (
        <Link to={`/product/${_id}`} className='group block'>
            <div className='bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100'>
                {/* Image Container */}
                <div className='relative overflow-hidden aspect-square'>
                    <img 
                        src={imageUrl} 
                        alt={name || 'Product'} 
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                    />
                    {/* Badge */}
                    {BestSeller && (
                        <div className='absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold'>
                            Best Seller
                        </div>
                    )}
                    {/* Category Badge */}
                    <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium'>
                        {category}
                    </div>
                    {/* Hover Overlay */}
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300'></div>
                </div>
                
                {/* Product Info */}
                <div className='p-4'>
                    <h3 className='font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'>
                        {name}
                    </h3>
                    <div className='flex items-center justify-between'>
                        <span className='text-xl font-bold text-gray-900'>
                            {currency}{price}
                        </span>
                        <div className='flex items-center gap-1'>
                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            <span className='text-xs text-gray-500'>In Stock</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
