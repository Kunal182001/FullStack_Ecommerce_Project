import React, { useContext, useEffect } from 'react';
import Mycontext from '../Mycontext/Mycontext'
import { NavLink, useNavigate } from 'react-router-dom';
import logoimg from '../../assets/logo.png';
import { BiCategory } from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const AdminPage = () => {
  const context = useContext(Mycontext);
  useEffect(() => {
    if (context.setisheader) {
      context.setisheader(false); // Adjusted function name for readability
    }
    if (context.setisfooter) {
      context.setisfooter(false); // Adjusted function name for readability
    }
    return () => {
      if (context.setisheader) {
        context.setisheader(true); // Reset header on unmount
      }
      if (context.setisfooter) {
        context.setisfooter(true); // Adjusted function name for readability
      }
    };
  }, []);


  return (
    <div className='w-full h-screen relative flex justify-center items-center  bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-100'>
      <div className="w-[300px] h-[600px] flex flex-col items-center bg-white shadow-xl gap-5 p-5 font-robotoCondensed rounded-xl">
        <img src={logoimg} className='w-[100px] h-[100px] cursor-pointer' />
        <p className='text-xl font-bold  '>Ecommerce Admin</p>
        <div className='w-full flex flex-col items-start gap-4 p-4 cursor-pointer'>
          <div className='w-full flex justify-start gap-2 items-center  group'>
            <BiCategory className='text-gray-700 group-hover:text-blue-800' />
            <NavLink to='/addcategory'>
              <p className='text-[16px] text-gray-700 font-semibold group-hover:text-blue-800'>Category</p>
            </NavLink>
          </div>
          <div className='w-full flex justify-start gap-2 items-center group'>
            <FaProductHunt className='text-gray-700 group-hover:text-blue-800' />
            <NavLink to='/addproduct'>
              <p className='text-[16px] text-gray-700 font-semibold group-hover:text-blue-800'>Products</p>
            </NavLink>
          </div>
          <div className='w-full flex justify-start gap-2 items-center group'>
            <MdOutlineProductionQuantityLimits className='text-gray-700 group-hover:text-blue-800' />
            <p className='text-[16px] text-gray-700 font-semibold group-hover:text-blue-800'>Orders</p>
          </div>
          <div className='w-full flex justify-start gap-2 items-center group'>
            <FaBell className='text-gray-700 group-hover:text-blue-800' />
            <p className='text-[16px] text-gray-700 font-semibold group-hover:text-blue-800'>Notification</p>
          </div>
          <div className='w-full flex justify-start gap-2 items-center group'>
            <FaMessage className='text-gray-700 group-hover:text-blue-800' />
            <p className='text-[16px] text-gray-700 font-semibold group-hover:text-blue-800'>Messages</p>
          </div>
        </div>
        <NavLink to='/' 
        onClick={() => localStorage.removeItem('hasAdminAccess')}
        className='w-full h-[130px]  flex justify-center items-center bg-blue-400 rounded-xl bg-opacity-35 cursor-pointer'>
          <p className='w-[150px] h-[50px] bg-blue-700 text-white font-bold rounded-lg flex justify-center items-center hover:bg-blue-900'>Logout</p>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminPage
