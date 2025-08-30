import React, { createContext, useEffect, useState } from 'react'
import { products } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$'
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure you have this set in your .env file
    const [search, setSearch] = React.useState('');
    const [showSearch, setShowSearch] = React.useState(false);
    const [cartItems, setCartItems] = React.useState([]);
   const [products, setProducts] = React.useState([]);
   const [token,setToken] = useState("");
    const navigate = useNavigate();

    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error("Please select a size");
            return;
        }
        const cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }

        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }
    const getCartCount = () => {
        let totalItems = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                totalItems += cartItems[items][item];
            }
        }
        return totalItems;
    }
    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find(item => item._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }
                catch (error) {
                    console.error("Error calculating cart amount:", error);
                }
            }
        }
        return totalAmount;
    }
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl+`/api/product/list`);
            const data = await response.data;
            if (data.success) {
                setProducts(data.products);
            }
            else {
                console.error("Failed to fetch products:", data.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    useEffect(() => {
        getProductsData();
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    }, []);
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
        addToCart,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
