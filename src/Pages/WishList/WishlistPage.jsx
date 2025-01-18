import React, { useEffect, useState } from 'react'
import { deleteData, fetchData } from '../../Components/Admin/api';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { RxCross1 } from "react-icons/rx";
import CircularProgress from '@mui/material/CircularProgress';

const WishlistPage = () => {
    let { id } = useParams();
    const [wishlistData, setwishlistData] = useState([]);
    const [isloading, setisloading] = useState(false);
    const history =useNavigate();

    useEffect(() => {
        fetchData(`/api/Wishlist/?userid=${id}`)
            .then(res => {
                setwishlistData(res.WishList)
            }).catch((err) => {
                console.error('Failed to delete item:', err.message);
            });
    }, [])

    const handleremovefromwihsList = (productID) => {
        setisloading(true);
        console.log(productID)
        deleteData(`/api/Wishlist/product/${productID}`)
            .then((res) => {
                // "WishList Product Remove successfully."
                setTimeout(() => {
                    setisloading(false);
                    window.location.reload();
                }, 500);
                
            })
            .catch((err) => {
                console.error('Failed to delete item:', err.message);
            });
    }

    const handleshowNow=()=>{
        history('/');
    }
    return (
        <div className='w-full relative flex justify-center items-center font-robotoCondensed md:mt-8 mt-[160px]'>
            <div className='w-[98%] md:w-[80%] flex flex-col items-start'>
                <p className='text-3xl font-extrabold'>Your favourited products</p>
                {/* Main Box & data show in grid */}
                {wishlistData.length > 0 ? (
                    <>
                        <div className='w-full relative mt-5 md:p-2 grid grid-cols-2 md:grid-cols-4 gap-4'>
                            {wishlistData.map((item, index) => (
                                <div key={index} className='w-full h-[430px] border-[2px] border-gray-200 rounded-xl flex flex-col items-start p-4 relative'>
                                    <NavLink to={`/product/${item?.productId}`}><img src={item.image} className='w-[150] md:w-[250px] p-2 mt-3 h-[200px] md:h-[250px] ' /></NavLink>
                                    <NavLink to={`/product/${item?.productId}`}><p className="text-xl font-semibold mt-2">{item?.productTitle.split(" ").length > 3
                                        ? item?.productTitle.split(" ").slice(0, 3).join(" ") + "..."
                                        : item?.productTitle}</p>
                                    </NavLink>
                                    <Rating name="half-rating" className='mt-2' precision={0.5} value={item?.rating || 4} readOnly={true} />
                                    <div className='w-[60px] h-[30px] md:h-[25px] text-green-800 mt-3 text-[10px] md:text-[14px] font-bold bg-green-400 bg-opacity-50 flex justify-center items-center'>{`${item?.disCount}% OFF`}</div>
                                    <div className='w-full flex justify-start items-center gap-2 mt-2'>
                                        <p className="md:text-xl text-[12px] text-black font-extrabold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item?.newPrice)}</p>
                                        <span className=" line-through">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item?.oldprice)}</span>
                                    </div>
                                    <RxCross1 onClick={()=>{handleremovefromwihsList(item?.productId)}} className='text-xl absolute top-2 right-2 text-blue-800 cursor-pointer' />
                                </div>
                            ))}
                        </div>
                    </>) :
                    (
                    <div className='w-full flex justify-center items-center'>
                        <div className='w-[80%] flex flex-col items-center p-2 gap-4 mt-20'>
                        <img className='w-[200px] h-[220px] ml-10' src='https://res.cloudinary.com/dptxobcj6/image/upload/v1736781125/2037366_pua2hk.png'/>
                        <p className='text-xl font-bold '>Your WishList is empty!</p>
                        <p className='text-[18px] font-semibold text-blue-800'>Seems like you don't have wishes here.</p>
                        <p className='text-[18px] font-semibold text-blue-800'>Make a Wish!</p>
                        <button onClick={handleshowNow} className='w-[100px] h-[50px] bg-blue-800 text-white hover:bg-blue-900 font-bold rounded-lg'>Shop Now</button>
                        </div>
                    </div>)}

            </div>
            {isloading && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
                    <CircularProgress className="text-blue-800" color="inherit" />
                </div>
            )}
        </div>
    )
}

export default WishlistPage