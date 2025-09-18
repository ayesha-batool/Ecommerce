import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

export const ProductItem = ({ data }) => {
    const { currency } = useContext(ShopContext);
    
    // Destructure the data object
    const { _id, image, name, price } = data || {};
    
    // Add safety checks for image array
    const imageUrl = image && image.length > 0 ? image[0] : '';
    
    return (
        
        <Link to={`/product/${_id}`} className='text-gray-700 cursor-pointer'>
        
            <div className='overflow-hidden'>
                <img src={imageUrl} alt={name || 'Product'} className='hover:scale-110 transition ease-in-out' />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    )
}
