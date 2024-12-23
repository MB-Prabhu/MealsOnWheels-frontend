import React, { Suspense, useContext, useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './PlaceOrder/PlaceOrder'
import Footer from './components/Footer'
import Login from './components/Login'
import { StoreContext } from './context/StoreContext'
import AdminHome from './AdminPages/AdminHome'
import AdminNavbar from './AdminPages/adminComponents/AdminNavbar'
import AdminAdd from './AdminPages/AdminAdd'
import AdminList from './AdminPages/AdminList'
import AdminOrders from './AdminPages/AdminOrders'


import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import PaymentVerify from './Pages/PaymentVerify/PaymentVerify'
import MyOrders from './Pages/Myorders/MyOrders'
// import LoadingSpinner from './components/LoadingSpinner'
import AdminLogin from './AdminPages/AdminLogin'
import ADminProtectedRoutes from './AdminPages/adminComponents/ADminProtectedRoutes'
import NotFound from './components/NotFound'


const App = () => {
      const {showLogin, showAdminLogin} = useContext(StoreContext) 
      const location = useLocation()
  return (
    <div className='bg-[#fdfdfa]'>
      <ToastContainer />
      {showLogin && <Login  />}
      {showAdminLogin && <AdminLogin />}
      {location.pathname.startsWith("/admin") ? <AdminNavbar /> : <Navbar  />}

     <div className='content'>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/verify' element={<PaymentVerify />} />
        <Route path='/myorders' element={<MyOrders />} />
       
       
        <Route path='/adminlogin'  element={<AdminLogin />} />

        
        <Route path='/adminhome'  element={
                            <ADminProtectedRoutes>
                                  <AdminHome />
                            </ADminProtectedRoutes>
                            } >
        <Route index element={<AdminAdd />} />
        <Route path='listadmin' element={<AdminList />} />
        <Route path='ordersadmin' element={<AdminOrders />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
     </div>
      <Footer />
    </div>
  )
}

export default App