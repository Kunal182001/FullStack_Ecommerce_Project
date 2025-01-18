import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import Rating from '@mui/material/Rating';
import { FaMinus } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate, useParams } from 'react-router-dom';
import { CartData, deleteData, fetchData } from '../../Components/Admin/api';
import Productcards from '../../Components/Home/Productcards';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Mycontext from '../Mycontext/Mycontext';
import CircularProgress from '@mui/material/CircularProgress';


const ProductViewpage = () => {

  const [count, setcount] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isdiscrip, setdis] = useState(true);
  const [isaddinfo, setaddinfo] = useState(false);
  const [productData, setproductData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [Dis, setDis] = useState("");
  const [productaddinfo, setproductaddinfo] = useState({});
  const [relatedproduct, setrelatedproduct] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const prosliderRef = useRef(null);
  const [isloading, setisloading] = useState(false);
  const [isproductadd, setisproductadd] = useState(false);
  const [productadded, setproductadded] = useState(false);
  const [addtowishlist, setaddtowishlist] = useState(false);
  const [removetowishlist, setremovetowishlist] = useState(false);
  const [checkforsize, setcheckforsize] = useState(false);
  const context = useContext(Mycontext);
  const [cartData, setcartData] = useState({
    productTitle: "",
    image: "",
    size: "",
    rating: 0,
    price: 0,
    sutotal: 0,
    quantity: 0,
    productId: "",
    userID: "",
  })
  const [wishlistData, setwishlistData] = useState({
    productTitle: "",
    image: "",
    rating: 0,
    oldprice: 0,
    newPrice: 0,
    disCount: 0,
    productId: "",
    userID: "",
  })
  const [productinwishList, setproductinwishList] = useState(false);
  const history = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    context.setsearchfilterData([]);
    context.setsearchtext('');
    context.setissearchActive(false);
    context.setsearchplaceholder('Search for products..');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      fetchData(`/api/Wishlist/?userID=${user.userID}`).then(res => {
        if (res && res.WishList) {
          const isProductInWishlist = res.WishList.some(item => item.productId === id);
          setproductinwishList(isProductInWishlist);
        } else {
          setproductinwishList(false);
        }
      }).catch(err => {
        console.error("Error fetching wishlist:", err);
        setproductinwishList(false); // Ensure false on error
      });
    }
    setCurrentIndex(0);
    setSelectedSize('');
    setproductinwishList(false);
    setcount(1);
    fetchData(`/api/products/${id}`).then(res => {
      setproductData(res);
      setDis(res.discription);
      setproductaddinfo(res.techData);
      fetchData(`/api/products?product=${res.subcat}`).then(res => {
        setrelatedproduct(res.filterProduct.filter((pro) => pro._id != id));
      })
    })

  }, [id])

  function handleminus() {
    if (count <= 1) {
      setcount(1);
    }
    else {
      setcount(count => count - 1);
    }
  }
  function handleplus() {
    if (count >= 10) {
      setcount(count);
    }
    else {
      setcount(count => count + 1);
    }
  }

  function handleSize(size) {
    setSelectedSize(size);
  }
  // Scroll Left Function
  const scrollLeft = () => {
    if (prosliderRef.current) {
      prosliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll Right Function
  const scrollRight = () => {
    if (prosliderRef.current) {
      prosliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };


  //Image movement
  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  // Handle Touch Start
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Handle Touch End
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe Left
      nextImage();
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe Right
      prevImage();
    }
  };

  // Handle Touch Move
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev < productData?.images?.length - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  //Add to Cart
  const addtoCart = async () => {

    if (productData.category === '675e910a58cb0041f8378699' || productData.category === '675e94bc58cb0041f83786a9') {
      if (selectedSize == '') {
        setcheckforsize(true);
        return;
      }
      else {
        setcheckforsize(false);
      }
    }
    setisloading(true);
    cartData.productTitle = productData?.name
    cartData.image = productData?.images[0]
    cartData.size = selectedSize
    cartData.rating = productData?.rating
    cartData.price = productData?.newPrice
    cartData.sutotal = (productData?.newPrice) * count
    cartData.quantity = count
    cartData.productId = productData?._id
    cartData.userID = context.userData.userID
    await CartData("/api/Cart/add", cartData)
      .then(res => {
        if (res.status === 200) {
          // Product successfully added
          setTimeout(() => {
            setisloading(false);
            setproductadded(true);
            setTimeout(() => {
              setproductadded(false);
              window.location.reload();
            }, 1000)
          }, 500);
        }
        else if (res.status === 201) {
          // Product already added to cart
          setisproductadd(true);
          setTimeout(() => {
            setisproductadd(false);
            setisloading(false);
          }, 1500);
        } else {
          // Handle other response statuses (not 200 or 409)
          setisloading(false);
        }
      })
      .catch(err => {
        if (err.response) {
          console.error('Error during CartData request:', err.response);
        } else {
          console.error('Network error or unknown error:', err);
        }
        setisloading(false)
      });


  }

  //Add to WishList
  const addtoWishlist = async () => {
    setisloading(true);
    wishlistData.productTitle = productData?.name
    wishlistData.image = productData?.images[0]
    wishlistData.rating = productData?.rating
    wishlistData.oldprice = productData?.oldprice
    wishlistData.newPrice = productData?.newPrice
    wishlistData.disCount = productData?.disCount
    wishlistData.productId = productData?._id
    wishlistData.userID = context.userData.userID
    await CartData("/api/Wishlist/add", wishlistData)
      .then(res => {
        if (res.status === 200) {
          // Product successfully added
          setTimeout(() => {
            setisloading(false);
            setaddtowishlist(true);
            setproductinwishList(true);
            setTimeout(() => {
              setaddtowishlist(false);
            }, 1000)
          }, 500);
        }
        else if (res.status === 201) {
          // Product already added to WishList
          setTimeout(() => {
            setisloading(false);
          }, 1500);
        } else {
          // Handle other response statuses (not 200 or 409)
          setisloading(false);
        }
      })
      .catch(err => {
        if (err.response) {
          console.error('Error during CartData request:', err.response);
        } else {
          console.error('Network error or unknown error:', err);
        }
        setisloading(false)
      });


  }
  //Remove the product From WishList
  const removefromWishList = async () => {
    setisloading(true);
    deleteData(`/api/Wishlist/product/${id}`)
      .then((res) => {
        // "WishList Product Remove successfully."
        setTimeout(() => {
          setisloading(false);
          setremovetowishlist(true);
          setproductinwishList(false);
          setTimeout(() => {
            setremovetowishlist(false);
          }, 1000)
        }, 500);
      })
      .catch((err) => {
        console.error('Failed to delete item:', err.message);
      });
  }



  const handleaddinfo = (data) => {
    setdis(data === "dis");
    setaddinfo(data === 'addinfo');
  }
  const checkforlogin = () => {
    history('/signin')
  }


  return (
    <div className='w-full relative flex flex-col items-center md:mt-10 z-1 mt-[160px]'>
      {/* Product view section */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] relative flex flex-col items-start p-6 sm:p-4 md:p-6 lg:p-8"
      >
        {/* Product view */}
        <div className="w-full flex flex-col lg:flex-row justify-start items-start p-3 font-robotoCondensed gap-4 lg:gap-6">
          {/* Image Section */}
          <div className="md:w-[45%] w-full flex flex-col items-center gap-5 p-4 ">
            {/* Main Slider */}
            <div
              className="w-full md:w-[70%] overflow-hidden relative"
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="w-full h-fit flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {productData?.images?.length > 0 &&
                  productData.images.map((i, index) => (
                    <img
                      key={index}
                      className="w-full flex-shrink-0 rounded-lg cursor-pointer "
                      src={i}
                      alt={`Product Image ${index + 1}`}
                    />
                  ))}
              </div>
            </div>

            {/* Thumbnail Selector */}
            <div className="w-full flex justify-center gap-2 mt-4 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
              <div className="flex gap-2">
                {productData?.images?.length > 0 &&
                  productData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-[60px] sm:w-[80px] lg:w-[100px] h-[50px] sm:h-[60px] lg:h-[80px] cursor-pointer rounded-md 
                transition-transform duration-300 hover:scale-110 
                ${index === currentIndex
                          ? 'border-4 border-blue-500'
                          : 'border'
                        }`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
              </div>
            </div>
          </div>


          {/* Details Section */}
          <div className="md:w-[45%] w-full flex flex-col items-start mt-10">
            <div className='w-full flex flex-col items-start gap-3'>
              <p className="text-lg sm:text-base md:text-xl font-bold">{productData.name}</p>
              <div className="w-full flex justify-start items-start gap-3">
                <p className="text-sm md:text-[16px] font-bold">Brand: <span className='text-sm md:text-[16px] font-medium'>{productData.brand}</span></p>
                <Rating name="half-rating" precision={0.5} value={productData.rating || 4} readOnly={true} />
              </div>
            </div>
            <div className='w-full flex flex-col items-start'>
              <div className="w-full flex justify-start items-center gap-3 mt-5">
                <p className="md:text-2xl sm:text-xl text-black font-extrabold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(productData.newPrice)}</p>
                <div className='w-[60px] h-[30px] text-green-800 bg-green-400 bg-opacity-50 flex justify-center items-center'>{`${productData.disCount}% OFF`}</div>
              </div>
              <p className='md:text-[16px] sm:text-xl text-slate-500 font-medium'>M.R.P: <span className=" line-through">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(productData.oldprice)}</span> (Incl. of all taxes)</p>

            </div>
            <p className="text-base sm:text-xl text-green-700 font-medium mt-2"><span className='"text-base sm:text-xl text-black font-medium'>In Stock: </span>{productData.countInstock}</p>
            <div className="bg-white rounded-lg shadow-sm mt-5 pb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Product Description</h2>
              <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                {showMore ? Dis : `${Dis.split(' ').slice(0, 20).join(' ')}...`}
              </p>
              <button
                className="text-blue-800 hover:text-blue-900 mt-2 font-medium"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show Less" : "Read More"}
              </button>
            </div>
            {checkforsize && <p className='text-[16px] text-red-600 mt-2'>Please Select Size for the Product</p>}
            {productData.category === '675e910a58cb0041f8378699' ?
              (
                <div className="w-full flex flex-row gap-6 mt-4">
                  <p className="text-base sm:text-xl font-semibold">SIZE:</p>
                  <div className="grid grid-cols-4 md:-cols-6 gap-4 items-center">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <p
                        key={size}
                        style={{
                          backgroundColor: selectedSize === size ? '#1E40AF' : '',
                          color: selectedSize === size ? 'white' : 'black',
                        }}
                        onClick={() => handleSize(size)}
                        className="border w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] flex justify-center items-center rounded-lg hover:bg-blue-800 hover:text-white cursor-pointer"
                      >
                        {size}
                      </p>
                    ))}
                  </div>
                </div>
              ) :
              productData.category === '675e94bc58cb0041f83786a9' ?
                (
                  <div className="w-full flex flex-row gap-6 mt-4">
                    <p className="text-base sm:text-xl font-semibold">SIZE:</p>
                    <div className="grid grid-cols-4 md:-cols-6 gap-4 items-center hover:text-white">
                      {['3', '4', '5', '6', '7', '9', '11', '12'].map((size) => (
                        <p
                          key={size}
                          style={{
                            backgroundColor: selectedSize === size ? '#1E40AF' : '',
                            color: selectedSize === size ? 'white' : 'black',
                          }}
                          onClick={() => handleSize(size)}
                          className="border w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] flex justify-center items-center rounded-lg hover:bg-blue-800 hover:text-white  cursor-pointer"
                        >
                          {size}
                        </p>
                      ))}
                    </div>
                  </div>
                )
                : (<></>)
            }

            <div className="w-full flex justify-bewtween items-center gap-8  mt-8">
              <div className="w-[30%] flex justify-start gap-4 items-center">
                <FaMinus
                  className="w-[30px] sm:w-[40px] bg-gray-200 h-[30px] sm:h-[40px] rounded-full p-[6px] sm:p-[14px] cursor-pointer select-none"
                  onClick={handleminus}
                />
                <div
                  style={{ userSelect: 'none' }}
                  className="w-[50px] sm:w-[40px] bg-gray-200 flex justify-center items-center h-[30px] sm:h-[40px]  rounded-full"
                >
                  {count}
                </div>
                <TiPlus
                  className="w-[30px] sm:w-[40px] bg-gray-200 h-[30px] sm:h-[40px] rounded-full p-[6px] sm:p-[14px] cursor-pointer select-none"
                  onClick={handleplus}
                />
              </div>
              <div onClick={context.isLogin ? addtoCart : checkforlogin} className="w-[35%] h-[35px] flex justify-center items-center p-2 gap-1 cursor-pointer rounded-xl bg-blue-700 text-white hover:bg-blue-800">
                <CiShoppingCart className="w-[25px] h-[30px] text-white" />
                <p className="text-[12px] sm:text-[16px] text-white font-medium">Add To Cart</p>
              </div>
              {productinwishList ? (<button onClick={removefromWishList}
                className='w-[35px] h-[35px] border-[2px] border-gray-200 p-2 flex justify-center items-center rounded-full' >
                <FaHeart className='text-xl font-bold text-blue-800 ' />
              </button>) :
                (<button onClick={context.isLogin ? addtoWishlist : checkforlogin}
                  className='w-[35px] h-[35px] border-[2px] border-gray-200 text-white p-2 flex justify-center items-center rounded-xl'>
                  <FaHeart className='text-xl font-bold text-gray-400 hover:text-blue-800 ' />
                </button>)}
            </div>
          </div>
        </div>
      </div>
      {/* Product Details */}
      <div className="w-[90%] relative flex flex-col items-start p-6 sm:p-4 md:p-6 lg:p-8">

        <div className='w-full relative flex flex-col items-start bg-blue-500 p-10 font-robotoCondensed rounded-lg bg-opacity-40'>
          <div className='w-full flex justify-start items-center gap-3'>
            <div
              style={{
                backgroundColor: isdiscrip ? "#1D4ED8" : "transparent",
                color: isdiscrip ? "white" : "black",
                transition: "opacity 0.3s ease-in-out",
              }}
              onClick={() => { handleaddinfo("dis") }}
              className='w-[150px] h-[50px] text-[18px] cursor-pointer p-2 flex justify-center items-center border-[1px] border-slate-400 font font-medium rounded-xl bg-blue-800 text-white'>Description</div>
            <div
              style={{
                backgroundColor: isaddinfo ? "#1D4ED8" : "transparent",
                color: isaddinfo ? "white" : "black",
                transition: "opacity 0.3s ease-in-out",
              }}
              onClick={() => { handleaddinfo("addinfo") }}
              className='w-[150px] h-[50px] text-[18px] p-2 flex justify-center cursor-pointer items-center border-[1px] border-slate-400 font-medium rounded-xl bg-blue-800 text-white'>Additional Info</div>
          </div>
          {/* Description */}
          <div
            className="w-full mt-5 pl-5"
            style={{
              display: isdiscrip ? "block" : "none",
              opacity: isdiscrip ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}>
            <p className="md:text-[18px] sm:text-base md:leading-relaxed text-gray-900 mt-4"
            >
              {showMore ? Dis : `${Dis.split(' ').slice(0, 20).join(' ')}...`}

            </p>
            <button
              className="text-gray-800 hover:text-black mt-2 font-medium"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Read More"}
            </button>
          </div>
          {/* Additional Information */}
          <div
            className="w-full mt-5 pl-5"
            style={{
              display: isaddinfo ? "block" : "none",
              opacity: isaddinfo ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}>
            {Object.entries(productaddinfo).length > 0 ? (
              Object.entries(productData?.techData).map(([key, value], index) => (
                <div key={index} className="w-full md:w-[30%] flex justify-start items-center gap-2 p-2">
                  <p className=" w-full font-medium text-black text-xl">{key}:</p>
                  <p className="w-full text-gray-700 text-[16px]">{value}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No technical details for this Product.</p>
            )}
          </div>
        </div>

      </div>

      {/* Related Products */}
      <div className='w-full md:w-[90%] relative flex justify-start items-start mt-5 p-4'>
        <div className='w-full  flex flex-col items-start font-robotoCondensed'>
          <div className='w-full flex justify-start items-center'>
            <div className='flex flex-col items-start gap-1 cursor-pointer'>
              <p className='text-2xl font-bold'>Related Products</p>
            </div>
          </div>
          <div className="w-full relative mt-5">

            <div ref={prosliderRef} className="w-full relative flex flex-row gap-4 overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent pb-4">

              {relatedproduct?.length > 0 ? (<>
                {relatedproduct.slice(0, 15)?.map((pop, index) => (
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
            <MdKeyboardArrowLeft
              onClick={scrollLeft}
              className="w-[35px] h-[35px] text-black  absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white select-none" />
            <MdKeyboardArrowRight
              onClick={scrollRight}
              className="w-[35px] h-[35px] text-black absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-700 hover:text-white select-none"
            />
          </div>

        </div>

      </div>
      {isloading && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
          <CircularProgress className="text-blue-800" color="inherit" />
        </div>
      )}
      {isproductadd && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/50">
          <div className='w-[50%] md:w-[20%] h-[50px] bg-red-600 text-white font-bold text-sm md:text-xl flex justify-center items-center rounded-lg '>
            <p>Product already added in Cart</p>
          </div>
        </div>
      )}
      {productadded && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] ">
          <div className='w-[50%] md:w-[20%] h-[50px] absolute bottom-2 left-2 bg-green-600 text-white font-bold text-sm md:text-xl flex justify-center items-center rounded-lg '>
            <p>Product added in the Cart</p>
          </div>
        </div>
      )}
      {addtowishlist && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] ">
          <div className='w-[50%] md:w-[20%] h-[50px] absolute bottom-2 left-2 bg-green-600 text-white font-bold text-sm md:text-xl flex justify-center items-center rounded-lg '>
            <p>Product added in the WishList</p>
          </div>
        </div>
      )}
      {removetowishlist && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] ">
          <div className='w-[50%] md:w-[20%] h-[50px] absolute bottom-2 left-2 bg-red-600 text-white font-bold text-sm md:text-xl flex justify-center items-center rounded-lg '>
            <p>Product remove in the WishList</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductViewpage