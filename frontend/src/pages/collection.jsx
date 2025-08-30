import React, { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import {ProductItem} from '../components/ProductItem';
import {Title} from '../components/Title';
export const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter(item => item !== e.target.value));
    } else {
      setCategory([...category, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter(item => item !== e.target.value));
    } else {
      setSubCategory([...subCategory, e.target.value]);
    }
  }

  const applyFilters = () => {
    let productsCopy = [...products];
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subcategory));
    }
    setFilterProducts(productsCopy);
  }
 
  const sortProducts = () => {
    let sortedProducts = [...filterProducts];
    if (sortType === 'lowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'highToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortType === 'relevent') {
      // No sorting needed for relevant
    }
    setFilterProducts(sortedProducts);
  }
useEffect(() => {
  setFilterProducts(products);
}, []);
  useEffect(() => {
    applyFilters();
  }, [ , showSearch, search, category, subCategory]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''} `} alt="" />
        </p>
        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEOGRIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} name="" id="" onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} name="" id=""  onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} name="" id=""  onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>
        {/* subcategory */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} name="" id="" onChange={toggleSubCategory} />Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} name="" id="" onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} name="" id="" onChange={toggleSubCategory} />Winterwear
            </p>
          </div> 
        </div>
      </div>
      {/* Right side  */}
      <div className='flex-1'>
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'All'} text2={'COLLECTIONS'}/>
          <select name="" id="" className='border border-gray-300 text-sm px-2' onChange={(e) => setSortType(e.target.value)}>
            <option value="relevent">Relevent</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filterProducts.map(item => (
            <ProductItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
