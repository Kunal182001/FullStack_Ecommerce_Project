import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/HomePage/Homepage';
import Navbar from './Components/Navbar/Navbar';
import ProductViewpage from './Pages/ViewPageofProduct/ProductViewpage';
import Footter from './Components/Home/Footter';
import Allproductviewpage from './Pages/ProductsViewpage/Allproductviewpage';
import SignIn from './Pages/AuthSignin/SignIn';
import Mycontext from './Pages/Mycontext/Mycontext';
import SignUp from './Pages/AuthSignup/SignUp';
import AcessPage from './Pages/AccessPage/AcessPage';
import AdminPage from './Pages/AdminPage/AdminPage';
import AddProductpage from './Pages/Adminproduct/AddProductpage';
import AddCategory from './Pages/AdminCategory/AddCategory';
import PrivateRoute from './Components/PrivateRoute/Privateroute';
import Cartpage from './Pages/CartPage/Cartpage';
import { fetchData } from './Components/Admin/api';
import WishlistPage from './Pages/WishList/WishlistPage';
import CheckOutpage from './Pages/CheckOutpage/CheckOutpage';
import OrderPlacedPage from './Pages/OrderPage/OrderPlacedPage';
import UserOrderpage from './Pages/UserOrderPage/UserOrderpage';
import SearchPage from './Pages/SearchproductsViewpage/SearchPage';
import VerifyotpPage from './Pages/VerifyOtp/VerifyotpPage';
import AccountPage from './Pages/MyAccount/AccountPage';
import Subcatpage from './Pages/SubCategoryView/Subcatpage';

function App() {
  const [isheader, setisheader] = useState(true);
  const [isfooter, setisfooter] = useState(true);
  const [isLogin, setisLogin] = useState(false);
  const [userData, setuserData] = useState([]);
  const [totalItem, settotalItem] = useState(0);
  const [iteminwishList, setiteminwishList] = useState([]);
  const [userstate,setuserstate]=useState('');
  const [orderPlaced,setorderPlaced]=useState(false);
  const [issearchActive,setissearchActive]=useState(false);
  const [searchfilterData, setsearchfilterData] = useState([]);
  const [searchtext,setsearchtext]=useState('');
  const [searchplaceholder,setsearchplaceholder]=useState('Search for products..');
  const [filterText,setfilterText]=useState('');

  const value = {
    isheader,
    isfooter,
    setisheader,
    setisfooter,
    isLogin,
    setisLogin,
    userData,
    setuserData,
    totalItem,
    settotalItem,
    iteminwishList,
    setiteminwishList,
    userstate,
    setuserstate,
    orderPlaced,
    setorderPlaced,
    issearchActive,
    setissearchActive,
    searchfilterData,
    setsearchfilterData,
    searchtext,
    setsearchtext,
    searchplaceholder,
    setsearchplaceholder,
    filterText,
    setfilterText,

  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      setuserData(user);
      if (token != null && token != "") {
        setisLogin(true);
      }
    }
  }, [isLogin])

  //Fetching the Cart data from the api 
  useEffect(() => {
    let userID = '';
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      userID = user?.userID || '';
    } catch (error) {
      userID = '';
    }
    if (userID != '') {
      fetchData(`/api/Cart/?userid=${userID}`).then((res) => {
        settotalItem(res.totalItems);
      })
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Mycontext.Provider value={value}>
          {isheader && <Navbar  />}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:id" element={<ProductViewpage />} />
            <Route path="/products/view/:id" element={<Allproductviewpage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verifyOTP" element={<VerifyotpPage />} />
            <Route path="/access" element={<AcessPage />} />
            <Route path="/Admin" element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
            />
            <Route path="/addproduct" element={
              <PrivateRoute>
                <AddProductpage />
              </PrivateRoute>
            }
            />
            <Route path="/addcategory" element={
              <PrivateRoute>
                <AddCategory />
              </PrivateRoute>
            }
            />
            <Route path="/cart/view/:id" element={<Cartpage />} />
            <Route path="/wishlist/view/:id" element={<WishlistPage />} />
            <Route path="/checkout/:id" element={<CheckOutpage />} />
            <Route path="/ordersuccess" element={<OrderPlacedPage />} />
            <Route path="/orders/view/:id" element={<UserOrderpage />} />
            <Route path="/products/search/:id" element={<SearchPage />} />
            <Route path="/products/subcat/:id" element={<Subcatpage />} />
            <Route path="/account/:id" element={<AccountPage />} />

          </Routes>
          {isfooter && <Footter />}
        </Mycontext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
