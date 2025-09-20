import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure you have this set in your .env file
export const currency = '$'; // Set your currency here
import Login from "./components/Login"; // Assuming you have a Login component
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="
            text-gray-600 text-base w-full">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
