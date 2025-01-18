import React, { useContext, useEffect, useRef, useState } from 'react';
import Mycontext from '../Mycontext/Mycontext'
import { NavLink } from 'react-router-dom';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import TextField from '@mui/material/TextField';
import { MdPublish } from "react-icons/md";
import { deleteData, fetchData, postData, putData } from '../../Components/Admin/api';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FaEye } from "react-icons/fa";
import Adminproductview from '../../Components/Home/Adminproductview';


const AddProductpage = () => {
    const context = useContext(Mycontext);
    const [open, setopen] = useState(false);
    const [categoryview, setcategoryview] = useState(true);
    const [categoryupload, setcategoryupload] = useState(false);
    const [productval, setproductval] = useState({
        name: '',
        discription: '',
        techData: {},
        images: [],
        brand: '',
        oldprice: 0,
        newPrice: 0,
        disCount: 0,
        category: '',
        subcat: '',
        countInstock: 0,
        rating: 0,
        isFeatured: false,
        isnewarrival: false,
        ispopproduct: false
    })
    const [catdata, setcatdata] = useState([]);
    const [EditId, setEditId] = useState(null);
    const [isloading, setisloading] = useState(false);
    const [isDelete, setisDelete] = useState(false);
    const [err, seterr] = useState(false);
    const [value, setValue] = useState(1);
    const [hover, setHover] = useState(-1);
    const [addimg, setaddimg] = useState([]);
    const imgref = useRef();
    const [isfeaturevalue, setisfeaturevalue] = useState(false);
    const [isNewArrival, setisNewArrival] = useState(false);
    const [ispopularPro, setispopularPro] = useState(false);
    const [catval, setcatval] = useState("");
    const [subcatval, setsubcatval] = useState([]);
    const [subcatdata, setsubcatdata] = useState("");
    const [productData, setproductData] = useState([]);


    //Removing header and footer
    useEffect(() => {
        if (context.setisheader) {
            context.setisheader(false); // Adjusted function name for readability
        }
        if (context.setisfooter) {
            context.setisfooter(false); // Adjusted function name for readability
        }
        return () => {
            if (context.setisheader) {
                context.setisheader(true); // Reset header on unmount
            }
            if (context.setisfooter) {
                context.setisfooter(true); // Adjusted function name for readability
            }
        };
    }, []);


    //Posting the Product Data
    const onChangeInput = (e) => {
        setproductval(() => ({
            ...productval,
            [e.target.name]: e.target.value
        }))
    }

    const handleProductsubmit = (e) => {
        e.preventDefault();
        productval.images = addimg;
        productval.techData=techData;
        if (productval.name !== '' && productval.images.length !== 0 && productval.category !== '') {
            postData("/api/products/create", productval).then(res => {
                fetchData("/api/products").then(res => {
                    setproductData(res);
                })
                setisloading(false);
            })
            setcategoryview(true);
            setcategoryupload(false);
            seterr(false);
            setproductval({
                name: '',
                discription: '',
                techData:{},
                images: [],
                brand: '',
                oldprice: 0,
                newPrice: 0,
                disCount:0,
                category: '',
                countInstock: 0,
                rating: 0,
                isFeatured: false,
                isnewarrival:false,
                ispopproduct:false
            })
            setaddimg([]);
            setTechData({});
            setcatval('');
            setsubcatdata('');
            setisfeaturevalue(false);
            setisNewArrival(false);
            setispopularPro(false);
        }
        else {
            seterr(true);
        }

    }

    //View for Product Data
    useEffect(() => {
        if (catval != '') {
            fetchData(`/api/Category/${catval}`).then(res => {
                setsubcatval(res.subcat);
            })
        }
    }, [catval])
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData("/api/Category?all=true").then(res => {
            setcatdata(res);
        })
        fetchData("/api/products").then(res => {
            setproductData(res);
        })

    }, [])

    const [currentPage, setCurrentPage] = useState(1); 
    const handleChangePage = (event, value) => {
        setCurrentPage(value); 
        fetchData(`/api/products?page=${value}`).then(res => {
            setproductData(res);
        })
    }

    //EditIng the Category Data
    const handleEdit = (id) => {

        setEditId(id);
        fetchData(`/api/products/${id}`).then(res => {
            setproductval({
                name: res.name,
                discription: res.discription,
                images: res.images[0],
                brand: res.brand,
                oldprice: res.oldprice,
                newPrice: res.newPrice,
                disCount:res.disCount,
                category: res.category,
                subcat: res.subcat,
                countInstock: res.countInstock,
                rating: res.rating,
                isFeatured: res.isFeatured,
                isnewarrival:res.isnewarrival,
                ispopproduct:res.ispopularPro
            })
            setValue(res.rating);
            setisfeaturevalue(res.isFeatured);
            fetchData(`/api/Category/${res.category}`).then(res => {
                setcatval(res._id);
            })
            setaddimg(res.images);
            setsubcatdata(res.subcat);
            setTechData(res.techData);
            setisNewArrival(res.isnewarrival);
            setispopularPro(res.ispopproduct);

        })
        setopen(true);
    }
    const handleClose = () => {
        setopen(false);
        seterr(false);
            setproductval({
                name: '',
                discription: '',
                techData:{},
                images: [],
                brand: '',
                oldprice: 0,
                newPrice: 0,
                disCount:0,
                category: '',
                countInstock: 0,
                rating: 0,
                isFeatured: false,
                isnewarrival:false,
                ispopproduct:false
            })
            setaddimg([]);
            setTechData({});
            setcatval('');
            subcatdata('');
    }
    const handleditproductsubmit = (e) => {
        e.preventDefault();
        productval.images = addimg;
        productval.techData=techData;
        if (productval.name !== '' && productval.images.length !== 0 && productval.category !== '') {
            putData(`/api/products/${EditId}`, productval).then(res => {
                fetchData("/api/products").then(res => {
                    setproductData(res);
                })
                setisloading(false);
            })
            setcategoryview(true);
            setcategoryupload(false);
            seterr(false);
            setopen(false);
            setproductval({
                name: '',
                discription: '',
                images: [],
                brand: '',
                oldprice: 0,
                newPrice: 0,
                disCount:0,
                category: '',
                subcat: '',
                countInstock: 0,
                rating: 0,
                isFeatured: false,
                isnewarrival:false,
                ispopproduct:false
            })
            setaddimg([]);
            setTechData({});
            setcatval('');
            setsubcatdata('');
            setisfeaturevalue(false);
            setisNewArrival(false);
            setispopularPro(false);
        }
        else {
            seterr(true);
        }



    }

    //Delete
    const handleDelete = (id) => {
        setEditId(id);
        setisDelete(true);
    }
    const handleDeleteSubmit = (e) => {

        e.preventDefault();
        deleteData(`/api/products/${EditId}`).then(res => {

            fetchData("/api/products").then(res => {
                setproductData(res);
            })

        })
        setisloading(false);

    }

    //Some Usefull Function
    function handlecategory(value) {
        setcategoryview(value === 'view');
        setcategoryupload(value === 'upload');
    }
    const setproductcat = (e) => {
        setcatval(e.target.value);
        setproductval(() => ({
            ...productval,
            category: e.target.value
        }))
    }
    const setproductsubcat = (e) => {
        setsubcatdata(e.target.value);
        setproductval(() => ({
            ...productval,
            subcat: e.target.value
        }))
    }

    const setproductisfeature = (e) => {
        setisfeaturevalue(e.target.value);
        setproductval(() => ({
            ...productval,
            isFeatured: e.target.value
        }))
    }
    const setproductisnewarrival = (e) => {
        setisNewArrival(e.target.value);
        setproductval(() => ({
            ...productval,
            isnewarrival: e.target.value
        }))
    }
    const setproductispoppro = (e) => {
        setispopularPro(e.target.value);
        setproductval(() => ({
            ...productval,
            ispopproduct: e.target.value
        }))
    }

    //ADD Images of the product
    const OnaddproImages = () => {

        const newImage = imgref.current.value;
        if (newImage) {
            setaddimg((prev) => [...prev, newImage]); // Properly updating the state
            imgref.current.value = ""; // Clear the input after adding
        }
    };
    // Function to delete a specific image
    const handleDeleteImage = (index) => {

        setaddimg((prev) => prev.filter((_, i) => i !== index)); // Remove image at the given index
    };

    // Function to remove all images
    const removeAllImages = () => {

        setaddimg([]); // Clear the entire array
    };



    // For View of Product

    const [ispreview, setPreview] = useState(false)
    const [proID, setproID] = useState(null);
    function handlepreview(id) {
        setproID(id)
        setPreview(true);
    }
    function closepreview() {
        setPreview(false);
        setproID(null);
    }


    //Tech Data For Product
    const [newTech, setNewTech] = useState({ key: "", value: "" });
    const [techData, setTechData] = useState({});


    const handleAddTechDetail = () => {
        if (newTech.key.trim() && newTech.value.trim()) {
            setTechData((prev) => ({ ...prev, [newTech.key]: newTech.value }));
            setNewTech({ key: "", value: "" }); // Clear input fields
        }
    };

    const handleRemoveTechDetail = (key) => {
        const updatedTechData = { ...techData };
        delete updatedTechData[key];
        setTechData(updatedTechData);
    };







    return (
        <div className='w-full h-full  relative flex justify-center   bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-100'>
            {/* Product */}
            <div className={`w-[100%]   relative flex justify-between items-start font-robotoCondensed p-5 h-full overflow-scroll`}>
                <div className='w-full h-full flex flex-col gap-10 items-start bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-100'>
                    {/* header */}
                    <div className='w-full h-[70px] flex justify-between items-center bg-white shadow-xl p-5 rounded-xl'>
                        <div className='w-fit h-fit flex justify-between items-start gap-4 cursor-pointer'>
                            <p onClick={() => { handlecategory('view') }} className={`text-xl font-bold ${categoryview ? "text-blue-800 transition-all duration-100 ease-in-out" : ""}`}>
                                Product View</p>
                            <p onClick={() => { handlecategory('upload') }} className={`text-xl font-bold ${categoryupload ? "text-blue-800 transition-all duration-100 ease-in-out" : ""}`}>
                                Add Product</p>
                        </div>
                        <NavLink to='/admin'>
                            <p className='text-xl font-bold'>Home</p>
                        </NavLink>
                    </div>
                    {/* Product View */}
                    <div
                        className={`w-full bg-white rounded-xl transition-all duration-500 ease-in-out ${categoryview ? "flex flex-col opacity-100" : "hidden opacity-0"}`}>
                        <table className="table-auto w-full bg-white border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Category & SubCategory</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Brand</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Old Price</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">New Price</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Discount</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Count In Stock</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Rating</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Is Featured</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Is NewArrival</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Is Popular</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            {productData?.ProductList?.length > 0 &&
                                productData?.ProductList?.map((item, index) => (
                                    <tbody key={index}>
                                        <tr className="hover:bg-gray-50">

                                            {/* Name */}
                                            <td className="border border-gray-300 px-4 py-2 font-semibold">{item.name}</td>

                                            {/* Description */}

                                            <td className="border border-gray-300 px-4 py-2 ">
                                                <p className='line-clamp-3'>{item.discription}</p>
                                            </td>


                                            {/* Image */}
                                            <td className="border border-gray-300 px-4 py-2 flex justify-center items-center">
                                                <div className="w-[110px] h-[110px] rounded-md bg-gray-200 ">
                                                    <img
                                                        className="w-full h-full  p-1"
                                                        src={item.images[0]}
                                                    />
                                                </div>
                                            </td>

                                            {/* Category & Sub Category */}
                                            <td className="border border-gray-300 px-4 py-2 font-semibold">{item.category.name}:<span className='ml-2 font-medium text-gray-500'>{item.subcat}</span> </td>

                                            {/* Brand */}
                                            <td className="border border-gray-300 px-4 py-2 font-semibold">{item.brand}</td>

                                            {/* Old Price */}
                                            <td className="border border-gray-300 px-4 py-2 text-red-500 font-semibold">
                                            <span className='text-black font-semibold'>Rs.</span>{item.oldprice}
                                            </td>

                                            {/* New Price */}
                                            <td className="border border-gray-300 px-4 py-2 text-green-500 font-semibold">
                                            <span className='text-black font-semibold'>Rs.</span>{item.newPrice}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-green-500 font-semibold">
                                                <span className='text-black font-semibold'>OFF:-</span>{item.disCount}
                                            </td>
                                            {/* Count In Stock */}
                                            <td className="border border-gray-300 px-4 py-2">{item.countInstock}</td>

                                            {/* Rating */}
                                            <td className="border border-gray-300 px-4 py-2">{item.rating} ⭐</td>

                                            {/* Is Featured */}
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.isFeatured ? (
                                                    <span className="px-3 py-1 bg-green-500 text-white rounded-full">Yes</span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-red-500 text-white rounded-full">No</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.isnewarrival ? (
                                                    <span className="px-3 py-1 bg-green-500 text-white rounded-full">Yes</span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-red-500 text-white rounded-full">No</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.ispopproduct ? (
                                                    <span className="px-3 py-1 bg-green-500 text-white rounded-full">Yes</span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-red-500 text-white rounded-full">No</span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className=" border border-gray-300 px-4 py-2">
                                                <div className="flex flex-col items-center gap-2">
                                                    <FaEye
                                                        onClick={() => { handlepreview(item._id) }}
                                                        className="text-4xl text-white bg-blue-800 p-2 rounded-xl hover:bg-blue-900 cursor-pointer"
                                                    />
                                                    {ispreview && proID == item._id && (
                                                        <Adminproductview

                                                            id={item._id}
                                                            src={item.images}
                                                            name={item.name}
                                                            description={item.discription}
                                                            techData={item.techData}
                                                            brand={item.brand}
                                                            categoryname={item.category.name}
                                                            inStock={item.countInstock}
                                                            oldPrice={item.oldprice}
                                                            newPrice={item.newPrice}
                                                            disCount={item.disCount}
                                                            rating={item.rating}
                                                            open={!!ispreview}
                                                            onclose={closepreview} />
                                                    )}
                                                    <div className='flex justify-center items-center gap-2'>
                                                        <MdModeEdit
                                                            onClick={() => handleEdit(item._id)}
                                                            className="text-4xl text-white bg-green-600 p-2 rounded-xl hover:bg-green-800 cursor-pointer"
                                                        />
                                                        <MdDelete
                                                            onClick={() => handleDelete(item._id)}
                                                            className="text-4xl text-white bg-red-600 p-2 rounded-xl hover:bg-red-800 cursor-pointer"
                                                        />
                                                    </div>

                                                </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                        <div className="w-full bg-white h-[50px] flex justify-center items-center">
                            <Pagination page={currentPage}  count={productData?.totalpage} onChange={handleChangePage} color="primary" />
                        </div>
                    </div>

                    {/* Product upload */}
                    <div className={`w-full   bg-white p-4 rounded-xl transition-all duration-500 ease-in-out ${categoryupload ? "flex flex-col items-start opacity-100" : "hidden opacity-0 "}`}>
                        <p className='text-2xl font-bold text-gray-500'>Basic Information For Product</p>
                        <form onSubmit={handleProductsubmit} className='w-full flex flex-col items-start gap-8 p-4 mt-5'>
                            <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Name of Category" : ""}`} name='name' className='w-full text-xl'
                                onChange={onChangeInput} label="Product Name" variant="outlined" value={productval.name} />
                            <textarea name='discription' className='w-full text-xl p-2 border-[1px] border-gray-400 rounded-lg'
                                onChange={onChangeInput} placeholder='Description' value={productval.discription} />

                            <div className='w-full flex justify-between items-center gap-4'>
                                <div className='w-full flex flex-col items-start gap-2'>
                                    <p className='text-xl font-semibold text-gray-400'>Category</p>
                                    <Select
                                        id="demo-simple-select-error"
                                        value={catval}
                                        onChange={setproductcat}
                                        label="Category"
                                        inputProps={{ 'aria-label': 'without label' }}
                                        className="w-full text-black"
                                    >
                                        {/* Default Menu Item */}
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                        {/* Dynamically Rendered Categories */}
                                        {catdata?.Categoreylist?.length > 0 ? (
                                            catdata.Categoreylist.map((item, index) => (
                                                <MenuItem value={item._id} key={index}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="" disabled>
                                                No Categories Available
                                            </MenuItem>
                                        )}
                                    </Select>
                                </div>
                                <div className='w-full flex flex-col items-start gap-2'>
                                    <p className='text-xl font-semibold text-gray-400'>Sub Category</p>
                                    <Select
                                        id="demo-simple-select-error"
                                        value={subcatdata}
                                        onChange={setproductsubcat}
                                        label="Category"
                                        inputProps={{ 'aria-label': 'without label' }}
                                        className="w-full text-black"
                                    >
                                        {/* Default Menu Item */}
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                        {/* Dynamically Rendered Categories */}
                                        {subcatval?.length > 0 ? (
                                            subcatval?.map((item, index) => (
                                                <MenuItem value={item} key={index}>
                                                    {item}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="" disabled>
                                                No Categories Available
                                            </MenuItem>
                                        )}
                                    </Select>
                                </div>
                                <div className='w-full flex justify-between items-center mt-9'>
                                    <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Brand Name of Category" : ""}`}
                                        name='brand' className='w-full  text-xl'
                                        onChange={onChangeInput} label="Brand Name" variant="outlined" value={productval.brand} />
                                </div>
                            </div>

                            <div className='w-full flex justify-between items-center gap-4'>
                                <TextField error={!!err} type='number' id="standard-error-helper-text" helperText={`${err ? "Incorrect Old Price of Product" : ""}`} name='oldprice' className='w-full text-xl'
                                    onChange={onChangeInput} value={productval.oldprice} label="Old Price of Product" variant="outlined" />

                                <TextField error={!!err} type='number' id="standard-error-helper-text" helperText={`${err ? "Incorrect New Price of Product" : ""}`} name='newPrice' className='w-full text-xl'
                                    onChange={onChangeInput} value={productval.newPrice} label="New Price of Product" variant="outlined" />

                                <TextField error={!!err} type='number' id="standard-error-helper-text" helperText={`${err ? "Incorrect New Price of Product" : ""}`} name='disCount' className='w-full text-xl'
                                    onChange={onChangeInput} value={productval.disCount} label="Discount for the Product" variant="outlined" />

                                <TextField error={!!err} type='number' id="standard-error-helper-text" helperText={`${err ? "Incorrect stock value of Product" : ""}`} name='countInstock' className='w-full text-xl'
                                    onChange={onChangeInput} value={productval.countInstock} label="Product stock" variant="outlined" />
                            </div>
                            {/* Is Featured & Is NewArrival & Is Popular Product   */}
                            <div className='w-full flex justify-between items-center gap-4'>
                                <div className='w-full flex flex-col items-start gap-2'>
                                    <p className='text-xl font-semibold text-gray-400'>IsFeatured</p>
                                    <Select
                                        id="demo-simple-select-error"
                                        value={isfeaturevalue}
                                        onChange={setproductisfeature}
                                        label="IsFeatured"
                                        inputProps={{ 'aria-label': 'without label' }}
                                        className="w-full text-black"
                                    >
                                        {/* Default Menu Item */}
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={true} name='true'>True</MenuItem>
                                        <MenuItem value={false} name='false'>False</MenuItem>
                                    </Select>
                                </div>
                                <div className='w-full flex flex-col items-start gap-2'>
                                    <p className='text-xl font-semibold text-gray-400'>IsNewArrival</p>
                                    <Select
                                        id="demo-simple-select-error"
                                        value={isNewArrival}
                                        onChange={setproductisnewarrival}
                                        label="IsFeatured"
                                        inputProps={{ 'aria-label': 'without label' }}
                                        className="w-full text-black"
                                    >
                                        {/* Default Menu Item */}
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={true} name='true'>True</MenuItem>
                                        <MenuItem value={false} name='false'>False</MenuItem>
                                    </Select>
                                </div>
                                <div className='w-full flex flex-col items-start gap-2'>
                                    <p className='text-xl font-semibold text-gray-400'>Is Popular Product</p>
                                    <Select
                                        id="demo-simple-select-error"
                                        value={ispopularPro}
                                        onChange={setproductispoppro}
                                        label="IsFeatured"
                                        inputProps={{ 'aria-label': 'without label' }}
                                        className="w-full text-black"
                                    >
                                        {/* Default Menu Item */}
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={true} name='true'>True</MenuItem>
                                        <MenuItem value={false} name='false'>False</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            {/* Rating */}
                            <div className='w-full flex flex-col items-start gap-2'>
                                <p className='text-gray-400 text-xl'>Rating</p>
                                <Rating name="rating"
                                    value={value}
                                    precision={0.5}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                        setproductval(() => ({
                                            ...productval,
                                            rating: newValue
                                        }))
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                            </div>
                            {/* Image Uplaoad */}
                            <div className='w-full flex flex-col items-start gap-4'>
                                <p>ADD Images of the Product</p>
                                <div className='w-full flex justify-between items-center gap-2'>
                                    <TextField
                                        error={!!err}
                                        id="standard-error-helper-text"
                                        helperText={`${err ? "Incorrect Images of Product" : ""}`}
                                        name='Images'
                                        className='w-[90%] text-xl'
                                        label="Add Product Images URL"
                                        variant="outlined"
                                        inputRef={imgref}
                                    />
                                    <button
                                        className='w-[10%] h-[50px] bg-blue-800 text-white rounded-xl'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            OnaddproImages();
                                        }}
                                    >
                                        ADD
                                    </button>
                                </div>
                                <p>Product Images</p>

                                {/* Display Added Images */}
                                <div className='w-full flex flex-col items-start gap-4'>
                                    {addimg?.length > 0 ? (
                                        <div className='w-full flex flex-wrap items-center gap-2'>
                                            {addimg.map((image, index) => (
                                                <div key={index} className='flex flex-col items-center'>
                                                    <div className='relative w-[150px] h-[250px]'>
                                                        <img
                                                            className=' relative w-full h-full rounded-lg border-[1px] border-gray-400 p-2'
                                                            src={image}
                                                            alt={`Product Image ${index + 1}`}
                                                        />
                                                        <MdDelete
                                                            className='w-[30px] h-[30px] absolute -top-2
                                                         -right-2 bg-red-500 hover:bg-red-700 text-white rounded-full p-1'
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleDeleteImage(index)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No images added yet.</p>
                                    )}
                                </div>

                                {/* Button to Remove All Images */}
                                {addimg && <button
                                    className='mt-4 px-4 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-900'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        removeAllImages()
                                    }}
                                >
                                    Remove All Images
                                </button>}
                            </div>

                            {/* Add New Technical Detail */}
                            <div className="w-full flex flex-col gap-4 mt-6">
                                <h3 className="text-lg font-semibold">Technical Details</h3>


                                <div className="w-full flex gap-4 items-center">
                                    <TextField
                                        label="Key"
                                        name="techKey"
                                        variant="outlined"
                                        value={newTech.key}
                                        onChange={(e) => setNewTech({ ...newTech, key: e.target.value })}
                                        className="w-1/2"
                                    />
                                    <TextField
                                        label="Value"
                                        name="techValue"
                                        variant="outlined"
                                        value={newTech.value}
                                        onChange={(e) => setNewTech({ ...newTech, value: e.target.value })}
                                        className="w-1/2"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddTechDetail();
                                        }}
                                        className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
                                    >
                                        Add
                                    </button>
                                </div>

                                {/* Display Added Technical Details */}
                                <div className="w-full flex flex-col gap-2">
                                    {Object.entries(techData).length > 0 ? (
                                        Object.entries(techData).map(([key, value], index) => (
                                            <div key={index} className="flex justify-start items-center gap-2 border p-2 rounded-md">
                                                <span className="font-medium">{key}:</span>
                                                <span className="text-gray-500">{value}</span>
                                                <button
                                                    onClick={() => handleRemoveTechDetail(key)}
                                                    className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 italic">No technical details added yet.</p>
                                    )}
                                </div>
                            </div>




                            <div className='w-full flex justify-center items-center mt-10'>
                                <button onClick={() => { !err && setisloading(true) }} type='submit' className='w-[150px] h-[60px] text-white  bg-blue-800 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-900'>
                                    <MdPublish className='text-xl' />
                                    <p className='text-[18px] font-bold'>Publish</p>
                                </button>
                            </div>


                        </form>

                    </div>

                </div>

            </div>
            {/* Edit Categorey */}
            <Dialog
                PaperProps={{
                    style: { maxWidth: 'none', width: '90%' }, // Default responsive width
                }}
                onClose={(handleClose)} open={open} className='w-full font-robotoCondensed'>

                <div className={`w-full   bg-white p-4 rounded-xl transition-all duration-500 ease-in-out ${open ? "flex flex-col items-start opacity-100" : "hidden opacity-0 "}`}>
                    <p className='text-2xl font-bold text-gray-500'>Basic Information For Product</p>
                    <form onSubmit={handleditproductsubmit} className='w-full flex flex-col items-start gap-8 p-4 mt-5'>
                        <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Name of Category" : ""}`} name='name' className='w-full text-xl'
                            onChange={onChangeInput} label="Product Name" variant="outlined" value={productval.name} />
                        <textarea name='discription' className='w-full text-xl p-2 border-[1px] border-gray-400 rounded-lg'
                            onChange={onChangeInput} placeholder='Description' value={productval.discription} />

                        <div className='w-full flex justify-between items-center gap-4'>
                            <div className='w-full flex flex-col items-start gap-2'>
                                <p className='text-xl font-semibold text-gray-400'>Category</p>
                                <Select
                                    id="demo-simple-select-error"
                                    value={catval}
                                    onChange={setproductcat}
                                    label="Category"
                                    inputProps={{ 'aria-label': 'without label' }}
                                    className="w-full text-black"
                                >
                                    {/* Default Menu Item */}
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>

                                    {/* Dynamically Rendered Categories */}
                                    {catdata?.Categoreylist?.length > 0 ? (
                                        catdata.Categoreylist.map((item, index) => (
                                            <MenuItem value={item._id} key={index}>
                                                {item.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem value="" disabled>
                                            No Categories Available
                                        </MenuItem>
                                    )}
                                </Select>
                            </div>
                            <div className='w-full flex flex-col items-start gap-2'>
                                <p className='text-xl font-semibold text-gray-400'>Sub Category</p>
                                <Select
                                    id="demo-simple-select-error"
                                    value={subcatdata}
                                    onChange={setproductsubcat}
                                    label="Category"
                                    inputProps={{ 'aria-label': 'without label' }}
                                    className="w-full text-black"
                                >
                                    {/* Default Menu Item */}
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>

                                    {/* Dynamically Rendered Categories */}
                                    {subcatval?.length > 0 ? (
                                        subcatval?.map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem value="" disabled>
                                            No Categories Available
                                        </MenuItem>
                                    )}
                                </Select>
                            </div>
                            <div className='w-full flex justify-between items-center mt-9'>
                                <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Brand Name of Category" : ""}`}
                                    name='brand' className='w-full  text-xl'
                                    onChange={onChangeInput} label="Brand Name" variant="outlined" value={productval.brand} />

                            </div>
                        </div>

                        <div className='w-full flex justify-between items-center gap-4'>
                            <TextField error={!!err} type='number' id="standard-error-helper-text" helperText={`${err ? "Incorrect Old Price of Product" : ""}`} name='oldprice' className='w-full text-xl'
                                onChange={onChangeInput} value={productval.oldprice} label="Old Price of Product" variant="outlined" />

                            <TextField error={!!err} type='number' id="standard-error-helper-text" helperText={`${err ? "Incorrect New Price of Product" : ""}`} name='newPrice' className='w-full text-xl'
                                onChange={onChangeInput} value={productval.newPrice} label="New Price of Product" variant="outlined" />

                            <TextField error={!!err} type='number' id="standard-error-helper-text" helperText={`${err ? "Incorrect New Price of Product" : ""}`} name='disCount' className='w-full text-xl'
                                    onChange={onChangeInput} value={productval.disCount} label="Discount for the Product" variant="outlined" />

                            <TextField error={!!err} type='number' id="standard-error-helper-text" helperText={`${err ? "Incorrect stock value of Product" : ""}`} name='countInstock' className='w-full text-xl'
                                onChange={onChangeInput} value={productval.countInstock} label="Product stock" variant="outlined" />
                        </div>
                        {/* Is Featured */}
                        <div className='w-full flex justify-between items-center gap-4'>
                            <div className='w-full flex flex-col items-start gap-2'>
                                <p className='text-xl font-semibold text-gray-400'>IsFeatured</p>
                                <Select
                                    id="demo-simple-select-error"
                                    value={isfeaturevalue}
                                    onChange={setproductisfeature}
                                    label="IsFeatured"
                                    inputProps={{ 'aria-label': 'without label' }}
                                    className="w-full text-black"
                                >
                                    {/* Default Menu Item */}
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={true} name='true'>True</MenuItem>
                                    <MenuItem value={false} name='false'>False</MenuItem>
                                </Select>
                            </div>
                            <div className='w-full flex flex-col items-start gap-2'>
                                    <p className='text-xl font-semibold text-gray-400'>IsNewArrival</p>
                                    <Select
                                        id="demo-simple-select-error"
                                        value={isNewArrival}
                                        onChange={setproductisnewarrival}
                                        label="IsFeatured"
                                        inputProps={{ 'aria-label': 'without label' }}
                                        className="w-full text-black"
                                    >
                                        {/* Default Menu Item */}
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={true} name='true'>True</MenuItem>
                                        <MenuItem value={false} name='false'>False</MenuItem>
                                    </Select>
                                </div>
                                <div className='w-full flex flex-col items-start gap-2'>
                                    <p className='text-xl font-semibold text-gray-400'>Is Popular Product</p>
                                    <Select
                                        id="demo-simple-select-error"
                                        value={ispopularPro}
                                        onChange={setproductispoppro}
                                        label="IsFeatured"
                                        inputProps={{ 'aria-label': 'without label' }}
                                        className="w-full text-black"
                                    >
                                        {/* Default Menu Item */}
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={true} name='true'>True</MenuItem>
                                        <MenuItem value={false} name='false'>False</MenuItem>
                                    </Select>
                                </div>
                        </div>
                        {/* Rating */}
                        <div className='w-full flex flex-col items-start gap-2'>
                            <p className='text-gray-400 text-xl'>Rating</p>
                            <Rating name="rating"
                                value={value}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    setproductval(() => ({
                                        ...productval,
                                        rating: newValue
                                    }))
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                        </div>
                        {/* Image Uplaoad */}
                        <div className='w-full flex flex-col items-start gap-4'>
                            <p>ADD Images of the Product</p>
                            <div className='w-full flex justify-between items-center gap-2'>
                                <TextField
                                    error={!!err}
                                    id="standard-error-helper-text"
                                    helperText={`${err ? "Incorrect Images of Product" : ""}`}
                                    name='Images'
                                    className='w-[90%] text-xl'
                                    label="Add Product Images URL"
                                    variant="outlined"
                                    inputRef={imgref}
                                />
                                <button
                                    className='w-[10%] h-[50px] bg-blue-800 text-white rounded-xl'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        OnaddproImages();
                                    }}
                                >
                                    ADD
                                </button>
                            </div>
                            <p>Product Images</p>

                            {/* Display Added Images */}
                            <div className='w-full flex flex-col items-start gap-4'>
                                {addimg?.length > 0 ? (
                                    <div className='w-full flex flex-wrap items-center gap-2'>
                                        {addimg.map((image, index) => (
                                            <div key={index} className='flex flex-col items-center'>
                                                <div className='relative w-[150px] h-[250px]'>
                                                    <img
                                                        className=' relative w-full h-full rounded-lg border-[1px] border-gray-400 p-2'
                                                        src={image}
                                                        alt={`Product Image ${index + 1}`}
                                                    />
                                                    <MdDelete
                                                        className='w-[30px] h-[30px] absolute -top-2
                                                         -right-2 bg-red-500 hover:bg-red-700 text-white rounded-full p-1'
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeleteImage(index)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No images added yet.</p>
                                )}
                            </div>

                            {/* Button to Remove All Images */}
                            {addimg && <button
                                className='mt-4 px-4 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-900'
                                onClick={(e) => {
                                    e.preventDefault()
                                    removeAllImages()
                                }}
                            >
                                Remove All Images
                            </button>}
                        </div>
                        {/* TechData */}
                        <div className="w-full flex flex-col gap-4 mt-6">
                                <h3 className="text-lg font-semibold">Technical Details</h3>


                                <div className="w-full flex gap-4 items-center">
                                    <TextField
                                        label="Key"
                                        name="techKey"
                                        variant="outlined"
                                        value={newTech.key}
                                        onChange={(e) => setNewTech({ ...newTech, key: e.target.value })}
                                        className="w-1/2"
                                    />
                                    <TextField
                                        label="Value"
                                        name="techValue"
                                        variant="outlined"
                                        value={newTech.value}
                                        onChange={(e) => setNewTech({ ...newTech, value: e.target.value })}
                                        className="w-1/2"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddTechDetail();
                                        }}
                                        className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
                                    >
                                        Add
                                    </button>
                                </div>

                                {/* Display Added Technical Details */}
                                <div className="w-full flex flex-col gap-2">
                                    {Object.entries(techData).length > 0 ? (
                                        Object.entries(techData).map(([key, value], index) => (
                                            <div key={index} className="flex justify-start items-center gap-2 border p-2 rounded-md">
                                                <span className="font-medium">{key}:</span>
                                                <span className="text-gray-500">{value}</span>
                                                <button
                                                    onClick={() => handleRemoveTechDetail(key)}
                                                    className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 italic">No technical details added yet.</p>
                                    )}
                                </div>
                        </div>

                        <div className='w-full flex justify-center items-center gap-5 mt-10'>
                            <button onClick={() => { !err && setisloading(true) }} type='submit' className='w-[150px] h-[60px] text-white  bg-blue-800 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-900'>
                                <MdPublish className='text-xl' />
                                <p className='text-[18px] font-bold'>Update</p>
                            </button>
                            <p onClick={handleClose} className='w-[150px] h-[60px] rounded-2xl flex justify-center items-center text-blue-800 font-bold border-[1px] border-blue-800 cursor-pointer'>
                                Cancel
                            </p>
                        </div>


                    </form>


                </div>

            </Dialog>
            {/* Delete Categorey */}
            <Dialog open={isDelete} onClose={() => { setisDelete(false) }} className='w-full font-robotoCondensed '>
                <form onSubmit={handleDeleteSubmit} className='w-full h-[200px] flex flex-col items-start gap-16 p-5 rounded-2xl'>
                    <p className='text-xl font-bold'>You Want to Delete the Category</p>
                    <div className='w-full flex justify-center items-center gap-5'>
                        <button onClick={() => {
                            setisloading(true);
                            setisDelete(false)
                        }} type='submit' className='w-[120px] h-[60px] rounded-2xl flex justify-center items-center text-white font-bold bg-blue-800 cursor-pointer'>
                            Delete
                        </button>
                        <p onClick={() => { setisDelete(false) }} className='w-[120px] h-[60px] rounded-2xl flex justify-center items-center text-blue-800 font-bold border-[1px] border-blue-800 cursor-pointer'>
                            Cancel
                        </p>
                    </div>
                </form>
            </Dialog>
            {/* Loader */}
            {isloading && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
                    <CircularProgress className="text-blue-800" color="inherit" />
                </div>
            )}
        </div>
    )
}

export default AddProductpage
