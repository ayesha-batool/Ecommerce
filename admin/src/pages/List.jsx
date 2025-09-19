import axios from 'axios';
import React from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
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
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
    <div className="bg-gradient-to-br from-orange-50 to-pink-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Product Management</h1>
          <p className="text-gray-600 mb-8">Manage your product inventory and view all available items.</p>
          
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 py-4 px-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-t-xl font-semibold">
                <div className="col-span-2">Image</div>
                <div className="col-span-4">Product Name</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
              
              {/* Product Rows */}
              {list.map((item, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-12 gap-4 py-6 px-6 border-b border-gray-200 hover:bg-orange-50 transition-colors ${
                    index === list.length - 1 ? 'rounded-b-xl' : ''
                  }`}
                >
                  <div className="col-span-2">
                    <img 
                      className="w-16 h-16 object-cover rounded-lg shadow-sm" 
                      src={item.image[0]} 
                      alt={item.name} 
                    />
                  </div>
                  <div className="col-span-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xl font-bold text-gray-800">{currency}{item.price}</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <button
                      onClick={() => removeProduct(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              
              {list.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Found</h3>
                  <p className="text-gray-500">Start by adding your first product to the inventory.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List