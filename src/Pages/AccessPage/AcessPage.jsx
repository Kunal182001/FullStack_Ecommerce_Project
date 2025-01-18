import React, { useState, useContext, useEffect } from 'react';
import Mycontext from '../Mycontext/Mycontext';
import { useNavigate,NavLink } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";

const AccessPage = () => {
  const context = useContext(Mycontext);

  useEffect(() => {
    if (context.setisheader) {
      context.setisheader(false);
    }
    if (context.setisfooter) {
      context.setisfooter(false);
    }
    return () => {
      if (context.setisheader) {
        context.setisheader(true);
      }
      if (context.setisfooter) {
        context.setisfooter(true);
      }
    };
  }, []);

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validCode = import.meta.env.VITE_ADMIN_PAS;

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (code === validCode) {
      localStorage.setItem('hasAdminAccess', 'true');
      navigate('/Admin'); 
    } else {
      setError('Invalid code. Please try again.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="bg-white shadow-md rounded-lg p-8 w-96 relative">
        <NavLink to='/'>
          <RxCross1 className='absolute top-3 right-3 text-xl cursor-pointer'/>
        </NavLink>
        <h2 className="text-2xl font-bold mb-4 text-center">Enter Access Code</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default AccessPage;
