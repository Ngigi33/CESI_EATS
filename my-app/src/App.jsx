import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import SalesDashboard from './pages/SalesDashboard/SalesDashboard'
import DeliveryDashboard from './pages/DeliveryDashboard/DeliveryDashboard'
import Authentication from './pages/Authentication/Authentication'
import ThirdPartyDeveloper from './pages/ThirdPartyDeveloper/ThirdPartyDeveloper'
import MyOrders from './pages/MyOrders/MyOrders'
import RestaurantOwnerDashboard from './pages/OwnerDashboardPage/RestaurantOwnerDashboard'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} /> 
          <Route path='/order' element={<PlaceOrder/>} />  
          <Route path='/sales' element={<SalesDashboard/>} />
          <Route path='/delivery' element={<DeliveryDashboard/>} />
          <Route path="/auth" element={<Authentication />} />
          <Route path='/developer' element={<ThirdPartyDeveloper/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
          <Route path="/owner" element={<RestaurantOwnerDashboard />} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App
