import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchData } from '../../Components/Admin/api';

const UserOrderpage = () => {

    const { id } = useParams();
    const [userOrderData, setuserOrderData] = useState([]);
    useEffect(() => {
        fetchData(`/api/Order/?userid=${id}`)
            .then((res) => {
                setuserOrderData(res.OrderList)
            })
    }, [])
    return (
        <div className='w-full relative flex justify-center items-center font-robotoCondensed md:mt-8 mt-[180px]'>
            <div className='w-[90%] flex flex-col items-start'>
                <p className='text-3xl font-extrabold'>Your Order</p>
                <div className='w-full flex flex-col items-start mt-5 gap-5'>
                    {/* Order Box */}
                    {userOrderData?.length > 0 ?
                        (
                            <>
                                {userOrderData?.map((item, index) => (
                                    <div key={index} className='w-full flex flex-col items-start border-[2px] border-gray-200 rounded-lg p-4'>
                                        {/* Upper Box */}
                                        <div className='w-full flex justify-between items-center '>
                                            <p className='text-[14px] md:text-xl font-bold'>OrderID : <span className='font-semibold cursor-pointer'> {item?._id}</span></p>
                                            <div className='w-fit h-[40px]  flex justify-between items-center gap-5'>
                                                {item?.paymentType==='Cash' ? (<img src='https://cdn-icons-png.flaticon.com/128/3938/3938205.png' className='w-[30px] h-[30px] ' />) : (<img src='https://cdn.iconscout.com/icon/free/png-256/free-razorpay-logo-icon-download-in-svg-png-gif-file-formats--payment-gateway-brand-logos-icons-1399875.png?f=webp' className='w-[60px] h-[70px] ' />)}
                                                <p className='text-[16px] font-bold text-green-600'>Delivered</p>
                                            </div>
                                        </div>
                                        <p className='text-xl font-bold mt-4'>{item?.name}</p>
                                        <div className='w-full flex flex-col items-start gap-4 mt-4'>
                                            {item?.products?.length > 0 && item?.products?.map((i, j) => (
                                                <div key={j} className='w-full md:w-[70%] flex md:flex-row flex-col justify-start items-center gap-5 border-[2px] border-gray-200 rounded-lg p-4'>
                                                    <img className='w-[200px] h-[200px]' src={i?.image} />
                                                    <div className='w-full flex flex-col items-start'>
                                                        <p className='text-xl font-semibold'>{i?.productTitle}</p>
                                                        {i.size.length > 0 ? <p className='text-[16px] font-bold'>Size :<span className='font-normal cursor-pointer'> {i?.size}</span></p> : <p></p>}
                                                        <p className='text-[16px] font-bold'>Quantity :<span className='font-normal cursor-pointer'> {i?.quantity}</span></p>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <p className='text-[16px] font-bold'>Price :<span className='font-semibold cursor-pointer'> {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(i?.price)}</span></p>
                                                            <p className='text-[16px] font-bold'>SubTotal Amount :<span className='font-semibold cursor-pointer'> {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(i?.sutotal)}</span></p>
                                                        </div>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='w-full md:w-[70%] flex justify-between items-center gap-5 mt-4'>
                                            <p className='text-[14px] md:text-xl font-bold'>PaymentID :<span className='font-normal cursor-pointer'>{item?.PaymentID}</span></p>
                                            <p className='text-[14px] md:text-xl font-bold'>Total Amount :<span className='font-semibold cursor-pointer'> {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format((item?.amount)/100)}</span></p>
                                            <p className='text-[14px] md:text-xl font-bold'>Date :<span className='font-normal'>{new Date(item?.date).toLocaleDateString()}</span></p>
                                        </div>
                                        <p className='text-[14px] md:text-xl font-bold mt-4'>Address :<span className='font-normal cursor-pointer'>{item?.address}</span></p>
                                    </div>
                                ))}
                            </>
                        )
                        : (<></>)}


                </div>
            </div>
        </div>
    )
}

export default UserOrderpage