import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { Title } from "../components/Title";
export const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    if (token) {
      const response = await axios.post(
        backendUrl + "/api/order/userOrders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("response", response.data);
      setOrders(response.data.orders.reverse());
    }
  };
  useEffect(() => {
    loadOrders();
  }, [token]);

  return orders.length > 0 ? (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orders.slice(0, 3).map((order, orderIndex) => (
          <div key={orderIndex} className="mb-6 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-medium">Order #{order._id.slice(-6)}</p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Total: {currency}{order.amount}
                </p>
                <p className="text-sm text-gray-500">
                  Status: {order.status}
                </p>
                <p className="text-sm text-gray-500">
                  Payment Method: {order.paymentMethod}
                </p>
              </div>
              <button onClick={()=>loadOrders()} className="border px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
            
            <div className="space-y-3">
              {order.items && order.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-start gap-4 text-sm border-t pt-3"
                >
                  <img 
                    src={item.image && item.image[0] ? item.image[0] : '/placeholder-image.png'} 
                    className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded" 
                    alt={item.name || 'Product'} 
                  />
                  <div className="flex-1">
                    <p className="sm:text-base font-medium">{item.name || 'Product Name'}</p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p className="text-lg">
                        {currency}{item.price/item.quantity || 0}
                      </p>
                      <p>Quantity: {item.quantity || 1}</p>
                      <p>Size: {item.size || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
    </div>
  );
};
