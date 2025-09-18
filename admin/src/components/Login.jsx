import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App"; // Adjust the import path as necessary


const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
   
      e.preventDefault();
      console.log("Login attempt with:", { email, password });
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      })
      console.log("login res",response.data.token);
      localStorage.setItem("token", response.data.token); // Store the token in localStorage
      toast.success("Login successful!"); // Show success message
      if (response.data.success) {
        setToken(response.data.token); // Set the token in the parent component
      }
      else{
        toast.error(response.data.message); // Show error message
        return;
      }
   
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md ">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={onSubmitHandler}>
          <div className="min-w-72 mb-3">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="border px-3 py-2 rounded-md w-full border-gray-300 outline-none"
            />
          </div>
          <div className="min-w-72 mb-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="border px-3 py-2 rounded-md w-full border-gray-300 outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-600 text-white px-5
            py-2 rounded-full text-xs sm:text-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
