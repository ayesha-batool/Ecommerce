import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure you have this set in your .env file
  const [search, setSearch] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const [cartItems, setCartItems] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    console.log("itemId", itemId, size);
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          {
            itemId,
            size,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            token: token,
          }
        );
        if (response.data.success) {
          toast.success("Item added to cart");
        } else {
          console.error("Failed to add item to cart:", response.data.message);
        }
        console.log("response", response.data);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };
  const getCartCount = () => {
    let totalItems = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        totalItems += cartItems[items][item];
      }
    }
    return totalItems;
  };
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          {
            itemId,
            size,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response", response.data);
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };
  const getUserCart = async (token) => {
    console.log("token", token);
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/get",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("response", response.data);
        if (response.data.success) {
          setCartItems(response.data.cartData);
        } else {
          console.error("Failed to get user cart:", response.data.message);
        }
      } catch (error) {
        console.error("Error getting user cart:", error);
      }
    }
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((item) => item._id === items);
      console.log("itemInfo", itemInfo);
      
      // Skip if itemInfo is not found
      if (!itemInfo) {
        console.warn(`Product with id ${items} not found in products array`);
        continue;
      }
      
      for (const item in cartItems[items]) {
        console.log("cartItems[items][item]", cartItems[items][item]);
        if (cartItems[items][item] > 0) {
          if (itemInfo.price) {
            console.log("itemInfo.price", itemInfo.price);
            totalAmount += itemInfo.price * cartItems[items][item];
          }
         }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/product/list`);
      const data = await response.data;
      console.log("Fetched products:", data);
      if (data.success) {
        setProducts(data.products);
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getProductsData();
  }, []);
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      setToken(token);
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    getCartCount,
    addToCart,setCartItems,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    getUserCart,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
