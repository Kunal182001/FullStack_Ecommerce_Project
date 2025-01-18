import React from 'react'
import { IoShirtOutline } from "react-icons/io5";
import { RiTruckLine } from "react-icons/ri";
import { RiDiscountPercentLine } from "react-icons/ri";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaCopyright } from "react-icons/fa";

const Footter = () => {
    return (
        <div className='w-full  flex flex-col items-center relative mt-5 '>
            <div className='w-full md:w-0 h-1 md:h-0 bg-slate-100'></div>
            <div className='hidden w-[90%]  md:flex justify-between items-center p-5  border-b-[2px] ' >
                <div className='w-[25%] flex justify-center gap-2 items-center'>
                    <IoShirtOutline className='text-xl' />
                    <p className='text-xl '>Everyday fresh products</p>
                </div>
                <div className='w-[30%] h-[50px] flex justify-center gap-2 items-center border-l-2 '>
                    <RiTruckLine className='text-xl' />
                    <p className='text-xl '>Free delivery for order over Rs.500</p>
                </div>
                <div className='w-[25%] h-[50px] border-l-2 flex justify-center gap-2 items-center'>
                    <RiDiscountPercentLine className='text-xl' />
                    <p className='text-xl '>Daily Mega Discounts</p>
                </div>
                <div className='w-[25%] h-[50px] border-l-2 flex justify-center gap-2 items-center'>
                    <FaCheck className='text-xl' />
                    <p className='text-xl '>Best price on the market</p>
                </div>
            </div>
            <div className='w-[90%]  flex flex-col md:flex-row justify-between items-center mt-8 p-10  pl-20 border-b-[2px]'>
                <ul className='w-full  flex flex-col items-start'>
                    <li className='text-xl text-blue-800 font-[700]'>Company</li>
                    <li className='text-[#616469] text-[16px] font-[400]'>About Us</li>
                    <li className='text-[#616469] text-[16px] font-[400]'>Ecommerce Corporate</li>
                    <li className='text-[#616469] text-[16px] font-[400]'>Careers</li>
                    <li className='text-[#616469] text-[16px] font-[400]'>Team</li>
                </ul>
                <div className='w-full flex flex-col gap-10 cursor-pointer'>
                    <ul className='w-full flex flex-col gap-2'>
                        <li className='text-xl text-blue-800 font-[700]'>Contact</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Help & Support</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Partner with us</li>
                    </ul>
                    <ul className='w-full flex flex-col gap-2'>
                        <li className='text-xl text-blue-800 font-[700]'>Legal</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Terms & Conditions</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Cookie Policy</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Privacy Policy</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Investor Relations</li>
                    </ul>
                </div>
                <div className='w-full flex flex-col gap-10 cursor-pointer'>
                    <ul className='w-full flex flex-col gap-2'>
                        <li className='text-xl text-blue-800 font-[700]'>Available in:</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Bangalore</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Gurgaon</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Hyderabad</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Delhi</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Mumbai</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Pune</li>
                    </ul>
                    <div className=' w-[90px] flex items-center text-[14px] font-[400] text-[#616469] gap-2 border border-slate-400 rounded-md p-1'>
                        <p>679 cities</p>
                        <FaChevronDown className='mt-1' />
                    </div>
                </div>
                <div className='w-full flex flex-col gap-10 cursor-pointer'>
                    <ul className='w-full flex flex-col gap-2'>
                        <li className='text-xl text-blue-800 font-[700]'>Life at Ecommerce</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Explore with Ecommerce</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Ecommerce News</li>
                        <li className='text-[#616469] text-[16px] font-[400]'>Snackables</li>
                    </ul>
                    <div className='w-full flex flex-col items-start gap-3'>
                        <p className='text-xl text-blue-800 font-[700]'>Social Links</p>
                        <div className='flex items-center text-[18px]  text-[#15191F] gap-4'>
                            <FaLinkedin className='hover:text-blue-800' />
                            <FaInstagram className='hover:text-blue-800' />
                            <FaFacebookF className='hover:text-blue-800'  />
                            <FaPinterest className='hover:text-blue-800'  />
                            <FaXTwitter className='hover:text-blue-800'  />
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-[90%] flex justify-center gap-4 items-center pb-2'>
                <FaCopyright className='text-xl'/>
                <p className='text-[16px]'>Copyright 2024. All rights reserved</p>
            </div>
        </div> 
    )
}

export default Footter