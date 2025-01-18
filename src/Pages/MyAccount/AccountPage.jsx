import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchData, putData } from '../../Components/Admin/api';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';


const AccountPage = () => {
    let { id } = useParams();
    const [userData, setuserData] = useState([]);
    const [edituserData, setedituserData] = useState({
        name: '',
        phoneNum: '',
        address:'',
    });
    const [open, setopen] = useState(false);
    const [isloading, setisloading] = useState(false);

    useEffect(() => {
        fetchData(`/api/User/${id}`).then((res) => {
            setuserData(res.user);
            edituserData.name=res.user?.name;
            edituserData.phoneNum=res.user?.phoneNum;
            edituserData.address=localStorage.getItem('Address');
        })
    }, [id])

    const onChangeInput = (e) => {
        setedituserData(() => ({
            ...edituserData,
            [e.target.name]: e.target.value
        }))
    }

    const handleuserEdit = () => {
        putData(`/api/User/${id}`,edituserData).then((res)=>{
            setisloading(true);
            localStorage.setItem('Address',edituserData.address);
            const user = {
                name: edituserData?.name,
                emal: userData?.email,
                userPhone:edituserData?.phoneNum,
                userID: userData?._id
            }
            localStorage.setItem("user", JSON.stringify(user));
            setTimeout(() => {
                setisloading(false);
                setopen(false);
                window.location.reload();
            }, 1000);
        })
    }

    return (
        <div className='w-full flex justify-center items-center font-robotoCondensed md:mt-0 mt-[160px]'>
            <div className='w-[70%] flex justify-center items-center mt-10 '>
                
                <div className='w-full flex flex-col items-start  '>
                    <p className='text-2xl font-extrabold '>My Account</p>
                    <div className='w-full flex md:flex-row flex-col justify-between items-center mt-10 gap-15' >
                        <div className='w-[200px] h-[200px] border-[10px] flex justify-center items-center border-gray-200 rounded-full bg-blue-800 text-white hover:bg-blue-900'>
                            <p className=' text-[80px] font-extrabold'>K</p>
                        </div>
                        <div className='w-full md:w-[70%] flex flex-col items-start gap-4 md:mt-0 mt-10'>
                            <p className='text-xl font-bold'>Account Information</p>
                            <div className='w-full md:w-[50%] flex flex-col items-start'>

                                <div className='w-full flex flex-col items-start gap-2 mt-2'>
                                    <p className='text-[16px]'>Full Name</p>
                                    <p className='text-[18px] font-medium'>{userData?.name}</p>
                                    <div className='w-full h-[2px] bg-gray-200'></div>
                                </div>
                                <div className='w-full flex flex-col items-start gap-2 mt-2'>
                                    <p className='text-[16px]'>Email ID</p>
                                    <p className='text-[18px] font-medium'>{userData?.email}</p>
                                    <div className='w-full h-[2px] bg-gray-200'></div>
                                </div>
                                <div className='w-full flex flex-col items-start gap-2 mt-2'>
                                    <p className='text-[16px]'>Phone Number</p>
                                    <p className='text-[18px] font-medium'>{userData?.phoneNum}</p>
                                    <div className='w-full h-[2px] bg-gray-200'></div>
                                </div>
                                <div className='w-full flex flex-col items-start gap-2 mt-2'>
                                    <p className='text-[16px]'>Default Address</p>
                                    <p className='text-[18px] font-medium'>{
                                        localStorage.getItem('Address').length > 0 ? localStorage.getItem('Address') : "Add address......"}</p>
                                    <div className='w-full h-[2px] bg-gray-200'></div>
                                </div>
                                <button onClick={() => { setopen(true) }} className='w-full h-[50px] text-white font-bold flex justify-center mt-4 items-center bg-blue-800 hover:bg-blue-900 rounded-lg text-xl'>
                                    Edit
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        {/* Editing User Data */}
            <Dialog
                PaperProps={{
                    style: { maxWidth: 'none', width: '50%' }, // Default responsive width
                }}
                onClose={() => { setopen(false) }} open={open} className='w-full font-robotoCondensed '>
                <div className='w-full  flex justify-center items-center relative p-5'>
                    <div className='w-[90%] h-full  flex flex-col items-start '>
                        <p className='text-xl font-bold'>Edit Personal Information</p>
                        <div className='w-full flex flex-col items-start gap-2 mt-8'>
                            <TextField className='w-full' type="text" label="Full Name"
                                name='name' onChange={onChangeInput} value={edituserData?.name} required variant="standard" />
                            <div className='w-full h-[2px] bg-gray-200'></div>
                        </div>
                        <div className='w-full flex flex-col items-start gap-2 mt-2'>
                            <TextField className='w-full' type="text" label="Phone Number"
                                name='phoneNum' onChange={onChangeInput} value={edituserData?.phoneNum} required variant="standard" />
                            <div className='w-full h-[2px] bg-gray-200'></div>
                        </div>
                        <div className='w-full flex flex-col items-start gap-2 mt-2'>
                            <TextField className='w-full' type="text" label="Default Address"
                                name='address' onChange={onChangeInput} value={edituserData.address} required variant="standard" />
                            <div className='w-full h-[2px] bg-gray-200'></div>
                        </div>
                        <div className='w-[90%] flex justify-between items-center  mt-8'>
                            <button onClick={handleuserEdit} className='w-[40%] h-[40px] text-white bg-blue-800 rounded-xl hover:bg-blue-900'>Submit</button>
                            <button onClick={() => { setopen(false) }} className='w-[40%] h-[40px] text-blue-800 border-[2px] rounded-xl border-blue-800'>Cancel</button>
                        </div>
                    </div>
                </div>
            </Dialog>
            {isloading && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
                    <CircularProgress className="text-blue-800" color="inherit" />
                </div>
            )}
        </div>
    )
}

export default AccountPage
