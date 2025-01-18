import React, { useContext, useEffect, useState } from 'react'
import Productcards from '../../Components/Home/Productcards'
import { BsGrid3X3GapFill } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import { fetchData } from '../../Components/Admin/api';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Mycontext from '../Mycontext/Mycontext';


const Subcatpage = () => {
    const webId = useParams();


    const [singleshow, setsingleshow] = useState(false);
    const [doubleshow, setdoubleshow] = useState(false);
    const [quadshow, setquadshow] = useState(true);

    function handleShow(mode) {
        setsingleshow(mode === "single");
        setdoubleshow(mode === "double");
        setquadshow(mode === "quad");
    }

    const [showData, setshowData] = useState([]);
    const context = useContext(Mycontext);
    const [filterdata, setfilterdata] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [filterbyprice, setfilterbyprice] = useState([1, 1000000]);
    const [filterbyrating, setfilterbyrating] = useState(0);
    const [viewname, setviewname] = useState('');


    useEffect(() => {
        window.scrollTo(0, 0);
        setviewname(webId.id);
        context.setsearchfilterData([]);
        context.setsearchtext('');
        context.setissearchActive(false);
        context.setsearchplaceholder('Search for products..');
        fetchData(`/api/products?product=${(webId.id)}`).then(res => {
            setshowData(res.filterProduct);
        });
    }, [])


    const handleFilterChange = (filter) => {

        setSelectedFilter((prev) => prev === filter ? null : filter)
    };
    const handleFilterPriceChange = (filter) => {
        setfilterbyprice(filter);
    };
    const handleFilterRatingChange = (filter) => {
        setfilterbyrating(filter);
    };

    useEffect(() => {
        if (selectedFilter == null) {
            fetchData(`/api/products?product=${webId.id}&min=${filterbyprice[0]}&max=${filterbyprice[1]}&rat=${filterbyrating}`).then(res => {
                setshowData(res.filterProduct)
            });
        }
        else {
            fetchData(`/api/products?product=${webId.id}`).then(res => {
                setshowData(res.filterProduct)
            });
        }
    }, [selectedFilter, filterbyprice,filterbyrating])
  return (
    <div className='w-full relative flex justify-center items-center mt-20 z-1'>
            <div className='w-[90%] flex justify-between items-start'>
                {/* Sidebar filter */}
                <div className='w-[20%]'>
                    <Sidebar filterdata={filterdata}
                        onFilterChange={handleFilterChange}
                        selectedFilter={selectedFilter}
                        handleFilterPriceChange={handleFilterPriceChange}
                        handleFilterRatingChange={handleFilterRatingChange} />
                </div>
                {/* Products Listing */}
                <div className='w-[70%] md:w-[79%] relative flex flex-col items-start'>
                    {/* Upper section */}
                    <div className='w-full h-[70px] flex justify-between items-center p-4 bg-blue-700 text-white'>
                        <h1 className='text-3xl font-bold'>{viewname}</h1>
                        <div className=' flex justify-between items-center gap-2'>
                            <IoMenu onClick={() => { handleShow("single") }} className='text-xl'
                                style={{ color: singleshow ? "gray" : "white" }} />
                            <BsFillGridFill onClick={() => { handleShow("double") }} className='text-xl'
                                style={{ color: doubleshow ? "gray" : "white" }} />
                            <BsGrid3X3GapFill onClick={() => { handleShow("quad") }} className='text-xl'
                                style={{ color: quadshow ? "gray" : "white" }} />
                        </div>
                    </div>

                    {/* Products View */}
                    <div
                        className={`w-full relative grid 
                ${singleshow ? "grid-cols-1 gap-6" : doubleshow ? "grid-cols-2 md:grid-cols-3 gap-5" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 "}
                gap-4 mt-5 transition-all duration-800 ease-in-out`}>

                        {showData?.length > 0 ? (<>
                            {showData.slice(0, 15)?.map((pop, index) => (
                                <Productcards className={`${singleshow ? "w-full" : ""}`} key={pop._id}
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
                                    rating={pop.rating}
                                    show={singleshow}
                                    show2={doubleshow}
                                    show4={quadshow}
                                />
                            ))}
                        </>) : (<>
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

export default Subcatpage