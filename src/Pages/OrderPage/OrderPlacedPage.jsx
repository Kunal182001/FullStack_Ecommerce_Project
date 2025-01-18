import React, { useContext, useState } from 'react'
import Mycontext from '../Mycontext/Mycontext';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const OrderPlacedPage = () => {

    const context = useContext(Mycontext);
    const [isloading, setisloading] = useState(false);
    const history = useNavigate();
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
    useEffect(() => {
        setTimeout(() => {
            context.setorderPlaced(true);
            setisloading(true)
            setTimeout(() => {
                setisloading(false);
                history('/');
            }, 1000)
        },  2000);
    }, [])
    return (
        <div className='w-full h-screen relative flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 '>
            {/* Floating Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top Decorations */}
                <div className="absolute top-8 left-1/4 w-14 h-14 bg-yellow-400 rounded-full opacity-70 animate-float"></div>
                <div className="absolute top-12 right-1/3 w-12 h-12 bg-pink-400 rounded-full opacity-70 animate-float"></div>
                <div className="absolute top-6 left-1/6 w-14 h-14 bg-blue-400 rounded-full opacity-70 animate-float"></div>

                {/* Left Decorations */}
                <div className="absolute top-1/3 left-4 w-16 h-16 bg-green-400 rounded-full opacity-70 animate-float"></div>
                <div className="absolute bottom-1/3 left-6 w-12 h-12 bg-red-400 rounded-full opacity-70 animate-float"></div>
                <div className="absolute bottom-8 left-8 w-14 h-14 bg-purple-400 rounded-full opacity-70 animate-float"></div>

                {/* Right Decorations */}
                <div className="absolute top-8 right-6 w-14 h-14 bg-teal-400 rounded-full opacity-70 animate-float"></div>
                <div className="absolute top-1/2 right-8 w-12 h-12 bg-orange-400 rounded-full opacity-70 animate-float"></div>
                <div className="absolute bottom-1/3 right-10 w-14 h-14 bg-indigo-400 rounded-full opacity-70 animate-float"></div>

                {/* Bottom Decorations */}
                <div className="absolute bottom-12 left-1/3 w-14 h-14 bg-yellow-400 rounded-full opacity-70 animate-float"></div>
                <div className="absolute bottom-8 right-1/4 w-12 h-12 bg-pink-400 rounded-full opacity-70 animate-float"></div>
                <div className="absolute bottom-6 left-1/2 w-14 h-14 bg-green-400 rounded-full opacity-70 animate-float"></div>

                {/* Center Decorations */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-orange-400 rounded-full opacity-70 animate-float"></div>
                <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-teal-400 rounded-full opacity-70 animate-float"></div>
                <div className="absolute top-1/4 right-1/4 w-14 h-14 bg-indigo-400 rounded-full opacity-70 animate-float"></div>
            </div>
            <div className='relative w-[400px] h-[400px] bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-4 animate-pop-in'>
                {/* Icon */}
                <img
                    className='w-30 h-30 animate-pulse-slow'
                    src='https://cdn-icons-png.flaticon.com/128/6811/6811605.png'
                    alt='Order Placed'
                />

                {/* Text */}
                <h1 className='text-3xl font-extrabold text-primary animate-fade-in'>Order Placed!</h1>
                <p className='text-lg text-gray-600 text-center px-4 animate-fade-in'>
                    Thank you for your order. Your package is on the way!
                </p>
            </div>
            {isloading && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
                    <CircularProgress className="text-blue-800" color="inherit" />
                </div>
            )}
        </div>


    )
}

export default OrderPlacedPage