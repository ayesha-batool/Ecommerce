import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: e.target.value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        await fetchOrders();
        toast.success("Order status updated");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div>
     
      <div>
        {console.log("orders", orders)}
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 gap-2 text-sm"
            key={index}
          >
            <img src={assets.parcel_icon} alt="" className="w-10 h-10" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span> ,
                      </p>
                    );
                  }
                })}
              </div>
              <p>
                Total: {order.address.firstName} {order.address.lastName}
              </p>
              <div>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.zipcode}, {order.address.country}
                </p>
              </div>
              <p>Phone: {order.address.phone}</p>
            </div>
            <div>
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p>${order.amount}</p>
            <select
              value={order.status}
              name=""
              id=""
              onChange={(e) => statusHandler(e, order._id)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Ready for Delivery">Ready for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
