import React, { useContext, useEffect, useRef, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import Rating from '@mui/material/Rating';
import { FaMinus } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { deleteData, fetchData, putData } from '../../Components/Admin/api';
import { NavLink, useParams } from 'react-router-dom';
import Mycontext from '../Mycontext/Mycontext';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { CiShoppingBasket } from "react-icons/ci";

const Cartpage = () => {

    const [cartData, setcartData] = useState([]);
    const context = useContext(Mycontext);
    const history = useNavigate();
    const [isloading, setisloading] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [SubTotal, setsubTotal] = useState(0);
    const [Totalvalue, setTotalvalue] = useState(0);
    const [totaltax, settotaltax] = useState(0);
    const [totalDiscount, settotalDiscount] = useState(0);
    const [updatequantity, setupdatequantity] = useState({
        quantity: 0
    })

    let { id } = useParams();

    // Restore scroll position on page load
    window.addEventListener('load', () => {
        const scrollPosition = localStorage.getItem('scrollPosition');
        if (scrollPosition !== null) {
            window.scrollTo(0, parseInt(scrollPosition,10));
            localStorage.removeItem('scrollPosition');
        }
    });



    const handleminus = (id) => {
        localStorage.setItem('scrollPosition', window.scrollY);
        setQuantities(prev => {
            const newQuantity = prev[id] > 1 ? prev[id] - 1 : 1;
            updatequantity.quantity = newQuantity;
            putData(`/api/Cart/${id}`, updatequantity).then((res) => {
                setisloading(true);
                setTimeout(() => {
                    setisloading(false);
                    window.location.reload();
                }, 500);
            }).catch((err) => {
                console.error('Error updating quantity:', err);
            });

            return {
                ...prev,
                [id]: newQuantity
            };
        });
    };

    const handleplus = (id) => {
        localStorage.setItem('scrollPosition', window.scrollY);
        setQuantities(prev => {
            const newQuantity = prev[id] > 10 ? 10 : prev[id] + 1
            updatequantity.quantity = newQuantity;
            putData(`/api/Cart/${id}`, updatequantity).then((res) => {
                setisloading(true);
                setTimeout(() => {
                    setisloading(false);
                    window.location.reload();
                }, 500);
            }).catch((err) => {
                console.error('Error updating quantity:', err);
            });

            return {
                ...prev,
                [id]: newQuantity
            };
        });

    };


    //Storing the every cart item quantity 
    useEffect(() => {
        if (cartData) {
            const initialQuantities = {};
            let tax = 15;
            let discount = 3;
            cartData.forEach(item => {
                initialQuantities[item._id] = item.quantity || 1; // Default to 1 if not available
                setsubTotal(SubTotal => SubTotal + item?.sutotal);
                setTotalvalue(Totalvalue => Totalvalue + item.sutotal + tax - discount);
                settotaltax(totaltax => totaltax + tax);
                settotalDiscount(totalDiscount => totalDiscount + discount);

            });
            setQuantities(initialQuantities);
        }
    }, [cartData]);
    useEffect(() => {
        if (cartData) {
            const initialQuantities = {};
            let tax = 15;
            let discount = 3;
    
            let calculatedSubTotal = 0;
            let calculatedTotalValue = 0;
            let calculatedTotalTax = 0;
            let calculatedTotalDiscount = 0;
            cartData.forEach(item => {
                initialQuantities[item._id] = item.quantity || 1; // Default to 1 if not available
                calculatedSubTotal += item?.sutotal;
                calculatedTotalValue += item?.sutotal + tax - discount;
                calculatedTotalTax += tax;
                calculatedTotalDiscount += discount;
                
            });
    
            setQuantities(initialQuantities);
            setsubTotal(calculatedSubTotal);
            setTotalvalue(calculatedTotalValue);
            settotaltax(calculatedTotalTax);
            settotalDiscount(calculatedTotalDiscount);
        }
    }, [cartData]);
    
    useEffect(()=>{
        if(context.orderPlaced){
            setcartData([]);
            context.setorderPlaced(false);
        }
    },[context.orderPlaced])
    

    //Check if user do logout from the cartPage then it redirect to the signin page
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            history('/signin');
        }
    }, [context.isLogin])
    //Fetching the Cart data from the api 
    useEffect(() => {
        fetchData(`/api/Cart/?userid=${id}`).then((res) => {
            setcartData(res.cartList);
        })
    }, [])

    const handledeleteCartItem = (cartId) => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
        deleteData(`/api/Cart/${cartId}`).then((res) => {
            setisloading(true);
            setTimeout(() => {
                setisloading(false);
                window.location.reload();
            }, 500)
        })
    }

    return (
        <div className='w-full relative flex justify-center items-center font-robotoCondensed  md:mt-8 mt-[160px]'>
            <div className='w-[80%] flex flex-col items-start'>
                {cartData.length > 0 && <p className='text-3xl font-bold'>My Cart</p>}
                {cartData.length > 0 && <p className='text-[16px] font-medium'>{`There are ${cartData.length} products in your cart.`}</p>}
                <div className='w-full flex flex-col md:flex-row justify-between relative items-center mt-10'>
                    {/* Product add Details */}
                    <div className='w-full md:w-[60%] flex flex-col items-start gap-5 '>
                        {cartData.length > 0 ? (
                            <>
                                {cartData?.map((item, index) => (
                                    <div key={index} className='w-full flex flex-col items-start border-[2px] border-gray-200 p-4 rounded-lg'>
                                        <div className='w-full flex justify-start items-center gap-10'>
                                            <NavLink to={`/product/${item?.productId}`}><img className='w-[200px] h-[200px]  ' src={item?.image} /></NavLink>
                                            <div className='w-full flex flex-col items-start'>
                                                <NavLink to={`/product/${item?.productId}`}>
                                                    <p className='text-xs md:text-[18px] font-bold '>{item?.productTitle.split(" ").length > 6
                                                        ? item?.productTitle.split(" ").slice(0, 6).join(" ") + "..."
                                                        : item?.productTitle}</p>
                                                </NavLink>
                                                <p className="text-xs md:text-[16px] text-black font-semibold mt-2 ">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item?.price)}</p>
                                                <div className='mt-3 '><Rating name="half-rating" precision={0.5} value={item?.rating} readOnly={true} /></div>
                                                {item.size.length > 0 && <p className='text-xs md:text-[18px] font-bold mt-2'>Size :- {item?.size}</p>}
                                                <p className="text-xs md:text-[18px] text-black font-bold mt-2"> SubTotal Price :-  <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item?.sutotal)}</span></p>
                                            </div>
                                        </div>
                                        <div className='w-full flex justify-between items-center p-4 mt-4'>
                                            <div className="w-[45%] flex justify-start gap-4 items-center">
                                                <FaMinus
                                                    className="w-[20px] sm:w-[30px] bg-gray-200 h-[30px] sm:h-[30px] rounded-full p-[6px] sm:p-[10px]  cursor-pointer select-none"
                                                    onClick={() => { handleminus(item?._id) }}
                                                />
                                                <div
                                                    style={{ userSelect: 'none' }}
                                                    className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]  bg-gray-200 flex justify-center items-center    rounded-full"
                                                >
                                                    {quantities[item._id] || 1}
                                                </div>
                                                <TiPlus
                                                    className="w-[20px] sm:w-[30px] bg-gray-200 h-[20px] sm:h-[30px] rounded-full p-[6px] sm:p-[10px] cursor-pointer select-none"
                                                    onClick={() => {
                                                        handleplus(item?._id)
                                                        // handleupdateofCartItem(item?._id)
                                                    }}
                                                />
                                            </div>
                                            <p onClick={() => { handledeleteCartItem(item?._id) }} className='text-[18px] font-bold hover:text-red-800 cursor-pointer select-none'>remove</p>
                                        </div>
                                    </div>
                                ))}

                            </>

                        ) :
                            (
                                <div className='w-full flex flex-col  items-center gap-3 font-robotoCondensed ml-16 md:ml-64 '>
                                    <img src='https://res.cloudinary.com/dptxobcj6/image/upload/v1735497589/11329060_tpbjz5.png' className=' w-full md:w-[40%]' />
                                    <p className='text-xs md:text-xl font-bold'>Looks like you have not added anything to your Cart.Go ahead & explore top categories.</p>
                                    <NavLink to={'/'} className='w-[180px] h-[50px]'>
                                        <button className='w-full h-full bg-blue-800 text-white  p-2 font-bold hover:bg-blue-900 flex justify-center gap-2 items-center rounded-2xl'>
                                            <CiShoppingBasket className='text-2xl' />
                                            <p className='text-xs md:text-[14px]'>RETRUN TO SHOPING</p>
                                        </button>
                                    </NavLink>
                                </div>
                            )}
                    </div>
                    {/* Total Price of All products */}
                    {cartData.length > 0 && <div className='w-full md:w-[30%] md:absolute md:top-1 md:right-1  flex flex-col items-start'>
                        <div className='w-full  flex flex-col items-start border-[2px] border-gray-200 p-5 gap-4 rounded-lg '>
                            <p className='text-xs md:text-[18px] font-bold '>Payment Details</p>
                            <div className='w-full h-[1px] bg-gray-200'></div>
                            <div className='w-full flex justify-between items-center'>
                                <p className='text-xs md:text-[18px] font-bold '>SubTotal</p>
                                <p className="text-xs md:text-[16px] text-black font-semibold mt-2 ">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(SubTotal)}</p>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <p className='text-xs md:text-[18px] font-bold '>Shipping</p>
                                <p className='text-xs md:text-[18px] font-bold text-green-600 '>free</p>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <p className='text-xs md:text-[18px] font-bold '>Platform Tax</p>
                                <p className="text-xs md:text-[16px] text-black font-semibold mt-2 ">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totaltax)}</p>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <p className='text-xs md:text-[18px] font-bold '>Platform Discount</p>
                                <p className="text-xs md:text-[16px] text-black font-semibold mt-2 ">- {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalDiscount)}</p>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <p className='text-xs md:text-[18px] font-bold '>Total</p>
                                <p className="text-xs md:text-[16px] text-black font-semibold mt-2 ">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Totalvalue)}</p>
                            </div>
                        </div>
                        <NavLink to={`/checkout/${id}`} className='w-full ' ><button className='w-full h-[50px] text-white text-xl font-bold bg-blue-800 hover:bg-blue-900 rounded-2xl mt-4'>CheckOut</button></NavLink>
                    </div>}
                </div>
            </div>
            {isloading && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
                    <CircularProgress className="text-blue-800" color="inherit" />
                </div>
            )}
        </div>
    )
}

export default Cartpage