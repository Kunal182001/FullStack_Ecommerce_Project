import React, { useContext, useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import { IoHeartOutline } from "react-icons/io5";
import { LuExpand } from "react-icons/lu";
import Productsview from './Productsview';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartData, deleteData, fetchData } from '../Admin/api';
import Mycontext from '../../Pages/Mycontext/Mycontext';

const Productcards = ({ id, src, name, description, techData, brand, categoryname, inStock, rating, oldPrice, newPrice, disCount, show, show2, show4 }) => {

  const [incard, setincard] = useState(null);
  const [ispreview, setPreview] = useState(false);
  const [addtowishlist, setaddtowishlist] = useState(false);
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
  const context = useContext(Mycontext);
  const history = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      fetchData(`/api/Wishlist/?userID=${user.userID}`).then(res => {
        if (res && res.WishList) {
          const isProductInWishlist = res.WishList.some(item => item.productId === id);
          setaddtowishlist(isProductInWishlist);
        } else {
          setaddtowishlist(false);
        }
      }).catch(err => {
        console.error("Error fetching wishlist:", err);
        setaddtowishlist(false); // Ensure false on error
      });
    }
  }, [])
  function handlepreview() {

    setPreview(true);
  }
  function closepreview() {
    setPreview(false);
    setincard(null);
  }

  {
    ispreview && (
      <Productsview
        id={id}
        src={src}
        name={name}
        inStock={inStock}
        oldPrice={oldPrice}
        newPrice={newPrice}
        rating={rating}
        open={!!ispreview}
        onclose={closepreview} />
    )
  }

  //Add to WishList
  const addtoWishlist = async () => {
    if (addtowishlist) {
      deleteData(`/api/Wishlist/product/${id}`)
        .then((res) => {
          setaddtowishlist(false);
        })
        .catch((err) => {
          console.error('Failed to delete item:', err.message);
        });
    }
    else {
      wishlistData.productTitle = name
      wishlistData.image = src[0]
      wishlistData.rating = rating
      wishlistData.oldprice = oldPrice
      wishlistData.newPrice = newPrice
      wishlistData.disCount = disCount
      wishlistData.productId = id
      wishlistData.userID = context.userData.userID
      await CartData("/api/Wishlist/add", wishlistData)
        .then(res => {
          if (res.status === 200) {
            setaddtowishlist(true);
          }
        })
        .catch(err => {
          if (err.response) {
            console.error('Error during CartData request:', err.response);
          } else {
            console.error('Network error or unknown error:', err);
          }
        });
    }


  }
  const checkforlogin = () => {
    history('/signin')
  }

  return (
    <>

      <div
        key={id}
        onMouseEnter={() => { setincard(id) }}
        onMouseLeave={() => { setincard(null) }}
        onClick={(e) => { e.stopPropagation() }}
        className={`${show ? "w-full h-[250px] flex-row justify-between p-4" : show2 ? "w-full sm:w-[300px] h-[360px] md:w-[300px] md:h-[400px] flex-shrink-0 flex-col" : "w-full sm:w-[250px] md:w-[250px] h-[360px] flex-shrink-0 flex-col"} relative flex items-start border cursor-pointer font-robotoCondensed transition-all duration-500 rounded-xl bg-[#F1F1F1] hover:shadow-card-only`}
      >
        <NavLink
          to={`/product/${id}`}
          className={`${show ? "w-[40%] h-full" : "w-full h-[60%] p-3"} rounded-md hover:scale-105 transition-all duration-500`}
        >
          <img
            className={`w-full h-full rounded-md hover:scale-105 transition-all duration-400`}
            src={src[0]}
          />
        </NavLink>

        <div className={`${show ? "w-[60%]" : "w-full "} flex flex-col items-start p-3 gap-2`}>
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            {name.length > 20 ? name.slice(0, 20) + "..." : name}
          </p>
          <p className="text-sm sm:text-lg md:text-xl text-green-700 font-medium">In Stock</p>
          <Rating name="read-only" precision={0.5} value={rating} readOnly />
          <div className="w-full flex items-center gap-2 md:gap-4">
            <p className="text-[11px] sm:text-lg md:text-xl text-slate-500 font-medium line-through">{`Rs:${oldPrice}`}</p>
            <p className="text-[11px] sm:text-lg md:text-xl text-red-800 font-medium">{`Rs:${newPrice}`}</p>
          </div>
        </div>

        <LuExpand
          style={{ display: incard === id ? "block" : "none" }}
          onClick={handlepreview}
          className="w-[35px] h-[35px] p-2 bg-white absolute top-7 right-4 rounded-full hover:bg-blue-800 hover:text-white transition-all duration-300 z-50"
        />
        <IoHeartOutline
          onClick={context.isLogin ? addtoWishlist : checkforlogin}
          style={{ display: incard === id ? "block" : "none" }}
          className={
            addtowishlist
              ? `w-[35px] h-[35px] p-2 bg-blue-800 absolute top-20 right-4 rounded-full text-white transition-all duration-300`
              : `w-[35px] h-[35px] p-2 bg-white absolute top-20 right-4 rounded-full hover:bg-blue-800 hover:text-white transition-all duration-300`
          }
        />
        {ispreview && (
          <Productsview
            id={id}
            src={src}
            name={name}
            description={description}
            techData={techData}
            brand={brand}
            categoryname={categoryname}
            inStock={inStock}
            oldPrice={oldPrice}
            newPrice={newPrice}
            disCount={disCount}
            rating={rating}
            open={!!ispreview}
            onclose={closepreview}
          />
        )}
      </div>


    </>
  )
}

export default Productcards