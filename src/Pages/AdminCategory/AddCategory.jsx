import React, { useContext, useEffect, useRef, useState } from 'react';
import Mycontext from '../Mycontext/Mycontext'
import { NavLink } from 'react-router-dom';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import TextField from '@mui/material/TextField';
import { MdPublish } from "react-icons/md";
import { deleteData, fetchData, postData, putData } from '../../Components/Admin/api';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';

const AddCategory = () => {
    const context = useContext(Mycontext);
    const [open, setopen] = useState(false);
    const [categoryview, setcategoryview] = useState(true);
    const [categoryupload, setcategoryupload] = useState(false);
    const [categoryval, setcategoryval] = useState({
        name: '',
        subcat: [],
        images: [],
        color: ''
    });
    const [catdata, setcatdata] = useState([]);
    const [EditId, setEditId] = useState(null);
    const [isloading, setisloading] = useState(false);
    const [isDelete, setisDelete] = useState(false);
    const [err, seterr] = useState(false);
    const [subcatdata, setsubcatdata] = useState([]);
    const subref = useRef();


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


    //Posting the Category Data
    const onChangeInput = (e) => {
        setcategoryval(() => ({
            ...categoryval,
            [e.target.name]: e.target.value
        }))
    }
    const addImgurl = (e) => {
        const arr = []
        arr.push(e.target.value);
        setcategoryval(() => ({
            ...categoryval,
            [e.target.name]: arr
        }))

    }
    const handlecategorysubmit = (e) => {
        e.preventDefault();
        categoryval.subcat = subcatdata
        console.log(categoryval);
        if (categoryval.name !== '' && categoryval.images.length !== 0 && categoryval.color !== '') {
            postData("/api/Category/create", categoryval).then(res => {
                console.log(res);
                fetchData("/api/Category").then(res => {
                    setcatdata(res);
                })
                setisloading(false);
            })
            setcategoryview(true);
            setcategoryupload(false);
            seterr(false);
        }
        else {
            seterr(true);
        }

    }


    //View for Category Data
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData("/api/Category").then(res => {
            setcatdata(res);
        })
    }, [])
    const handlechange = (event, value) => {
        fetchData(`/api/Category?page=${value}`).then(res => {
            setcatdata(res);
            
        })

    }

    //EditIng the Category Data
    const handleEdit = (id) => {

        setEditId(id);
        fetchData(`/api/Category/${id}`).then(res => {
            setcategoryval({
                name: res.name,
                images: res.images,
                color: res.color
            })
            setsubcatdata(res.subcat);
        })
        setopen(true);
    }
    const handleClose = () => {
        setopen(false);
    }
    const handleeditcategorysubmit = (e) => {
        e.preventDefault();
        categoryval.subcat=subcatdata;
        if (categoryval.name !== '' && categoryval.images.length !== 0 && categoryval.color !== '') {
            putData(`/api/Category/${EditId}`, categoryval).then(res => {
                fetchData("/api/Category").then(res => {
                    setcatdata(res);
                })
                setisloading(false);
                setopen(false);
            })
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
        deleteData(`/api/Category/${EditId}`).then(res => {

            fetchData("/api/Category").then(res => {
                setcatdata(res);
            })

        })
        setisloading(false);

    }

    //Some Usefull Function
    function handlecategory(value) {
        setcategoryview(value === 'view');
        setcategoryupload(value === 'upload');
    }

    //Sub cat Addition
    const subcatadd = () => {
        const subcatdata = subref.current.value;
        if (subcatdata) {
            setsubcatdata((prev) => [...prev, subcatdata]); // Properly updating the state
            subref.current.value = ""; // Clear the input after adding
        }
    }
    const handleDeleteSubCat = (index) => {
        setsubcatdata((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <div className='w-full h-full  relative flex justify-center   bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-100 '>
            {/* Categorey */}
            <div className={`w-[90%]  relative flex justify-between items-start font-robotoCondensed p-5 h-full overflow-scroll`}>
                <div className='w-full h-full flex flex-col gap-10 items-start bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-100'>
                    {/* header */}
                    <div className='w-full h-[70px] flex justify-between items-center bg-white shadow-xl p-5 rounded-xl'>
                        <div className='w-fit h-fit flex justify-between items-start gap-4 cursor-pointer'>
                            <p onClick={() => { handlecategory('view') }} className={`text-xl font-bold ${categoryview ? "text-blue-800 transition-all duration-100 ease-in-out" : ""}`}>
                                Category View</p>
                            <p onClick={() => { handlecategory('upload') }} className={`text-xl font-bold ${categoryupload ? "text-blue-800 transition-all duration-100 ease-in-out" : ""}`}>
                                Add Category</p>
                        </div>
                        <NavLink to='/admin'>
                            <p className='text-xl font-bold'>Home</p>
                        </NavLink>
                    </div>
                    {/* Category View */}
                    <div
                        className={`w-full bg-white rounded-xl transition-all duration-500 ease-in-out ${categoryview ? "flex flex-col opacity-100" : "hidden opacity-0"}`}>
                        <table className="table-auto w-full bg-white border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-left">UID</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Sub Category</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Color</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            {catdata?.Categoreylist?.length !== 0 && catdata?.Categoreylist?.map((item, index) => (
                                <tbody>

                                    <tr key={index} className="hover:bg-gray-50">
                                        {/* UID */}
                                        <td className="border border-gray-300 px-4 py-2 font-semibold">{index + 1}</td>

                                        {/* Image */}
                                        <td className="border border-gray-300 px-4 py-2 flex justify-center items-center">
                                            <div className="w-[100px] h-[100px] rounded-full" style={{ backgroundColor: item.color }}>
                                                <img className="w-full h-full object-cover p-3" src={item.images[0]} alt={item.name} />
                                            </div>
                                        </td>

                                        {/* Name */}
                                        <td className="border border-gray-300 px-4 py-2 font-semibold">{item.name}</td>
                                        {/* Sub Category */}
                                        <td className='border border-gray-300 px-4 py-2 font-semibold'>

                                            {item.subcat?.length > 0 ? (
                                                <div className='flex justify-start items-center gap-2'>
                                                    {item.subcat.map((i, index) => (
                                                        <p key={index} className='w-fit h-[30px] bg-blue-800 text-white rounded-2xl p-3 flex justify-center items-center'>{i}</p>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p> No sub Category</p>
                                            )}
                                        </td>
                                        {/* Color */}
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className="px-3 py-1 rounded-full text-white" style={{ backgroundColor: item.color }}>
                                                {item.color}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="border border-gray-300 px-4 py-2">
                                            <div className="flex justify-center items-center gap-2">
                                                <MdModeEdit
                                                    onClick={() => handleEdit(item._id)}
                                                    className="text-4xl text-white bg-green-600 p-2 rounded-xl hover:bg-green-800 cursor-pointer"
                                                />
                                                <MdDelete
                                                    onClick={() => handleDelete(item._id)}
                                                    className="text-4xl text-white bg-red-600 p-2 rounded-xl hover:bg-red-800 cursor-pointer"
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>))}
                        </table>
                        <div className='w-full bg-white h-[50px] flex justify-center items-center'>
                            <Pagination count={catdata?.totalpage} onChange={handlechange} color="primary" />
                        </div>
                    </div>
                    {/* Category upload */}
                    <div className={`w-full h-full  bg-white p-4 rounded-xl transition-all duration-500 ease-in-out ${categoryupload ? "flex flex-col items-start opacity-100" : "hidden opacity-0 "}`}>
                        <p className='text-2xl font-bold text-gray-500'>Basic Information For Category</p>
                        <form onSubmit={handlecategorysubmit} className='w-full flex flex-col items-start gap-3 p-4 mt-5'>
                            <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Name of Category" : ""}`} name='name' className='w-full text-xl'
                                onChange={onChangeInput} label="Categorey Name" variant="outlined" />
                            <div className='w-full flex flex-col items-start gap-2'>
                                {/* Sub cat Add */}
                                <div className='w-full flex justify-between items-center gap-2'>
                                    <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Images of Category" : ""}`}
                                        name='images' className='w-[90%] text-xl'
                                        inputRef={subref} label="Sub Category" variant="outlined" />
                                    <button
                                        className='w-[10%] h-[50px] bg-blue-800 text-white rounded-xl'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            subcatadd();
                                        }}
                                    >
                                        ADD
                                    </button>
                                </div>
                                <div className='w-full flex flex-col items-start gap-4'>
                                    {subcatdata?.length > 0 ? (
                                        <div className='w-full flex justify-start items-center gap-4'>
                                            {
                                                subcatdata?.map((i, index) => (
                                                    <div key={index} className='w-fit h-[40px] flex justify-center items-center gap-2 rounded-2xl p-3 bg-blue-800 text-white cursor-pointer'>
                                                        <RxCross1 className='text-white'
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleDeleteSubCat(index)
                                                            }} />
                                                        <p>{i}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) :
                                        (
                                            <p>No Sub Categorey added yet.</p>
                                        )
                                    }
                                </div>

                            </div>
                            <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Images of Category" : ""}`} name='images' className='w-full text-xl'
                                onChange={addImgurl} label="Image URL" variant="outlined" />
                            <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Color of Category" : ""}`} name='color' className='w-full text-xl'
                                onChange={onChangeInput} label="Color" variant="outlined" />
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
                style: { maxWidth: 'none', width: '60%' }, // Default responsive width
            }}
             onClose={(handleClose)} open={open} className='w-full font-robotoCondensed'>

                <div className={`w-full h-[500px]  bg-white p-5 rounded-xl transition-all duration-500 ease-in-out flex flex-col items-start opacity-100" `}>
                    <p className='text-2xl font-bold text-gray-500'>Edit Category</p>
                    <form onSubmit={handleeditcategorysubmit} className='w-full flex flex-col items-start gap-6 p-4 mt-5'>
                        <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Name of Category" : ""}`}
                            name='name' className='w-full text-xl'
                            onChange={onChangeInput} label="Categorey Name" variant="outlined" value={categoryval.name} />
                        <div className='w-full flex flex-col items-start gap-2'>
                            {/* Sub cat Add */}
                            <div className='w-full flex justify-between items-center gap-2'>
                                <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Images of Category" : ""}`}
                                    name='images' className='w-[90%] text-xl'
                                    inputRef={subref} label="Sub Category" variant="outlined" />
                                <button
                                    className='w-[10%] h-[50px] bg-blue-800 text-white rounded-xl'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        subcatadd();
                                    }}
                                >
                                    ADD
                                </button>
                            </div>
                            <div className='w-full flex flex-col items-start gap-4'>
                                {subcatdata?.length > 0 ? (
                                    <div className='w-full flex justify-start items-center gap-4'>
                                        {
                                            subcatdata?.map((i, index) => (
                                                <div key={index} className='w-fit h-[40px] flex justify-center items-center gap-2 rounded-2xl p-3 bg-blue-800 text-white cursor-pointer'>
                                                    <RxCross1 className='text-white'
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeleteSubCat(index)
                                                        }} />
                                                    <p>{i}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) :
                                    (
                                        <p>No Sub Categorey added yet.</p>
                                    )
                                }
                            </div>

                        </div>
                        <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Images of Category" : ""}`}
                            name='images' className='w-full text-xl'
                            onChange={addImgurl} label="Image URL" variant="outlined" value={categoryval.images} />

                        <TextField error={!!err} id="standard-error-helper-text" helperText={`${err ? "Incorrect Color of Category" : ""}`}
                            name='color' className='w-full text-xl'
                            onChange={onChangeInput} label="Color" variant="outlined" value={categoryval.color} />
                        <div className='w-full flex justify-center gap-5 items-center mt-10'>
                            <button onClick={() => {
                                setisloading(true)
                                setopen(false)
                            }} type='submit' className='w-[150px] h-[60px] text-white  bg-blue-800 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-900'>
                                <p className='text-[18px] '>Update</p>
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

export default AddCategory
