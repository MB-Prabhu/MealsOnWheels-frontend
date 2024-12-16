import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './PlaceOrder/PlaceOrder'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='bg-[#fdfdfa]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App