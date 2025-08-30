import axios from 'axios';
import React from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = React.useState([])
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      const data = await response.data;
      console.log("Fetched products:", data);
      if (data.success) {
        setList(data.products);

      } else {
        toast.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const removeProduct = async (id) => {
    try {
      console.log("Removing product with ID:", id);
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`);
      const data = await response.data;
      console.log("Product removed:", data);
      if (data.success) {
        toast.success("Product removed successfully");
        fetchList(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to remove product");
    }
  }
  React.useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <p className='mb-2'>List of Products</p>
      <div className='flex flex-col  gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 gap-2  text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>

        </div>
        {list.map((item, index) => (
          <div key={index} className='grid md:grid-cols-[1fr_3fr_1fr] grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-1 px-2 border text-sm'>

            <img className='w-12' src={item.image[0]} alt={item.name} />
            <p className='text-xl font-semibold mt-2'>{item._id}</p>

            <p className='text-xl font-semibold mt-2'>{item.name}</p>
            <p className='text-gray-600 mt-1'>Category: {item.category}</p>
            <p className='text-gray-600 mt-1'>{currency}{item.price}</p>
            <p className='text-right md:text-center cursor-pointer text-lg' onClick={() => removeProduct(item._id)}>X</p>

          </div>
        ))}
      </div>
    </>
  )
}

export default List