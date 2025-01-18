import React, { useContext, useEffect, useState } from 'react';
import Mycontext from '../Mycontext/Mycontext';
import logoimg from '../../assets/logo.png'
import TextField from '@mui/material/TextField';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { postData, userData } from '../../Components/Admin/api';
import CircularProgress from '@mui/material/CircularProgress';
import OTPbox from '../../Components/OTPbox/OTPbox'

const VerifyotpPage = () => {
    const [isloading, setisloading] = useState(false);
    const context = useContext(Mycontext)
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const history = useNavigate();
    

    const handleOtpComplete = (inputOtp) => {
        setOtp(inputOtp);
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        try {
            const obj={
                otp:otp,
                email:localStorage.getItem('userEmail')
            }
            const response = await postData('/api/User/verifyemail', obj);
            setisloading(true);
            localStorage.removeItem('userEmail')
            setTimeout(() => {
                history('/signin')
                setisloading(false);
            }, 2000);
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);

            } else {
                setError("An unknown error occurred. Please try again.");
            }
        }
    }


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
    }, [context]);
    return (
        <div className=" w-full h-screen relative flex justify-center items-center bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-100 ">
            <div className='w-[90%] md:w-[37%] relative  bg-white rounded-xl flex flex-col items-center p-4 '>

                <img src={logoimg} className='w-[90px] h-[60px]' />
                <form onSubmit={verifyOTP} className='w-full relative flex flex-col items-start font-robotoCondensed p-5 gap-4'>
                    {error && <div className="w-full text-red-500">{error}</div>}
                    <div className='w-full flex justify-center items-center'>
                        <img className='w-[400px] h-[400px]' src='https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg?ga=GA1.1.131078061.1733081900&semt=ais_hybrid' />
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <p className='text-xl font-medium '>OTP hass been Sent to <span className='font-bold'>{localStorage.getItem('userEmail')}</span></p>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <OTPbox length={6} onComplete={handleOtpComplete} />
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <button type='submit' className='w-[100px] h-[50px]  text-[18px] bg-blue-800 font-semibold rounded-2xl text-white flex justify-center items-center hover:bg-blue-900'>
                            submit
                        </button>
                    </div>
                </form>
            </div>
            {isloading && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
                    <CircularProgress className="text-blue-800" color="inherit" />
                </div>
            )}
        </div>
    )
}

export default VerifyotpPage