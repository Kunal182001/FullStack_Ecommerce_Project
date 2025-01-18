import React, { useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { RxCross1 } from "react-icons/rx";
import Rating from '@mui/material/Rating';
import { FaMinus } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { CiShoppingCart } from "react-icons/ci";
import Mycontext from '../../Pages/Mycontext/Mycontext';
import CircularProgress from '@mui/material/CircularProgress';
import { CartData, deleteData } from '../Admin/api';
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Productsview = ({ id, src, name, description, techData, brand, categoryname, inStock, rating, oldPrice, newPrice, disCount, open, onclose }) => {

    const [count, setcount] = useState(1);
    const [showMore, setShowMore] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const context = useContext(Mycontext);
    const [cartData, setcartData] = useState({
        productTitle: "",
        image: "",
        size: "",
        rating: 0,
        price: 0,
        sutotal: 0,
        quantity: 0,
        productId: "",
        userID: "",
    })
    const [isloading, setisloading] = useState(false);
    const [isproductadd, setisproductadd] = useState(false);
    const [productadded, setproductadded] = useState(false);
    const [checkforsize, setcheckforsize] = useState(false);
    const [wishlistData, setwishlistData] = useState({
        productTitle: "",
        image: "",
        rating: 0,
        oldprice: 0,
        newPrice: 0,
        disCount: 0,
        productId: "",
        userID: "",
    })
    const [productinwishList, setproductinwishList] = useState(false);
    const [addtowishlist, setaddtowishlist] = useState(false);
    const [removetowishlist, setremovetowishlist] = useState(false);
    const history = useNavigate();


    function handleminus() {
        if (count <= 1) {
            setcount(1);
        }
        else {
            setcount(count => count - 1);
        }
    }
    function handleplus() {
        if (count >= 10) {
            setcount(count);
        }
        else {
            setcount(count => count + 1);
        }
    }
    function handleSize(size) {
        setSelectedSize(size);
    }

    //Image movement

    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle clicking on side images
    const handleImageClick = (index) => {
        setCurrentIndex(index);
    };

    //Add to Cart
    const addtoCart = async () => {

        if (categoryname === 'Fashion' || categoryname === 'Footwear') {
            if (selectedSize == '') {
                setcheckforsize(true);
                return;
            }
            else {
                setcheckforsize(false);
            }
        }
        setisloading(true);
        cartData.productTitle = name
        cartData.image = src[0]
        cartData.size = selectedSize
        cartData.rating = rating
        cartData.price = newPrice
        cartData.sutotal = (newPrice) * count
        cartData.quantity = count
        cartData.productId = id
        cartData.userID = context.userData.userID
        await CartData("/api/Cart/add", cartData)
            .then(res => {
                if (res.status === 200) {
                    // Product successfully added
                    setTimeout(() => {
                        setisloading(false);
                        setproductadded(true);
                        setTimeout(() => {
                            setproductadded(false);
                        }, 1000)
                    }, 500);
                }
                else if (res.status === 201) {
                    // Product already added to cart
                    setisproductadd(true);
                    setTimeout(() => {
                        setisproductadd(false);
                        setisloading(false);
                    }, 1500);
                } else {
                    // Handle other response statuses (not 200 or 409)
                    setisloading(false);
                }
            })
            .catch(err => {
                if (err.response) {
                    console.error('Error during CartData request:', err.response);
                } else {
                    console.error('Network error or unknown error:', err);
                }
                setisloading(false)
            });


    }
    const checkforlogin =()=>{
        history('/signin')
      }

    //Add to WishList
    const addtoWishlist = async () => {
        setisloading(true);
        wishlistData.productTitle = name
        wishlistData.image = src[0]
        wishlistData.rating = rating
        wishlistData.oldprice = oldPrice
        wishlistData.newPrice = newPrice
        wishlistData.disCount = disCount
        wishlistData.productId = id
        wishlistData.userID = context.userData.userID
        await CartData("/api/Wishlist/add", wishlistData)
            .then(res => {
                if (res.status === 200) {
                    // Product successfully added
                    setTimeout(() => {
                        setisloading(false);
                        setaddtowishlist(true);
                        setproductinwishList(true);
                        setTimeout(() => {
                            setaddtowishlist(false);
                        }, 1000)
                    }, 500);
                }
                else if (res.status === 201) {
                    // Product already added to WishList
                    setTimeout(() => {
                        setisloading(false);
                    }, 1500);
                } else {
                    // Handle other response statuses (not 200 or 409)
                    setisloading(false);
                }
            })
            .catch(err => {
                if (err.response) {
                    console.error('Error during CartData request:', err.response);
                } else {
                    console.error('Network error or unknown error:', err);
                }
                setisloading(false)
            });


    }
    //Remove the product From WishList
    const removefromWishList = async () => {
        setisloading(true);
        deleteData(`/api/Wishlist/product/${id}`)
            .then((res) => {
                // "WishList Product Remove successfully."
                setTimeout(() => {
                    setisloading(false);
                    setremovetowishlist(true);
                    setproductinwishList(false);
                    setTimeout(() => {
                        setremovetowishlist(false);
                    }, 1000)
                }, 500);
            })
            .catch((err) => {
                console.error('Failed to delete item:', err.message);
            });
    }



    return (
        <div className="w-screen flex justify-center items-center">
            <Dialog
                open={open}
                onClose={onclose}
                PaperProps={{
                    style: { maxWidth: 'none', width: '90%' }, // Default responsive width
                }}
                className="w-full flex justify-center items-center"
                key={id}
            >
                {/* Preview Card */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-[900px] relative flex flex-col items-start p-6 sm:p-4 md:p-6 lg:p-8"
                >
                    {/* Upper Part */}
                    <div className="w-full flex flex-col items-start border-b-2 border-gray-200 p-2">
                        <div className="w-full flex justify-between items-center">
                            <p className="text-lg sm:text-base md:text-xl font-bold">{name}</p>
                            <RxCross1
                                className="text-xl w-[35px] h-[35px] p-2 rounded-full bg-gray-200 text-black hover:text-white hover:bg-gray-700"
                                onClick={onclose}
                            />
                        </div>
                        <div className="w-full flex justify-start items-start gap-3">
                            <p className="text-sm md:text-[16px] font-bold">Brand: <span className='text-sm md:text-[16px] font-medium'>{brand}</span></p>
                            <Rating name="half-rating" precision={0.5} value={rating} readOnly={true} />
                        </div>
                    </div>

                    {/* Lower Part */}
                    <div className="w-full flex flex-col lg:flex-row justify-between items-center p-3 font-robotoCondensed gap-4 lg:gap-6 border-b-2 border-gray-200">
                        {/* Image Section */}

                        <div className="md:w-[45%] w-full flex flex-col items-center gap-5 p-4">
                            <div className="w-full overflow-hidden relative">
                                <div
                                    className="w-full flex transition-all duration-500 ease-in-out"
                                    style={{
                                        transform: `translateX(-${currentIndex * 100}%)`,
                                    }}
                                >
                                    {src.map((i, index) => (
                                        <img
                                            key={index}
                                            className="w-full  rounded-lg flex-shrink-0 cursor-pointer"
                                            src={i}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="w-full flex justify-center gap-2 mt-4 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
                                <div className="flex gap-2">
                                    {src.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            className={`w-[60px] sm:w-[80px] lg:w-[100px] h-[50px] sm:h-[60px] lg:h-[80px] cursor-pointer rounded-md transition-transform duration-300 hover:scale-110 ${index === currentIndex ? 'border-4 border-blue-500' : 'border'
                                                }`}
                                            onClick={() => handleImageClick(index)}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Details Section */}
                        <div className="md:w-[45%] w-full flex flex-col items-start">
                            <div className='w-full flex flex-col items-start'>
                                <div className="w-full flex justify-start items-center gap-3">
                                    <p className="md:text-2xl sm:text-xl text-black font-extrabold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(newPrice)}</p>
                                    <div className='w-[60px] h-[30px] text-green-800 bg-green-400 bg-opacity-50 flex justify-center items-center'>{`${disCount}% OFF`}</div>
                                </div>
                                <p className='md:text-[16px] sm:text-xl text-slate-500 font-medium'>M.R.P: <span className=" line-through">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(oldPrice)}</span> (Incl. of all taxes)</p>

                            </div>
                            <p className="text-base sm:text-xl text-green-700 font-medium mt-2"><span className='"text-base sm:text-xl text-black font-medium'>In Stock: </span>{inStock}</p>
                            <div className="bg-white rounded-lg shadow-sm mt-5 pb-2">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Product Description</h2>
                                <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                                    {showMore ? description : `${description.split(' ').slice(0, 20).join(' ')}...`}
                                </p>
                                <button
                                    className="text-blue-800 hover:text-blue-900 mt-2 font-medium"
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? "Show Less" : "Read More"}
                                </button>
                            </div>
                            {checkforsize && <p className='text-[16px] text-red-600 mt-2'>Please Select Size for the Product</p>}
                            {categoryname === 'Fashion' ?
                                (
                                    <div className="w-full flex flex-row gap-6 mt-4">
                                        <p className="text-base sm:text-xl font-semibold">SIZE:</p>
                                        <div className="grid grid-cols-4 md:-cols-6 gap-4 items-center">
                                            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                                <p
                                                    key={size}
                                                    style={{
                                                        backgroundColor: selectedSize === size ? '#1E40AF' : '',
                                                        color: selectedSize === size ? 'white' : 'black',
                                                    }}
                                                    onClick={() => handleSize(size)}
                                                    className="border w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] flex justify-center items-center rounded-lg hover:bg-blue-800 hover:text-white cursor-pointer"
                                                >
                                                    {size}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ) :
                                categoryname === 'Footwear' ?
                                    (
                                        <div className="w-full flex flex-row gap-6 mt-4">
                                            <p className="text-base sm:text-xl font-semibold">SIZE:</p>
                                            <div className="grid grid-cols-4 md:-cols-6 gap-4 items-center hover:text-white">
                                                {['3', '4', '5', '6', '7', '9', '11', '12'].map((size) => (
                                                    <p
                                                        key={size}
                                                        style={{
                                                            backgroundColor: selectedSize === size ? '#1E40AF' : '',
                                                            color: selectedSize === size ? 'white' : 'black',
                                                        }}
                                                        onClick={() => handleSize(size)}
                                                        className="border w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] flex justify-center items-center rounded-lg hover:bg-blue-800 hover:text-white  cursor-pointer"
                                                    >
                                                        {size}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                    : (<></>)
                            }
                            <div className="w-full flex justify-start items-center gap-4 mt-5">
                                <div className="w-[45%] flex justify-start gap-4 items-center">
                                    <FaMinus
                                        className="w-[30px] sm:w-[40px] bg-gray-200 h-[30px] sm:h-[40px] rounded-full p-[6px] sm:p-[14px] select-none"
                                        onClick={handleminus}
                                    />
                                    <div
                                        style={{ userSelect: 'none' }}
                                        className="w-[30px] sm:w-[40px] bg-gray-200 flex justify-center items-center h-[30px] sm:h-[40px] rounded-full"
                                    >
                                        {count}
                                    </div>
                                    <TiPlus
                                        className="w-[30px] sm:w-[40px] bg-gray-200 h-[30px] sm:h-[40px] rounded-full p-[6px] sm:p-[14px] select-none"
                                        onClick={handleplus}
                                    />
                                </div>
                                <div onClick={context.isLogin?addtoCart:checkforlogin} className="w-[45%] h-[35px] flex justify-center items-center p-2 gap-1 cursor-pointer rounded-xl bg-blue-700 text-white hover:bg-blue-800">
                                    <CiShoppingCart className="w-[25px] h-[30px] text-white" />
                                    <p className="text-[12px] sm:text-[16px] text-white font-medium">Add To Cart</p>
                                </div>
                                {productinwishList ? (<button onClick={removefromWishList}
                                    className='w-[35px] h-[35px] border-[2px] border-gray-200 p-2 flex justify-center items-center rounded-full' >
                                    <FaHeart className='text-xl font-bold text-blue-800 ' />
                                </button>) :
                                    (<button onClick={context.isLogin?addtoWishlist:checkforlogin}
                                        className='w-[35px] h-[35px] border-[2px] border-gray-200 text-white p-2 flex justify-center items-center rounded-xl'>
                                        <FaHeart className='text-xl font-bold text-gray-400 hover:text-blue-800 ' />
                                    </button>)}
                            </div>
                        </div>


                    </div>
                    {/* Additional Information */}
                    <div className="w-full flex flex-col gap-2 mt-8">
                        <p className='text-3xl text-black font-extrabold mb-5'>Product Information</p>
                        {Object.entries(techData).length > 0 ? (
                            Object.entries(techData).map(([key, value], index) => (
                                <div key={index} className="w-[50%] flex justify-start items-center gap-2 p-2">
                                    <p className=" w-full font-medium text-black text-xl">{key}:</p>
                                    <p className="w-full text-gray-500 text-[16px]">{value}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No technical details for this Product.</p>
                        )}
                    </div>
                </div>
                {isloading && (
                    <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
                        <CircularProgress className="text-blue-800" color="inherit" />
                    </div>
                )}
                {isproductadd && (
                    <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
                        <div className='w-[50%] md:w-[20%] h-[50px] bg-red-600 text-white font-bold text-sm md:text-xl flex justify-center items-center rounded-lg '>
                            <p>Product already added in Cart</p>
                        </div>
                    </div>
                )}
                {productadded && (
                    <div className="fixed inset-0 flex items-center justify-center z-[100] ">
                        <div className='w-[50%] md:w-[20%] h-[50px] absolute bottom-2 left-2 bg-green-600 text-white font-bold text-sm md:text-xl flex justify-center items-center rounded-lg '>
                            <p>Product added in the Cart</p>
                        </div>
                    </div>
                )}
                {addtowishlist && (
                    <div className="fixed inset-0 flex items-center justify-center z-[100] ">
                        <div className='w-[50%] md:w-[20%]h-[50px] absolute bottom-2 left-2 bg-green-600 text-white font-bold text-sm md:text-xl flex justify-center items-center rounded-lg '>
                            <p>Product added in the WishList</p>
                        </div>
                    </div>
                )}
                {removetowishlist && (
                    <div className="fixed inset-0 flex items-center justify-center z-[100] ">
                        <div className='w-[50%] md:w-[20%] h-[50px] absolute bottom-2 left-2 bg-red-600 text-white font-bold text-sm md:text-xl flex justify-center items-center rounded-lg '>
                            <p>Product remove in the WishList</p>
                        </div>
                    </div>
                )}
                {isloading && (
                    <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
                        <CircularProgress className="text-blue-800" color="inherit" />
                    </div>
                )}
            </Dialog>
        </div>

    )
}

export default Productsview