import React, { use } from 'react'
import { createContext, useContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from "../App";
import { ShopContext } from '../context/ShopContext';
export const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up'); // 'login' or 'register'
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === 'Sign Up') {


        const response = await axios.post(backendUrl + "/api/user/register", {
          name, email, password
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }
        else {
          toast.error(response.data.message || "Registration failed");
        }

      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email, password
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }
        else {
          toast.error(response.data.message || "login failed");

        }

      }

    } catch (error) {
      console.error("Error:", error);
      toast.error('An error occurred while processing your request.');
    }
  };
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-center ">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === "Login" ? "" :
        <input onChange={(e) => setName(e.target.value)} value={name} placeholder='Name'
          className=' w-full px-3 py-2 border brder-gray-800' type='text' />
      }
      <input onChange={(e) => setEmail(e.target.value)} placeholder='Email' type="email" value={email} className=' w-full px-3 py-2 border brder-gray-800' />
      <input onChange={(e) => setPassword(e.target.value)} placeholder='Password' type="password" value={password} className=' w-full px-3 py-2 border brder-gray-800' />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Password?</p>
        {
          currentState === "Login" ?
            <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')} >Create an Account</p>
            :
            <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Already have an Account?</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === "Login" ? "Login" : "Sign Up"}</button>
    </form>
  )
}
