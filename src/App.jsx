import React, { useContext } from 'react'
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

const App = () => {
      const {showLogin, setShowLogin} = useContext(StoreContext) 

      const location = useLocation()
  return (
    <div className='bg-[#fdfdfa]'>
      {showLogin && <Login />}
      {location.pathname.startsWith("/admin") ? <AdminNavbar /> : <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
       
        <Route path='/adminhome' element={<AdminHome />} >
        <Route path='addadmin' element={<AdminAdd />} />
        <Route path='listadmin' element={<AdminList />} />
        <Route path='ordersadmin' element={<AdminOrders />} />
        </Route>

      </Routes>
      <Footer />
    </div>
  )
}

export default App