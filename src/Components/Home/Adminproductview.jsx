import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { RxCross1 } from "react-icons/rx";
import Rating from '@mui/material/Rating';

const Adminproductview = ({ id, src, name, description, techData, brand, categoryname, inStock, rating, oldPrice, newPrice, disCount, open, onclose }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle clicking on side images
    const handleImageClick = (index) => {
        setCurrentIndex(index);
    };


    return (
        <div className="w-screen flex justify-center items-center">
            <Dialog
                open={open}
                onClose={onclose}
                PaperProps={{
                    style: { maxWidth: 'none', width: '99%' }, // Default responsive width
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
                                            className="w-full object-cover rounded-lg flex-shrink-0 cursor-pointer"
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
                                    <p className="md:text-2xl sm:text-xl text-black font-extrabold">{`Rs:${newPrice}.00`}</p>
                                    <div className='w-[60px] h-[30px] text-green-800 bg-green-400 bg-opacity-50 flex justify-center items-center'>{`${disCount}% OFF`}</div>
                                </div>
                                <p className='md:text-[16px] sm:text-xl text-slate-500 font-medium'>M.R.P: <span className=" line-through">{`Rs.${oldPrice}  `}</span> (Incl. of all taxes)</p>
                                
                            </div>

                            <p className="text-base sm:text-xl text-green-700 font-medium mt-2"><span className='"text-base sm:text-xl text-black font-medium'>In Stock: </span>{inStock}</p>
                            <p className="text-base sm:text-xl text-black font-semibold mt-2">Category of Product: <span className='"text-base sm:text-xl text-gray-600 font-medium'>{categoryname}</span></p>
                            <p className='text-xl text-black font-bold mt-2'>Product Description</p>
                            <p className="text-sm sm:text-[16px] mt-2">
                                {description}
                            </p>

                        </div>

                    </div>
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
            </Dialog>
        </div>
    )
}

export default Adminproductview