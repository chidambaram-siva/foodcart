import React, { useState } from 'react'
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import Footer from './components/footer/Footer'
import Loginpopup from './components/loginpopup/Loginpopup'
import { Routes,Route } from 'react-router-dom'
import Cart from './pages/cart/Cart'
import Placeorder from './pages/placeorder/Placeorder'
 import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Verifyorder from './pages/verify/Verifyorder'
import Myorder from './pages/myorders/Myorder'

const App = () => {
  const[ShowLogin,setShowLogin] = useState(false);
  return (

    <>
    <ToastContainer />
    {ShowLogin?<Loginpopup setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart'element={<Cart />}/>
        <Route path='/order'element={<Placeorder/>}/>
        <Route path='/verify'element={<Verifyorder/>}/>
        <Route path='/myorder'element={<Myorder/>}/>

        
      </Routes>
      
    </div>
    <Footer />
    </>
  )
}

export default App
