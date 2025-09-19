import React from "react";
import { NavLink } from "react-router-dom";

import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[20%] min-h-screen bg-gradient-to-b from-orange-100 to-pink-100 border-r-2 border-orange-200">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            StyleHub Admin
          </h2>
          <p className="text-sm text-gray-600 mt-1">Management Dashboard</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Items" className="w-5 h-5" />
            <span className="font-medium">Add Products</span>
          </NavLink>
          
          <NavLink
            to="/list"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`
            }
          >
            <img src={assets.order_icon} alt="List Items" className="w-5 h-5" />
            <span className="font-medium">Product List</span>
          </NavLink>
          
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`
            }
          >
            <img src={assets.order_icon} alt="Orders" className="w-5 h-5" />
            <span className="font-medium">Orders</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
