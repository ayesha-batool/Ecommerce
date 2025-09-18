import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const logout = () => {
    localStorage.removeItem("token");
    console.log("logout", localStorage.getItem("token"));
    setToken("");
    setCartItems({});
    navigate("/login");
  };
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3">
             <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">StyleHub</span>
          </Link>
          
          <ul className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </NavLink>
            <NavLink 
              to="/collection" 
              className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 group"
            >
              Collection
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </NavLink>
            <NavLink 
              to="/about" 
              className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </NavLink>
            <NavLink 
              to="/contact" 
              className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </NavLink>
          </ul>
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button
              onClick={(e) => setShowSearch(true)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
            >
              <img src={assets.search_icon} className="w-5 h-5" alt="Search" />
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative group">
              <button
                onClick={() => (token ? null : navigate("/login"))}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
              >
                <img src={assets.profile_icon} className="w-5 h-5" alt="Profile" />
              </button>
              {token && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                      My Profile
                    </button>
                    <button 
                      onClick={() => navigate("/orders")}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      My Orders
                    </button>
                    <hr className="my-1" />
                    <button 
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200">
              <img src={assets.cart_icon} className="w-5 h-5" alt="Cart" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu */}
            <button
              onClick={() => setVisible(true)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
            >
              <img src={assets.menu_icon} className="w-5 h-5" alt="Menu" />
            </button>
          </div>
        </div>
      </div>
      {/* Side bar */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => {
              setVisible(false);
            }}
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Black</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className="py-2 pl-6 border"
          >
            <p>HOME</p>
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className="py-2 pl-6 border"
          >
            <p>COLLECTION</p>
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className="py-2 pl-6 border"
          >
            <p>ABOUT</p>
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className="py-2 pl-6 border"
          >
            <p>CONTACT</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
