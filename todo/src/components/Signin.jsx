import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signin', formData);
      
      console.log('Signin successful:', response.data);
      if (response.data) {
        
        localStorage.setItem('token', response.data); 
        navigate("/"); 
      }

    } catch (error) {
      console.error('Error during signin:', error);
    }
  };

  return (
    <>
     <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form onSubmit={submitHandler} className="flex flex-col gap-5 p-8 rounded-lg shadow-inner bg-gray-800 w-[300px]">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white font-semibold">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-12 text-white bg-gray-800 border border-gray-800 rounded-md px-2 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:scale-105 placeholder-gray-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-white font-semibold">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-12 text-white bg-gray-800 border border-gray-800 rounded-md px-2 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:scale-105 placeholder-gray-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="px-8 py-2 bg-gray-800 text-white font-bold rounded-md shadow-md transition-transform transform hover:scale-105 focus:scale-105"
        >
          Signin
        </button>

        <p className='text-white '>Not have an account? <Link to="/signup" className="text-blue-600">Sign up </Link></p>

      </form>
    </div>
    </>
  );
};
  

export default Signin;