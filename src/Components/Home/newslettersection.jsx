import React from 'react'
import { IoMailOutline } from "react-icons/io5";

const Newslettersection = () => {
    return (
        <div className='w-full  flex justify-center items-center relative bg-blue-800 mt-5 '>
            <div className='w-[90%] flex  justify-between items-center p-5'>
                <div className='w-full md:w-[46%] h-fit flex flex-col items-start font-robotoCondensed'>
                    <p className='text-xl text-white font-semibold'>Rs:1800 discount for your first order</p>
                    <p className='text-5xl text-white font-semibold mt-4'>Join our newsletter and get...</p>
                    <p className='text-[14px] text-[#CBC0E0] mt-2'>Join our email subscription now to get updates on</p>
                    <p className='text-[14px] text-[#CBC0E0]'>promotions and coupons.</p>
                    <div className='w-[80%] h-[60px] flex justify-evenly  items-center bg-white rounded-md mt-4 p-1'>
                        <IoMailOutline className='w-[10%] h-[25px] opacity-50' />
                        <input className='w-[65%] h-[50px] outline-none p-2' placeholder='Your Email Address' />
                        <button className='w-[25%] h-[50px] bg-blue-800 text-white font-semibold rounded-md ml-1 hover:bg-blue-900 transition-all duration-500'>Subscribe</button>
                    </div>
                </div>
                <img className='hidden md:flex w-[30%]' src='https://fullstack-ecommerce.netlify.app/static/media/newsletter.5931358dd220a40019fc.png' />
            </div>
        </div>
    )
}

export default Newslettersection