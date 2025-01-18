import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useState,useEffect } from "react";

const Homebaner = () => {

    const banners = [
        { id: 1, src: "https://res.cloudinary.com/dptxobcj6/image/upload/v1734257885/ihq0n1zk6al85j3s9ics.jpg" },
        { id: 2, src: "https://res.cloudinary.com/dptxobcj6/image/upload/v1734257972/thvfm6m7xavp27h0gvqv.png" },
        { id: 3, src: "https://res.cloudinary.com/dptxobcj6/image/upload/v1734258026/me1vwv5qfqj1kahz4uey.jpg" },
        { id: 4, src: "https://res.cloudinary.com/dptxobcj6/image/upload/v1734258057/us9wckm1cjfc7cvbedbi.jpg" },
        { id: 5, src: "https://res.cloudinary.com/dptxobcj6/image/upload/v1736540336/libas-art_f2361e97-dc18-4d40-938a-0e636c2df774_o74k9z.jpg" },
        { id: 6, src: "https://res.cloudinary.com/dptxobcj6/image/upload/v1734264876/HP_Rotating_Winter_6Nov2024_dvd5nc_sqiynd.jpg" },
        { id: 7, src: "https://res.cloudinary.com/dptxobcj6/image/upload/v1734264951/HP_Rotating_Ref_23Nov24_smhqt9_sjrcmf.jpg" },
        { id: 8, src: "https://res.cloudinary.com/dptxobcj6/image/upload/v1734264969/Blog1_t1jtzw.png" },
        { id: 9, src: "https://res.cloudinary.com/dptxobcj6/image/upload/v1734265555/Skincare-PC._CB539339241__keweyy.png" },
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      // Auto-slide functionality
      useEffect(() => {
        const interval = setInterval(() => {
          nextSlide();
        }, 3000); // Change slide every 5 seconds
        return () => clearInterval(interval); // Cleanup interval
      }, [currentIndex]);
    
      // Handlers for next and previous buttons
      const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      };
    
      const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
      };
    
      return (
        <div className="w-full flex justify-center items-center relative md:mt-0 mt-[160px]">
          <div className="relative w-[90%] overflow-hidden rounded-lg">
          {/* Slider Container */}
          <div
            className="w-full flex transition-transform duration-700"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {banners.map((banner) => (
              <img
                key={banner.id}
                src={banner.src}
                alt={`Banner ${banner.id}`}
                className="w-full h-[200px]  md:h-[400px] flex-shrink-0"
              />
            ))}
          </div>
    
          {/* Navigation Buttons */}
          <MdKeyboardArrowLeft
            onClick={prevSlide}
            className="w-[50px] h-[50px] text-black  absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white"
          />
          <MdKeyboardArrowRight
            onClick={nextSlide}
            className="w-[50px] h-[50px] text-black absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white"
          />
    
          {/* Dots for Slide Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-gray-800" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
        </div>
      )
    }
export default Homebaner