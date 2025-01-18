import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';


const HomeFeature = (props) => {
   
    const [ishover, sethover] = useState(null);
    return (
        <div className="relative w-full flex justify-center items-center mt-16 font-robotoCondensed">
            <div className="w-[90%] flex justify-center items-center">
                <div className="w-full flex flex-col items-start ">
                    <h1 className='text-3xl font-semibold'>Featured Categories</h1>
                    <div className='w-full'>
                        {props?.catData?.length>0?
                        (
                            <div className='w-full grid grid-cols-2 md:grid-cols-8 gap-4 mt-10'>
                                {props.catData?.map((i,index)=>(
                                    <NavLink key={index} to={`/products/view/${i.name}`} className="w-full flex flex-col items-center gap-1">
                                    <div className={`w-[120px] h-[120px] rounded-full bg-blue-800 flex justify-center items-center transition-all duration-300  hover:shadow-bottom-only`}
                                        style={{backgroundColor:i.color}}                                    
                                    >
                                    <img onMouseEnter={()=>{sethover(i._id)}} onMouseLeave={()=>{sethover(null)}} key={i._id} src={i.images} 
                                    className={`w-[70px] h-[70px]  cursor-pointer bg-blue-800 transition-all duration-300  ${ishover===i._id?"animate-bounce-slow":""}`}
                                    style={{backgroundColor:i.color}} />        
                                    </div>
                                    <p className='text-xl font-medium'>{i.name}</p>
                                </NavLink>
                                ))}
                            </div>
                        ):(
                            <div className='w-full grid grid-cols-2 md:grid-cols-8 gap-4 mt-10'>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className='w-full flex flex-col items-center gap-2'>
                                    <div className="animate-pulse w-[120px] h-[120px] bg-gray-300 border-gray-200 rounded-full p-4 shadow-sm"></div>
                                    <div className="animate-pulse w-[80px] h-5 bg-gray-300 rounded mb-4"></div>
                                </div>
                            ))}
                        </div>
                        )}

                       

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeFeature