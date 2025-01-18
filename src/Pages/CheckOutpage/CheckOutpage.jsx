import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Mycontext from '../Mycontext/Mycontext';
import states from '../../data/indianstates.json'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { fetchData, postData } from '../../Components/Admin/api';


const CheckOutpage = () => {
    let { id } = useParams();
    const history=useNavigate();
    const context = useContext(Mycontext);
    const [query, setQuery] = useState("");
    const filterlocation = states.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
    const [checkoutData, setcheckoutData] = useState({
        Fullname: '',
        state: '',
        email: '',
        phonenumber: 0,
        houseaddress: '',
        apartmentnumber: '',
        Town: '',
        pincode: 0,
        userID: ''
    })
    const [quantities, setQuantities] = useState({});
    const [userState, setuserState] = useState('');
    const [cartData, setcartData] = useState([]);
    const [SubTotal, setsubTotal] = useState(0);
    const [Totalvalue, setTotalvalue] = useState(0);
    const [totaltax, settotaltax] = useState(0);
    const [totalDiscount, settotalDiscount] = useState(0);
    const [cashondelivery, setcashondelivery] = useState(false);
    const RAZORPAY_KEY = import.meta.env.VITE_RAZOR_PAY_KEY;
    const RAZORPAY_KEY_SECRET = import.meta.env.VITE_RAZOR_PAY_KEY_SECERT;

    useEffect(() => {
        checkoutData.state = userState;
    }, [userState])

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


    //Check if user do logout from the cartPage then it redirect to the signin page
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            history('/signin');
        }
    }, [context.isLogin])

    //Fetching the Cart data from the api 
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        checkoutData.Fullname=user?.name;
        checkoutData.email=user?.emal;
        checkoutData.phonenumber=user?.userPhone;
        checkoutData.houseaddress=localStorage.getItem('Address');
        fetchData(`/api/Cart/?userid=${id}`).then((res) => {
            setcartData(res.cartList);
        })
    }, [])
    const generateRandomID=(length = 10)=> {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomID = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomID += characters[randomIndex];
        }
        return randomID;
    }




    const handlestateselect = (e) => {
        setuserState(e.target.value);
        checkoutData.state = e.target.value;
    }

    const onChangeInput = (e) => {
        setcheckoutData(() => ({
            ...checkoutData,
            [e.target.name]: e.target.value
        }))
    }

    const handlecheckoutsubmit = (e) => {
        e.preventDefault();
        checkoutData.userID = id;
        if (cashondelivery) {
            const Address = {
                name: checkoutData.Fullname,
                phoneNumber: checkoutData.phonenumber,
                address: checkoutData.houseaddress + " "+checkoutData.apartmentnumber,
                pincode: checkoutData.pincode,
                date: new Date().toLocaleString(
                    'en-US',
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }
    
            const payLoad = {
                name: Address.name,
                phoneNumber: Address.phoneNumber,
                paymentType:"Cash",
                address: Address.address,
                pincode: Address.pincode,
                amount: parseInt(Totalvalue * 100),
                PaymentID: "Cash_"+generateRandomID(11),
                email: checkoutData.email,
                userID: id,
                products: cartData,
            }
            postData(`/api/Order/create`,payLoad).then((res)=>{
                history('/ordersuccess');
            })
            return;
        }
        else{
            handleRazarPay();
        }
       

       

    }

    //Handle Cash On Delivery
    const handlecashondelivery = () => {
        if (cashondelivery) {
            setcashondelivery(false);
        }
        else {
            setcashondelivery(true);
        }
    }

    //Handle RazorPay
    const handleRazarPay = () => {
        const Address = {
            name: checkoutData.Fullname,
            phoneNumber: checkoutData.phonenumber,
            address: checkoutData.houseaddress + " "+checkoutData.apartmentnumber,
            pincode: checkoutData.pincode,
            date: new Date().toLocaleString(
                'en-US',
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }

        var options = {
            key: RAZORPAY_KEY,
            key_secret:RAZORPAY_KEY_SECRET,
            amount: parseInt(Totalvalue * 100),
            currency: "INR",
            order_receipt: 'order_rcptid_' + checkoutData.Fullname,
            name: 'E-BHARAT',
            decription: 'For testing of Project',
            handler: function (respose) {
                const PaymentID = respose.razorpay_payment_id
                const payLoad = {
                    name: Address.name,
                    phoneNumber: Address.phoneNumber,
                    paymentType:"Online",
                    address: Address.address,
                    pincode: Address.pincode,
                    amount: parseInt(Totalvalue * 100),
                    PaymentID: PaymentID,
                    email: checkoutData.email,
                    userID: id,
                    products: cartData,
                }
                postData(`/api/Order/create`,payLoad).then((res)=>{
                    history('/ordersuccess');
                })
            },
            theme: {
                color: "#1E40AF"
            }
            
        };
        
        var pay = new window.Razorpay(options);
        pay.open();
    }


    return (
        <div className='w-full relative flex justify-center items-center font-robotoCondensed mt-8'>
            <div className='w-[80%] flex flex-col items-start'>
                <form onSubmit={handlecheckoutsubmit} className='w-full flex justify-between relative items-center mt-10'>
                    <div  className='w-[60%] p-5 flex flex-col gap-4 items-start border-[2px] border-gray-200'>
                        <p className='text-2xl font-bold'>Billing Details</p>
                        {/* FUll Name */}
                        <TextField name='Fullname' onChange={onChangeInput}  value={checkoutData?.Fullname} className='w-full text-xl'
                            label="Full Name" required={true} variant="outlined" />
                        {/* Phone Number & Email Address */}
                        <div className='w-full flex justify-center items-center gap-5'>
                            <TextField name='email' onChange={onChangeInput} className='w-full text-xl'
                                label="Email Address " required={true} variant="outlined" value={checkoutData?.email}  />
                            <TextField name='phonenumber' onChange={onChangeInput} className='w-full text-xl no-spinner '
                                label="Phone Number " type='number' required={true} variant="outlined" value={checkoutData?.phonenumber}  />
                        </div>
                        {/* Address */}
                        <div className='w-full flex flex-col items-start gap-4'>
                            <p className='text-[18px] font-semibold'>Address</p>
                            <TextField name='houseaddress' onChange={onChangeInput} className='w-full text-xl'
                                label="House Number & Street Name" required={true} variant="outlined" value={checkoutData?.houseaddress} />
                            <TextField name='apartmentnumber' onChange={onChangeInput} className='w-full text-xl'
                                label="Apartment, Suite, unit & etc... " required={true} variant="outlined" />
                        </div>
                        {/* STATE */}
                        <p className='text-xl font-semibold'>State</p>
                        <Select

                            value={checkoutData.state}
                            label="State"
                            inputProps={{ 'aria-label': 'without label' }}
                            className="w-full text-black"
                            onChange={handlestateselect}
                            required={true}
                            aria-placeholder='State'
                        >
                            {/* Default Menu Item */}
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            {/* Dynamically Rendered Categories */}
                            {filterlocation?.length > 0 ? (
                                filterlocation?.map((item, index) => (
                                    <MenuItem value={item.name} key={index}>
                                        {item.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="" disabled>
                                    No State Available
                                </MenuItem>
                            )}
                        </Select>
                        {/* TOWN / CITY */}
                        <TextField name='Town' onChange={onChangeInput} className='w-full text-xl'
                            label="Town / City " variant="outlined" required={true} />
                        {/* PINCODE */}
                        <TextField name='pincode' onChange={onChangeInput} className='w-full text-xl no-spinner '
                            label="PinCode / ZipCode" type='number' variant="outlined" required={true} />



                    </div>
                    {/* Total Price of All products */}
                    {cartData.length > 0 && <div className='w-[35%] absolute top-1 right-1  flex flex-col items-start'>
                        <div className='w-full  flex flex-col items-start border-[2px] border-gray-200 p-5 gap-4 rounded-lg '>
                            <p className='text-xs md:text-[18px] font-bold '>Payment Details</p>
                            <div className='w-full h-[1px] bg-gray-200'></div>
                            <div className='w-full flex flex-col items-start gap-2'>
                                <div className='w-full flex justify-between items-center'>
                                    <p className='text-xs md:text-[18px] font-bold '>Product</p>
                                    <p className='text-xs md:text-[18px] font-bold '>Price</p>
                                </div>
                                {cartData?.map((product, index) => (
                                    <div className='w-full flex justify-between items-center'>
                                        <p className='w-[60%] text-xs md:text-[18px] font-medium leading-6 '>{product?.productTitle.length > 20
                                            ? product?.productTitle.slice(0, 20) + '....' : product?.productTitle}
                                            <b> x </b>{product?.quantity}</p>
                                        <p className="text-xs md:text-[16px] text-black font-medium mt-2 ">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product?.sutotal)}</p>
                                    </div>
                                ))}
                            </div>
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
                        <div className='w-full flex justify-center items-start border-[2px] border-gray-200 p-5 mt-4 rounded-lg '>
                            <div onClick={handlecashondelivery} className='w-full flex justify-start items-center gap-2'>
                                <div className={`w-5 h-5 rounded-full border-[2px] border-gray-200 hover:bg-blue-800 transition-all duration-100 ease-in-out ${cashondelivery ? 'bg-blue-800' : 'bg-white'}`}></div>
                                <p>Cash On Delivery</p>
                            </div>
                            <div onClick={()=>{setcashondelivery(false)}} className='w-full flex justify-start items-center gap-2'>
                                <div className={`w-5 h-5 rounded-full border-[2px] border-gray-200 hover:bg-blue-800 transition-all duration-100 ease-in-out ${!cashondelivery ? 'bg-blue-800' : 'bg-white'}`}></div>
                                <p>Pay Using Razorpay</p>
                            </div>
                        </div>
                        <div className='w-full flex justify-center items-center gap-4 mt-5'>

                            <button type='submit'
                                className='w-[200px] h-[50px] flex justify-center text-xl items-center text-white font-bold bg-blue-800 hover:bg-blue-900 rounded-xl'>
                                Place Order</button>

                            <NavLink to={`/cart/view/${id}`} className='w-[200px] h-[50px]'>
                                <button
                                    className='w-full h-full flex justify-center text-xl items-center text-blue-800 font-bold border-[2px] border-blue-800 rounded-xl'>
                                    Cancel Order</button>
                            </NavLink>
                        </div>
                    </div>}
                </form>
            </div>
        </div>
    )
}

export default CheckOutpage