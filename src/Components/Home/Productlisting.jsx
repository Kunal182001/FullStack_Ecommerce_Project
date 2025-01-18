import React, { useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import Productcards from './Productcards';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { fetchData } from '../Admin/api';
import { NavLink } from 'react-router-dom';

const Productlisting = () => {

    const featureimg = [
        {
            id: 1,
            src: "https://rukminim2.flixcart.com/image/612/612/xif0q/coffee/q/f/p/-original-imahyvuvyg2pjeuf.jpeg?q=70",
            name: "Product 1",
            inStock: true,
            oldPrice: 100,
            newPrice: 80,
            rating: 4.5,
        },
        {
            id: 2,
            src: "https://rukminim2.flixcart.com/image/612/612/xif0q/coffee/q/f/p/-original-imahyvuvyg2pjeuf.jpeg?q=70",
            name: "Product 2",
            inStock: false,
            oldPrice: 150,
            newPrice: 120,
            rating: 3.8,
        },
        {
            id: 3,
            src: "https://rukminim2.flixcart.com/image/612/612/xif0q/coffee/q/f/p/-original-imahyvuvyg2pjeuf.jpeg?q=70",
            name: "Product 3",
            inStock: true,
            oldPrice: 200,
            newPrice: 170,
            rating: 4.2,
        },
        {
            id: 4,
            src: "https://rukminim2.flixcart.com/image/612/612/xif0q/coffee/q/f/p/-original-imahyvuvyg2pjeuf.jpeg?q=70",
            name: "Product 4",
            inStock: true,
            oldPrice: 250,
            newPrice: 230,
            rating: 3.9,
        },
        {
            id: 5,
            src: "https://rukminim2.flixcart.com/image/612/612/xif0q/coffee/q/f/p/-original-imahyvuvyg2pjeuf.jpeg?q=70",
            name: "Product 5",
            inStock: false,
            oldPrice: 300,
            newPrice: 280,
            rating: 4.7,
        },
        {
            id: 6,
            src: "https://rukminim2.flixcart.com/image/612/612/xif0q/coffee/q/f/p/-original-imahyvuvyg2pjeuf.jpeg?q=70",
            name: "Product 6",
            inStock: true,
            oldPrice: 120,
            newPrice: 90,
            rating: 3.6,
        },
        {
            id: 7,
            src: "https://rukminim2.flixcart.com/image/612/612/xif0q/coffee/q/f/p/-original-imahyvuvyg2pjeuf.jpeg?q=70",
            name: "Product 7",
            inStock: true,
            oldPrice: 180,
            newPrice: 150,
            rating: 4.8,
        },
        {
            id: 8,
            src: "https://rukminim2.flixcart.com/image/612/612/xif0q/coffee/q/f/p/-original-imahyvuvyg2pjeuf.jpeg?q=70",
            name: "Product 8",
            inStock: false,
            oldPrice: 220,
            newPrice: 190,
            rating: 3.4,
        },
        {
            id: 9,
            src: "https://rukminim2.flixcart.com/image/612/612/xif0q/coffee/q/f/p/-original-imahyvuvyg2pjeuf.jpeg?q=70",
            name: "Product 9",
            inStock: true,
            oldPrice: 140,
            newPrice: 120,
            rating: 4.1,
        },
        {
            id: 10,
            src: "https://rukminim2.flixcart.com/image/612/612/xif0q/coffee/q/f/p/-original-imahyvuvyg2pjeuf.jpeg?q=70",
            name: "Product 10",
            inStock: true,
            oldPrice: 400,
            newPrice: 350,
            rating: 4.9,
        },
    ];


    const sliderRef = useRef(null);

    // Scroll Left Function
    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    // Scroll Right Function
    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const sliderRef1 = useRef(null);

    // Scroll Left Function
    const scrollLeft1 = () => {
        if (sliderRef1.current) {
            sliderRef1.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    // Scroll Right Function
    const scrollRight1 = () => {
        if (sliderRef1.current) {
            sliderRef1.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };


    //Fetching all Products
    const [Popularproducts, setPopularproducts] = useState([]);
    const [NewProduct, setNewProduct] = useState([]);
    const [Featuredproduct, setFeaturedproduct] = useState([]);
    const [allproduct, setallproduct] = useState([]);
    const [bestSeller, setbestSeller] = useState([]);
    const [allElectronicspro,setallElectronicspro] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData("/api/products?all=true").then(res => {
            setallproduct(res.allproductlist);
            const bestproduct = res.allproductlist.filter((product) => product.rating >= 4);
            setbestSeller(bestproduct);
        })
        fetchData(`/api/products?product=Featured`).then(res => {
            setFeaturedproduct(res.filterProduct.sort(() => 0.5 - Math.random()));
        });
        fetchData(`/api/products?product=New`).then(res => {
            setNewProduct(res.filterProduct.sort(() => 0.5 - Math.random()));
        });
        fetchData(`/api/products?product=Popular`).then(res => {
            setPopularproducts(res.filterProduct.sort(() => 0.5 - Math.random()));
        });
        fetchData(`/api/products?product=Electronics`).then(res => {
            setallElectronicspro(res.filterProduct.sort(() => 0.5 - Math.random()));
        });
    }, [])



    return (
        <div className="w-full  relative mt-10 flex flex-col justify-center items-center">
            <div className='w-[90%] relative flex justify-between items-start'>
                {/* Side ADS */}
                <div className='sticky top-[10px] w-[20%] hidden  md:flex flex-col items-center p-4 gap-5 cursor-pointer'>
                    <img className='w-full  rounded-md' src="https://res.cloudinary.com/dptxobcj6/image/upload/v1734271537/sidebanner_oai3fm.png" />
                    <img className='w-full  rounded-md' src="https://res.cloudinary.com/dptxobcj6/image/upload/v1736540263/D-UHP1.0-06122024-Winterwear-Superdry-Asos-Min30_tqluls.jpg" />
                </div>
                {/* products listings*/}

                <div className='w-full md:w-[79%] flex flex-col items-start'>
                    {/* Popular Products */}
                    <div className='w-full  flex flex-col items-start font-robotoCondensed'>
                        <div className='w-full flex justify-between items-center'>
                            <div className='flex flex-col items-start gap-1 cursor-pointer'>
                                <p className='text-2xl font-bold'>Popular Products</p>
                                <p className='text-[14px] text-slate-500'>Do not miss the current offers until the end of December.</p>
                            </div>
                            <NavLink to='/products/view/Popular'>
                            <button className='flex justify-between items-center text-xl font-semibold cursor-pointer hover:text-blue-800 border border-slate-500 border-opacity-30 rounded-2xl p-2'>
                                    <p className='text-[14px] pl-2'>View All</p>                              
                                <MdKeyboardArrowRight />
                            </button>
                            </NavLink>
                        </div>
                        <div className="w-full relative mt-4 ">

                            <div ref={sliderRef1} className="w-full relative flex flex-row gap-4 overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent pb-4">

                                {Popularproducts?.length >0 ?(<>
                                    {Popularproducts.slice(0, 15)?.map((pop, index) => (
                                    <Productcards key={pop._id}
                                        id={pop._id}
                                        src={pop.images}
                                        name={pop.name}
                                        description={pop.discription}
                                        techData={pop.techData}
                                        brand={pop.brand}
                                        categoryname={pop.category.name}
                                        inStock={pop.countInstock}
                                        oldPrice={pop.oldprice}
                                        newPrice={pop.newPrice}
                                        disCount={pop.disCount}
                                        rating={pop.rating} />
                                ))}
                                </>):(<>
                                {
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="animate-pulse w-full h-[250px] bg-white border border-gray-200 rounded-md p-4 shadow-sm"
                                        >
                                            <div className="h-40 bg-gray-300 rounded mb-4"></div>
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                        </div>
                                    ))
                                }
                                </>)}

                            </div>
                            <MdKeyboardArrowLeft
                                onClick={scrollLeft}
                                className="w-[35px] h-[35px] text-black  absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white" />
                            <MdKeyboardArrowRight
                                onClick={scrollRight}
                                className="w-[35px] h-[35px] text-black absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white"
                            />
                            <MdKeyboardArrowLeft
                                onClick={scrollLeft1}
                                className="w-[35px] h-[35px] text-black  absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white" />
                            <MdKeyboardArrowRight
                                onClick={scrollRight1}
                                className="w-[35px] h-[35px] text-black absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white"
                            />

                        </div>

                    </div>
                    {/* New Arivals products */}
                    <div className='w-full  flex flex-col mt-5 items-start font-robotoCondensed'>
                        <div className='w-full flex justify-between items-center'>
                            <div className='flex flex-col items-start gap-1 cursor-pointer'>
                                <p className='text-2xl font-bold'>New Products</p>
                                <p className='text-[14px] text-slate-500'>Do not miss the current offers until the end of December.</p>
                            </div>
                            <NavLink to='/products/view/New'>
                            <button className='flex justify-between items-center text-xl font-semibold cursor-pointer hover:text-blue-800 border border-slate-500 border-opacity-30 rounded-2xl p-2'>                               
                                    <p className='text-[14px] pl-2'>View All</p>                               
                                <MdKeyboardArrowRight />
                            </button>
                            </NavLink>
                        </div>
                        <div className='w-full relative grid grid-cols-2 md:grid-cols-4 gap-4 mt-5'>

                        {NewProduct?.length >0 ?(<>
                                    {NewProduct.slice(0, 15)?.map((pop, index) => (
                                    <Productcards key={pop._id}
                                        id={pop._id}
                                        src={pop.images}
                                        name={pop.name}
                                        description={pop.discription}
                                        techData={pop.techData}
                                        brand={pop.brand}
                                        categoryname={pop.category.name}
                                        inStock={pop.countInstock}
                                        oldPrice={pop.oldprice}
                                        newPrice={pop.newPrice}
                                        disCount={pop.disCount}
                                        rating={pop.rating} />
                                ))}
                                </>):(<>
                                {
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="animate-pulse w-full h-[250px] bg-white border border-gray-200 rounded-md p-4 shadow-sm"
                                        >
                                            <div className="h-40 bg-gray-300 rounded mb-4"></div>
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                        </div>
                                    ))
                                }
                                </>)}
                        </div>
                    </div>
                    {/* Banners */}
                    <div className='w-full  flex justify-between items-center mt-8 pb-8'>
                        <img className='w-[32%] h-[250px]  cursor-pointer  rounded-xl' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9tPWkiHPgTvy6vvjFQHbj0kAcxqlIaViyQ&s" />
                        <img className='w-[32%] h-[250px] cursor-pointer  rounded-xl' src="https://img.freepik.com/free-vector/laundry-cosmetics-sale-realistic-advertisement_52683-16432.jpg?semt=ais_hybrid" />
                        <img className='w-[32%] h-[250px]  cursor-pointer rounded-xl' src="https://i.pinimg.com/236x/4f/30/44/4f304406f73d180e4813e8338a5f5089.jpg" />
                    </div>
                </div>
            </div>
            <div className='w-[90%] relative flex flex-col items-start'>
                {/* Features Products */}
                <div className='w-full  flex flex-col items-start font-robotoCondensed mt-8'>
                    <div className='w-full flex justify-between items-center'>
                        <div className='flex flex-col items-start gap-1 cursor-pointer'>
                            <p className='text-2xl font-bold'>Feature Products</p>
                            <p className='text-[14px] text-slate-500'>Do not miss the current offers until the end of December.</p>
                        </div>
                        <NavLink to='/products/view/Featured'>
                        <button className='flex justify-between items-center text-xl font-semibold cursor-pointer hover:text-blue-800 border border-slate-500 border-opacity-30 rounded-2xl p-2'>               
                                <p className='text-[14px] pl-2'>View All</p>                       
                            <MdKeyboardArrowRight />
                        </button>
                        </NavLink>
                    </div>
                    <div className="w-full relative mt-5">

                        <div ref={sliderRef} className="w-full relative flex flex-row gap-4 overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent pb-4 ">

                        {Featuredproduct?.length >0 ?(<>
                                    {Featuredproduct.slice(0, 15)?.map((pop, index) => (
                                    <Productcards key={pop._id}
                                        id={pop._id}
                                        src={pop.images}
                                        name={pop.name}
                                        description={pop.discription}
                                        techData={pop.techData}
                                        brand={pop.brand}
                                        categoryname={pop.category.name}
                                        inStock={pop.countInstock}
                                        oldPrice={pop.oldprice}
                                        newPrice={pop.newPrice}
                                        disCount={pop.disCount}
                                        rating={pop.rating} />
                                ))}
                                </>):(<>
                                {
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="animate-pulse w-full h-[250px] bg-white border border-gray-200 rounded-md p-4 shadow-sm"
                                        >
                                            <div className="h-40 bg-gray-300 rounded mb-4"></div>
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                        </div>
                                    ))
                                }
                                </>)}

                        </div>
                        <MdKeyboardArrowLeft
                            onClick={scrollLeft}
                            className="w-[35px] h-[35px] text-black  absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white" />
                        <MdKeyboardArrowRight
                            onClick={scrollRight}
                            className="w-[35px] h-[35px] text-black absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white"
                        />

                    </div>

                </div>
                {/* Banners */}
                <div className='w-full  flex justify-between items-center mt-8'>
                    <img className='w-[32%] h-[250px]  cursor-pointer  rounded-xl  hover:scale-110 transition-all duration-300' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9tPWkiHPgTvy6vvjFQHbj0kAcxqlIaViyQ&s" />
                    <img className='w-[32%] h-[250px] cursor-pointer  rounded-xl hover:scale-110 transition-all duration-300' src="https://img.freepik.com/free-vector/laundry-cosmetics-sale-realistic-advertisement_52683-16432.jpg?semt=ais_hybrid" />
                    <img className='w-[32%] h-[250px]  cursor-pointer rounded-xl hover:scale-110 transition-all duration-300' src="https://i.pinimg.com/236x/4f/30/44/4f304406f73d180e4813e8338a5f5089.jpg" />
                </div>
                <div className='w-full  flex flex-col items-start font-robotoCondensed mt-8'>
                    <div className='w-full flex justify-between items-center'>
                        <div className='flex flex-col items-start gap-1 cursor-pointer'>
                            <p className='text-2xl font-bold'>Electronics</p>
                            <p className='text-[14px] text-slate-500'>Do not miss the current offers until the end of December.</p>
                        </div>
                        <NavLink to='/products/view/Electronics'>
                        <button className='flex justify-between items-center text-xl font-semibold cursor-pointer hover:text-blue-800 border border-slate-500 border-opacity-30 rounded-2xl p-2'>                          
                                <p className='text-[14px] pl-2'>View All</p>                           
                            <MdKeyboardArrowRight />
                        </button>
                        </NavLink>
                    </div>
                    <div className="w-full relative mt-5">

                        <div ref={sliderRef} className="w-full relative flex flex-row gap-4 overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent pb-4 ">

                        {allElectronicspro?.length >0 ?(<>
                                    {allElectronicspro.slice(0, 15)?.map((pop, index) => (
                                    <Productcards key={pop._id}
                                        id={pop._id}
                                        src={pop.images}
                                        name={pop.name}
                                        description={pop.discription}
                                        techData={pop.techData}
                                        brand={pop.brand}
                                        categoryname={pop.category.name}
                                        inStock={pop.countInstock}
                                        oldPrice={pop.oldprice}
                                        newPrice={pop.newPrice}
                                        disCount={pop.disCount}
                                        rating={pop.rating} />
                                ))}
                                </>):(<>
                                {
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="animate-pulse w-full h-[250px] bg-white border border-gray-200 rounded-md p-4 shadow-sm"
                                        >
                                            <div className="h-40 bg-gray-300 rounded mb-4"></div>
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                        </div>
                                    ))
                                }
                                </>)}

                        </div>
                        <MdKeyboardArrowLeft
                            onClick={scrollLeft}
                            className="w-[35px] h-[35px] text-black  absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white" />
                        <MdKeyboardArrowRight
                            onClick={scrollRight}
                            className="w-[35px] h-[35px] text-black absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white"
                        />

                    </div>

                </div>
                {/* Best Seller  products */}
                <div className='w-full relative  flex flex-col mt-8 items-start font-robotoCondensed'>
                    <div className='w-full flex justify-start items-center'>
                        <div className='flex flex-col items-start gap-1 cursor-pointer'>
                            <p className='text-2xl font-bold'>Best Seller</p>
                            <p className='text-[14px] text-slate-500'>Do not miss the current offers until the end of December.</p>
                        </div>
                    </div>
                    <div className='w-full relative grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 mb-8'>
                    {bestSeller?.length >0 ?(<>
                                    {bestSeller.slice(0, 15)?.map((pop, index) => (
                                    <Productcards key={pop._id}
                                        id={pop._id}
                                        src={pop.images}
                                        name={pop.name}
                                        description={pop.discription}
                                        techData={pop.techData}
                                        brand={pop.brand}
                                        categoryname={pop.category.name}
                                        inStock={pop.countInstock}
                                        oldPrice={pop.oldprice}
                                        newPrice={pop.newPrice}
                                        disCount={pop.disCount}
                                        rating={pop.rating} />
                                ))}
                                </>):(<>
                                {
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="animate-pulse w-full h-[250px] bg-white border border-gray-200 rounded-md p-4 shadow-sm"
                                        >
                                            <div className="h-40 bg-gray-300 rounded mb-4"></div>
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                        </div>
                                    ))
                                }
                                </>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Productlisting