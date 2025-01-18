import React, { useEffect } from 'react'
import { useState } from 'react';
import { colors, Rating } from '@mui/material';
import { blue } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import StarIcon from '@mui/icons-material/Star';


const Sidebar = (props) => {

    const [lowerprice, setlowerprice] = useState([1, 200000]);
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    useEffect(() => {
        props.handleFilterPriceChange(lowerprice);
    }, [lowerprice])

    useEffect(() => {
        props.handleFilterRatingChange(value);
    }, [value])

    return (
        <div className='w-full flex flex-col items-start p-5 md:p-0'>
            {/* Category Filter */}
            {props.filterdata.length > 0 &&
            <div className="w-full flex flex-col items-start cursor-pointer z-1">
                <p className='text-xl font-semibold'>Category Filter</p>
                <div className='w-full flex flex-col items-start p-3 gap-2'>
                    {props.filterdata.length > 0 ? (
                        <>
                            {props.filterdata.map((i, index) => (

                                <FormControlLabel key={index}
                                    control={<Checkbox checked={props.selectedFilter === (props.filterdata.length < 8 ? i : i.name)}
                                        onChange={() => {
                                            props.onFilterChange(props.filterdata.length < 8 ? i : i.name)
                                        }
                                        }
                                    />
                                    }
                                    label={props.filterdata.length < 8 ? i : i.name}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 18, color: blue[900] } }}
                                />



                            ))}

                        </>) :
                        (<p className='w-full flex justify-center items-center'>loading...</p>)}

                </div>
            </div>}

            {/* Filter by Price */}
            <div className="w-full flex flex-col items-start cursor-pointer mt-6">
                <p className='text-[14px] md:text-xl font-semibold'>Filter by Price</p>
                <div className="w-full mt-4 flex flex-col items-start gap-2">
                    <RangeSlider min={1} max={200000} value={lowerprice} onInput={setlowerprice} />
                    <div className='w-full flex flex-row justify-between items-center mt-2 text-sm sm:text-base'>
                        <p className='font-robotoCondensed font-medium'>{`From Rs:${lowerprice[0]}`}</p>
                        <p className='font-robotoCondensed font-medium'>{`To Rs:${lowerprice[1]}`}</p>
                    </div>
                </div>
            </div>

            {/* Filter by Rating */}
            <div className="w-full flex flex-col items-start mt-6 cursor-pointer">
                <p className='text-[14px] md:text-xl font-semibold'>Filter by Rating</p>
                <div className='w-full flex flex-col items-start md:p-3 gap-2'>
                    <Rating name="rating"
                        value={value}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setValue(newValue);

                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                </div>
            </div>

            {/* Ads */}
            <div className='w-full hidden md:flex flex-col items-start mt-6 gap-4'>
                <img className='w-full  rounded-md' src="https://res.cloudinary.com/dptxobcj6/image/upload/v1734271537/sidebanner_oai3fm.png" />
                <img className='w-full  rounded-md' src="https://res.cloudinary.com/dptxobcj6/image/upload/v1736540263/D-UHP1.0-06122024-Winterwear-Superdry-Asos-Min30_tqluls.jpg" />
            </div>
        </div>

    )
}

export default Sidebar
