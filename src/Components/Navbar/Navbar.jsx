import React, { useContext, useEffect, useState } from 'react'
import logoimg from '../../assets/logo.png'
// import logoimg from '../../assets/Logo2.png'
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Dialog from '@mui/material/Dialog';
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import states from '../../data/indianstates.json'
import { FaShirt } from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import { FaBagShopping } from "react-icons/fa6";
import { GiLeatherBoot } from "react-icons/gi";
import { RiVipDiamondFill } from "react-icons/ri";
import { fetchData, userData } from '../Admin/api';
import { IoTv } from "react-icons/io5";
import { RiBrushFill } from "react-icons/ri";
import Mycontext from '../../Pages/Mycontext/Mycontext';
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { IoLogOutOutline } from "react-icons/io5";
import CircularProgress from '@mui/material/CircularProgress';
import { BsBox2 } from "react-icons/bs";
import { debounce } from 'lodash';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineHome } from "react-icons/md";



const Navbar = () => {
    const [open, setOpen] = useState(false);

    const [statevalue, setstateValue] = useState("All")
    const [query, setQuery] = useState("");
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [iscategoery, setcategorey] = useState(false);
    const [afterlogin, setafterlogin] = useState(false);
    const context = useContext(Mycontext);
    const [openlogout, setopenlogout] = useState(false);
    const [isloading, setisloading] = useState(false);
    const [opencontact, setopencontact] = useState(false);
    const [mobview, setmobview] = useState(false);

    const filterlocation = states.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));

    function handleclose() {

        if (open) {
            setOpen(false);
        }
        else {
            setOpen(true);
        }
    }

    function handlecategorey() {
        if (iscategoery) {
            setcategorey(false);
        }
        else {
            setcategorey(true);
        }
    }

    const getIcon = (value) => {
        switch (value.toLowerCase()) {
            case "fashion":
                return <FaShirt />;
            case "electronics":
                return <MdElectricBolt />;
            case "groceries":
                return <GiFruitBowl />;
            case "bags":
                return <FaBagShopping />;
            case "footwear":
                return <GiLeatherBoot />
            case "jewellery":
                return <RiVipDiamondFill />;
            case "appliances":
                return <IoTv />;
            case "beauty":
                return <RiBrushFill />;
            default:
                return null;
        }
    };


    const [catData, setcatData] = useState([]);
    //For Fetching the Category from API
    useEffect(() => {
        fetchData("/api/Category?all=true").then(res => {
            setcatData(res.Categoreylist || []);
        })
    }, []);


    const handleLogout = () => {
        setisloading(true);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('Address');


        setopenlogout(false);
        setTimeout(() => {
            context.setisLogin(false);
            setisloading(false);
            window.location.reload();
        }, 2000);
    }
    useEffect(() => {
        context.setuserstate(statevalue);
    }, [statevalue]);






    //For Search Box

    const onChangeserachValue = debounce((e) => {
        context.setissearchActive(true);
        const query = e.target.value;
        context.setfilterText(query);
        if (query === "") {
            context.setsearchfilterData([]);
            context.setsearchtext('');
            context.setissearchActive(false);
            context.setsearchplaceholder('Search for products..');
            return;
        }

        fetchData(`/api/Search?s=${encodeURIComponent(query)}`)
            .then(res => {
                if (res.status === false) {
                    context.setsearchtext('No Product');
                    context.setsearchfilterData([]);
                } else if (res.searchItems.length === 0) {
                    context.setsearchtext('No Product');
                    context.setsearchfilterData([]);
                } else {
                    context.setsearchfilterData(res.searchItems);
                    context.setsearchtext('');
                }
            })
            .catch(err => {
                console.error('Error fetching search results:', err);
                setsearchtext('Error fetching results');
                setsearchfilterData([]);
            });
    }, 300)

    //rempve the search things on scroll
    useEffect(() => {
        const handleScroll = () => {
            context.setissearchActive(false);
            context.setsearchfilterData([]);
            context.setsearchtext('');
            context.setsearchplaceholder('Search for products..');
        };

        if (context.issearchActive) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [context.issearchActive]);


    const history = useNavigate();
    const handleSearch = () => {
        context.setissearchActive(false);
        context.setsearchfilterData([]);
        context.setsearchtext('');
        context.setsearchplaceholder('Search for products..');
        history(`/products/search/${context.filterText}`);
        window.location.reload();
    };

    const handlesubCat = (subcategory) => {
        history(`/products/subcat/${subcategory}`);
        window.location.reload();
    }

    const handleCat = (category) => {
        history(`/products/view/${category}`);
        window.location.reload();
    }

    useEffect(() => {
        if (mobview) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        }
    }, [mobview])

    return (
        <>
            {/* //First container  */}
            <div className="w-full  flex items-center relative justify-center font-robotoCondensed p-1 border-b-[1px] border-slate-500 border-opacity-40 pb-5 z-10 bg-white">
                {context.issearchActive && <div onClick={() => {
                    context.setissearchActive(false)
                    context.setsearchfilterData([]);
                    context.setsearchtext('');
                    context.setsearchplaceholder('Search for products..');
                }} className='fixed inset-0 bg-black bg-opacity-30 z-[81] overflow-hidden'></div>}
                {/* Container for width 90% of screen */}
                <div className="w-[90%] hidden md:flex flex-col items-center relative">
                    {/* BOX1 */}
                    <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-5 gap-5 sm:gap-0">
                        <NavLink to="/">
                            <img src={logoimg} className="w-[80px] sm:w-[100px] cursor-pointer ml-4" />
                        </NavLink>
                        <div className="w-full sm:w-[60%] flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                            <div
                                onClick={handleclose}
                                className="w-full sm:w-[20%] h-[50px] flex flex-col items-start justify-center cursor-pointer border border-slate-600 p-4 gap-0 rounded-lg hover:shadow-lg hover:bg-slate-50 transition-all duration-200"
                            >
                                <p className="text-[12px] text-slate-500">Your Location</p>
                                <p className="text-[14px] font-semibold text-blue-800">{statevalue}</p>
                            </div>
                            <div className="w-full sm:w-[75%] h-full border relative flex flex-col items-start  rounded-lg cursor-pointer">
                                <div className='w-full  h-full border relative flex items-center p-2 rounded-lg bg-[#E5E5E5] cursor-pointer z-[99]'>
                                    <input onChange={onChangeserachValue}
                                        onClick={() => { context.setissearchActive(true) }}
                                        className="w-full h-full p-2 bg-[#E5E5E5] outline-none"
                                        placeholder={context.searchplaceholder}
                                    />
                                    <CiSearch className="w-[10%] text-xl font-extrabold" onClick={context.searchfilterData.length > 0 ? handleSearch : undefined} />

                                </div>
                                <div className='w-full relative '>
                                    {context.searchfilterData?.length > 0 ? (
                                        <ul className='w-full  z-[99] h-[500px] border absolute top-0 flex flex-col items-start gap-2 p-2 rounded-lg cursor-pointer bg-white
                                         overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent '>
                                            {context.searchfilterData?.map((item, index) => (
                                                <NavLink className='w-full' to={`/product/${item?._id}`}>
                                                    <li className='w-full flex justify-start items-center gap-4 z-[100] bg-white border-[2px] border-gray-200 rounded-md p-2' key={index}>
                                                        <img className='w-[50px] h-[50px] rounded-lg ' src={item?.images[0]} />
                                                        <p className='text-[18px] font-semibold'>
                                                            {item?.name.length > 60 ? item?.name.slice(0, 60) + "..." : item?.name}
                                                        </p>
                                                    </li>
                                                </NavLink>
                                            ))}
                                        </ul>
                                    ) : (
                                        <>
                                            {context.searchtext.length > 0 &&
                                                <div className='w-[75%] md:w-full border absolute top-0 flex justify-center items-center p-2 rounded-lg cursor-pointer bg-white  '>
                                                    <p className='text-xl font-semibold'>{context.searchtext}</p>
                                                </div>}
                                        </>)}

                                </div>


                            </div>
                        </div>
                        <div className="w-full sm:w-[12%] flex justify-start md:justify-between gap-4 cursor-pointer">
                            {context.isLogin ? (
                                <div
                                    onMouseEnter={() => { setafterlogin(true) }}
                                    onMouseLeave={() => { setafterlogin(false) }}
                                    className='w-[30vw] md:w-[90%] relative'>
                                    <div className="w-[30vw] md:w-[45px] h-[45px] bg-blue-800 text-white text-sm sm:text-xl flex justify-center items-center font-semibold rounded-full hover:bg-blue-900 transition-all duration-200">
                                        {context.userData.name.slice(0, 1)}
                                    </div>
                                    <ul
                                        style={{
                                            visibility: afterlogin ? "visible" : "hidden",
                                            opacity: afterlogin ? 1 : 0,
                                            transition: "opacity 0.3s ease-in-out",
                                        }}

                                        className='w-[150px]  bg-white absolute top-[100%] left-0 transition-all duration-200 ease-in-out flex flex-col items-start gap-2 rounded-xl shadow-xl p-5 font-normal text-black z-[10000]'>
                                        <NavLink to={context.isLogin ? `/account/${context.userData.userID}` : "/signin"} className=' relative'>
                                            <li className="w-full flex items-center justify-start gap-2 rounded-lg">
                                                <IoPersonOutline className='hover:font-bold' />
                                                <p className='hover:font-bold'>Account</p>
                                            </li>
                                        </NavLink>
                                        <NavLink to={context.isLogin ? `/wishlist/view/${context.userData.userID}` : "/signin"} className=' relative'>
                                            <li className="w-full flex items-center justify-start gap-2 rounded-lg">
                                                <FaRegHeart className='hover:font-bold' />
                                                <p className='hover:font-bold'>wishList</p>
                                            </li>
                                        </NavLink>
                                        <NavLink to={context.isLogin ? `/orders/view/${context.userData.userID}` : "/signin"} className=' relative'>
                                            <li className="w-full flex items-center justify-start gap-2 rounded-lg">
                                                <BsBox2 className='hover:font-bold' />
                                                <p className='hover:font-bold'>Orders</p>
                                            </li>
                                        </NavLink>
                                        <li className="w-full flex items-center justify-start gap-2 rounded-lg">
                                            <GrContact className='hover:font-bold' />
                                            <p className='hover:font-bold' onClick={() => { setopencontact(true) }}>Contact Us</p>
                                        </li>
                                        <li onClick={() => { setopenlogout(true) }} className="w-full flex items-center justify-start gap-2 rounded-lg">
                                            <IoLogOutOutline className='text-xl hover:font-bold' />
                                            <p className='hover:font-bold'>Logout</p>
                                        </li>
                                    </ul>
                                </div>

                            ) :
                                (<NavLink to='/signin' className="w-[30vw] md:w-[70%] h-[35px] mt-2" >
                                    <button className="w-full h-full bg-blue-800 text-white text-sm sm:text-xl font-semibold rounded-xl hover:bg-blue-900 transition-all duration-200">
                                        Sign In
                                    </button>
                                </NavLink>)}
                            <NavLink to={context.isLogin ? `/cart/view/${context.userData.userID}` : "/signin"} className='w-[45px] h-[45px] relative'>
                                <CiShoppingCart className="w-full h-full rounded-full bg-blue-800 text-white font-bold p-1" />
                                {context.totalItem > 0 && <div className='w-[25px] h-[25px] absolute -top-3 -right-3 text-xs font-bold flex justify-center items-center rounded-full border-[2px] border-blue-400 bg-white text-black'>
                                    {context.totalItem}
                                </div>}
                            </NavLink>
                        </div>
                    </div>
                    {/* BOX2 */}
                    <div className="w-full  flex flex-col sm:flex-row justify-between items-center mt-8 gap-4 sm:gap-0">
                        {/* Category */}

                        <div onClick={handlecategorey} className="md:w-[14%] sm:w-full h-[40px] z-[70] bg-blue-800  rounded-full gap-2 text-white flex justify-center items-center p-5 cursor-pointer relative">
                            <IoIosMenu />
                            <p className="text-[12px] font-semibold">ALL CATEGORIES</p>
                            <IoIosArrowDown />

                            <ul style={{
                                visibility: iscategoery ? "visible" : "hidden",
                                opacity: iscategoery ? 1 : 0,
                                transition: "opacity 0.3s ease-in-out",
                            }}
                                className='w-full  bg-white absolute top-[100%]   left-0 transition-all duration-200 ease-in-out flex flex-col items-center rounded-xl shadow-xl p-5 font-normal text-black'>
                                {catData?.length > 0 ? (<>
                                    {catData?.map((i, index) => (
                                        <>
                                            <NavLink className='w-full relative' onClick={()=>{handleCat(i.name)}} key={index} ><li className='w-full flex items-center justify-start  hover:text-blue-700 rounded-lg gap-2 pt-2'>{getIcon(i.name)} <div className='relative'>{i.name}</div></li></NavLink>
                                        </>
                                    ))}

                                </>) :
                                    (<p>No Category Found</p>)}

                            </ul>
                        </div>
                        <ul className="md:w-[75%] hidden h-auto sm:h-[40px] md:flex flex-wrap justify-between items-center font-bold text-[#4C4C4C]">
                            {catData?.length !== 0 && catData?.map((category) => (
                                <li
                                    key={category._id}
                                    onMouseEnter={() => setHoveredCategory(category._id)}
                                    onMouseLeave={() => setHoveredCategory(null)}
                                    className="md:w-[10%] sm:w-[14%] h-[30px] rounded-full hover:bg-slate-100 transition-all duration-200 ease-in-out flex flex-col justify-center items-center relative"
                                >
                                    {/* Main Category */}
                                    <NavLink className="relative"  onClick={()=>{handleCat(category.name)}}>
                                        {category.name.toUpperCase()}
                                    </NavLink>

                                    {/* Subcategories */}
                                    <ul
                                        style={{
                                            visibility: hoveredCategory === category._id ? 'visible' : 'hidden',
                                            opacity: hoveredCategory === category._id ? 1 : 0,
                                            transition: 'opacity 0.3s ease-in-out',
                                        }}
                                        className="w-full bg-white absolute top-[100%] left-0 z-50 transition-all duration-200 ease-in-out flex flex-col items-center rounded-xl shadow-xl p-4 font-normal"
                                    >
                                        {category.subcat.map((subcategory, index) => (
                                            <NavLink className="relative w-full" to={`/products/subcat/${subcategory}`}
                                                onClick={() => { handlesubCat(subcategory) }}>
                                                <li
                                                    key={index}
                                                    className="w-full flex items-center justify-start hover:bg-slate-100 rounded-lg"
                                                >
                                                    {subcategory}
                                                </li>
                                            </NavLink>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Mobile View */}
                <div className='w-full fixed top-0 z-[81] md:hidden flex flex-col items-start gap-2 bg-white'>
                    {/* Side Menu */}
                    <div className='w-full  md:hidden flex justify-between items-center p-3'>
                        <GiHamburgerMenu className='w-[30px] h-[30px] cursor-pointer text-blue-800 transition-all duration-300 ease-in-out'
                            onClick={() => { setmobview(true) }} />
                        <NavLink to="/">
                            <img src={logoimg} className="w-[120px] sm:w-[100px] cursor-pointer" />
                        </NavLink>
                        <NavLink to={context.isLogin ? `/cart/view/${context.userData.userID}` : "/signin"} className='w-[45px] h-[45px] relative'>
                            <CiShoppingCart className="w-full h-full rounded-full bg-blue-800 text-white font-bold p-1" />
                            {context.totalItem > 0 && <div className='w-[25px] h-[25px] absolute -top-3 -right-3 text-xs font-bold flex justify-center items-center rounded-full border-[2px] border-blue-400 bg-white text-black'>
                                {context.totalItem}
                            </div>}
                        </NavLink>
                    </div>
                    {/* Search Feild */}
                    <div className='w-full  h-full border relative flex items-center p-2 rounded-lg bg-[#E5E5E5] cursor-pointer z-[99]'>
                        <input onChange={onChangeserachValue}
                            onClick={() => { context.setissearchActive(true) }}
                            className="w-full h-full p-2 bg-[#E5E5E5] outline-none"
                            placeholder={context.searchplaceholder}
                        />
                        <CiSearch className="w-[10%] text-xl font-extrabold" onClick={context.searchfilterData.length > 0 ? handleSearch : undefined} />

                    </div>
                    <div className='w-full relative '>
                        {context.searchfilterData?.length > 0 ? (
                            <ul className='w-full  z-[99] h-[500px] border absolute top-0 flex flex-col items-start gap-2 p-2 rounded-lg cursor-pointer bg-white
                                         overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent '>
                                {context.searchfilterData?.map((item, index) => (
                                    <NavLink className='w-full' to={`/product/${item?._id}`}>
                                        <li className='w-full flex justify-start items-center gap-4 z-[100] bg-white border-[2px] border-gray-200 rounded-md p-2' key={index}>
                                            <img className='w-[50px] h-[50px] rounded-lg ' src={item?.images[0]} />
                                            <p className='text-[18px] font-semibold'>
                                                {item?.name.length > 60 ? item?.name.slice(0, 60) + "..." : item?.name}
                                            </p>
                                        </li>
                                    </NavLink>
                                ))}
                            </ul>
                        ) : (
                            <>
                                {context.searchtext.length > 0 &&
                                    <div className='w-[75%] md:w-full border absolute top-0 flex justify-center items-center p-2 rounded-lg cursor-pointer bg-white  '>
                                        <p className='text-xl font-semibold'>{context.searchtext}</p>
                                    </div>}
                            </>)}

                    </div>
                </div>

                {mobview &&
                    <div onClick={() => { setmobview(false) }} className='w-full h-screen  top-0 z-[101] absolute inset-0 bg-black bg-opacity-30 overflow-hidden'>
                        <div className='w-[70%] flex flex-col h-screen items-start bg-white z-[102] transition-transform duration-300 ease-in-out transform translate-x-0
                         bg-[url("https://media.istockphoto.com/id/2063511115/photo/marble-abstract-christmas-white-gray-grunge-texture-wave-pattern-snow-ice-floe-hill-silver.jpg?s=2048x2048&w=is&k=20&c=EXO1CCa6BGGc0SGxaN493yv2S2TSq2lPX9Lvy9Y0Ktk=")]'>
                            <img className='w-full h-[200px]'
                             src='https://thumbs.dreamstime.com/b/vector-pop-art-illustration-young-sexy-happy-girl-jeans-t-shirt-holding-shopping-bags-woman-showing-her-purchases-back-183732380.jpg' />
                            <div className='w-full flex flex-col items-start p-5 gap-4 '>
                                <NavLink to='/' className=' relative'>
                                    <div className="w-full flex items-center justify-start gap-4 rounded-lg text-2xl">
                                        <MdOutlineHome className='font-bold' />
                                        <p className='font-bold'>Home</p>
                                    </div>
                                </NavLink>
                                <NavLink to={context.isLogin ? `/account/${context.userData.userID}` : "/signin"} className=' relative'>
                                    <div className="w-full flex items-center justify-start gap-4 rounded-lg text-2xl">
                                        <IoPersonOutline className='font-bold ' />
                                        <p className='font-bold '>Account</p>
                                    </div>
                                </NavLink>
                                <NavLink to={context.isLogin ? `/wishlist/view/${context.userData.userID}` : "/signin"} className=' relative'>
                                    <div className="w-full flex items-center justify-start gap-4 rounded-lg text-2xl">
                                        <FaRegHeart className='font-bold' />
                                        <p className='font-bold'>WishList</p>
                                    </div>
                                </NavLink>
                                <NavLink to={context.isLogin ? `/orders/view/${context.userData.userID}` : "/signin"} className=' relative'>
                                    <div className="w-full flex items-center justify-start gap-4 rounded-lg text-2xl">
                                        <BsBox2 className='font-bold' />
                                        <p className='font-bold'>Orders</p>
                                    </div>
                                </NavLink>
                                <div className="w-full flex items-center justify-start gap-4 rounded-lg text-2xl">
                                    <GrContact className='font-bold' />
                                    <p className='font-bold' onClick={() => { setopencontact(true) }}>Contact Us</p>
                                </div>

                                {context.isLogin ?

                                    <div onClick={() => { setopenlogout(true) }} className="w-[150px] h-[50px] absolute bottom-16 flec justify-center items-center bg-blue-800 text-white left-20 flex  gap-4 text-3xl rounded-lg">
                                        <p className='font-bold'>Logout</p>
                                    </div>
                                    :
                                    <NavLink to='/signin' >
                                        <div onClick={() => { setopenlogout(true) }} className="w-[150px] h-[50px] absolute bottom-16 flec justify-center items-center bg-blue-800 text-white left-20 flex  gap-4 text-3xl rounded-lg">
                                            <p className='font-bold'>SignIn</p>
                                        </div>
                                    </NavLink>
                                }

                            </div>
                        </div>
                    </div>}
            </div>

            {/* State Select Drop Down */}
            <Dialog onClick={handleclose} open={open} className='w-full  relative transition-all duration-500 ease-in-out' >
                <div onClick={(e) => { e.stopPropagation() }} className='w-full  p-4'>
                    <div className=' sticky top-0  w-full z-10 bg-white'>
                        <div className='flex justify-between items-center'>
                            <p className='font-bold '>Choose your Delivery Location</p>
                            <RxCross1 onClick={handleclose} className='w-5 h-5 text-xl rounded-full bg-slate-100 text-black ' />
                        </div>
                        <p className='text-[12px] '>Enter your address and we will specify the offer for your area.</p>
                        <div className=' w-full h-[40px] border  flex items-center p-2 rounded-lg bg-[#E5E5E5] mt-4 cursor-pointer'>
                            <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full h-full p-2 bg-[#E5E5E5] outline-none" placeholder='Search your area..' />
                            <CiSearch className='w-[10%] text-xl font-extrabold' />
                        </div>
                    </div>

                    <ul className="w-full h-fit p-2 cursor-pointer scroll-auto scroll-m-2">
                        {filterlocation.map((location, index) => (
                            <li onClick={() => {
                                setstateValue(location.name);
                                handleclose();
                            }} className='w-full font-semibold h-[40px] flex justify-start  pl-3 pt-3 pb-3 rounded-xl items-center hover:bg-slate-100 transition-all duration-200 ease-in-out  '
                                key={index}>
                                <p>{location.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Dialog>
            {/* Logout PopUp */}
            <Dialog
                PaperProps={{
                    className: 'w-full md:w-[23%] z-[103]'
                }}
                onClose={() => { setopenlogout(false) }} open={openlogout} className='w-full font-robotoCondensed '>
                <div className='w-full h-[150px] flex justify-center items-center relative p-5'>
                    <div className='w-[90%] h-full  flex flex-col items-start '>
                        <p className='text-xl font-bold'>Are your sure you want to Logout?</p>
                        <div className='w-[90%] flex justify-between items-center  mt-8'>
                            <button onClick={handleLogout} className='w-[40%] h-[40px] text-white bg-blue-800 rounded-xl hover:bg-blue-900'>Logout</button>
                            <button onClick={() => { setopenlogout(false) }} className='w-[40%] h-[40px] text-blue-800 border-[2px] rounded-xl border-blue-800'>Cancel</button>
                        </div>
                    </div>
                </div>
            </Dialog>
            {/* Contact us PopUp */}
            <Dialog
                PaperProps={{
                    className: 'w-full md:w-[40%] z-[103]'
                }}
                onClose={() => { setopencontact(false) }} open={opencontact} className='w-full font-robotoCondensed '>
                <div className='w-full h-[170px] flex justify-center items-center relative p-5'>
                    <div className='w-[90%] h-full  flex flex-col items-start '>
                        <p className='text-xl font-bold'>Mail on : <span className='text-[18px] font-semibold'>ecommerse487@gmail.com</span></p>
                        <p className='text-xl font-bold'>Helpline Number : <span className='text-[18px] font-semibold'>7835401169</span></p>
                        <div className='w-[90%] flex justify-center items-center  mt-8'>
                            <button onClick={() => { setopencontact(false) }} className='w-[40%] h-[50px] text-[12px] md:text-xl text-white bg-blue-800 rounded-xl hover:bg-blue-900 font-bold' >Back to Shoping</button>
                        </div>
                    </div>
                </div>
            </Dialog>
            {isloading && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
                    <CircularProgress className="text-blue-800" color="inherit" />
                </div>
            )}
        </>
    )
}

export default Navbar