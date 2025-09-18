import React, { useState, useContext, useEffect, use } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { RelatedProducts } from '../components/RelatedProducts';
export const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
const [size, setSize] = useState('');
  const fetchProductData = async () => {
    const product = products.find(item => item._id === productId);
    console.log("product",product)
    setProductData(product);
  }
  useEffect(() => {
    if (productData && productData.image && productData.image.length > 0) {
      setImage(productData.image[0]);
    }
  }, [productData]); 
   
  
  useEffect(() => {
    console.log("image",image,size)
  }, [image,size]);
  
  useEffect(() => {
    fetchProductData();
  }, [productId,products]);
  return productData ? (
    
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col w-full sm:w-[18.7%] sm:justify-normal justify-between sm:overflow-y-scroll overflow-x-auto'>
            {productData.image && productData.image.map((img, index) => (
              <img onClick={() => setImage(img)} key={index} src={img?img:'assets/placeholder.png'} alt={productData.name} className=' w-24 sm:w-full h-24 object-cover border cursor-pointer hover:opacity-75' />
           
           ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image?image:'assets/placeholder.png'} className='w-full h-auto' alt="" />
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>

          </div>
          <p>{currency}{productData.price}</p>
          <p>{productData.description}</p>
          <div>
            <p>Select Size</p>
            <div className='flex gap-3 my-2'>
              {productData.sizes && productData.sizes.map((s, index) => (
                <button onClick={()=>setSize(s)} key={index} className={`border border-gray-400 w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-75 ${size === s ? 'bg-black text-white' : ''}`}>{s}</button>
              ))}
            </div>
          </div>

          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-5 py-3 hover:opacity-75'>ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className='mt-10 text-sm text-gray-400 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available policy within 7 days.</p>
            <p>
              Easy return and exhange policy within 7 days
            </p>

          </div>
        </div>
      </div>
      <div className='mt-20'>
        <div className="flex justify-between">
          <b>Description</b>
          <p>Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>An ecommerce website is an online platform that</p>
          <p>E-commerce websites typically display products or </p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div>Loading...</div>
}
