import React, { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'

import DeliveryDashboard from './features/delivery/DeliveryDashboard/DeliveryDashboard'
import SalesDepartment from './features/sales/SalesDepartment/SalesDepartment'
import ThirdPartyDeveloper from './features/dev/ThirdPartyDeveloper/ThirdPartyDeveloper'
import Support from './features/support/Support'
import RestaurantOwnerDashboard from './features/restaurant-owner/RestaurantOwnerDashboard/RestaurantOwnerDashboard'
import Orders from './pages/Orders/Orders'
import { List } from 'lucide-react'
import Add from './pages/Add/Add'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const location = useLocation()

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/delivery' element={<DeliveryDashboard />} />
          <Route path='/sales' element={<SalesDepartment />} />
          <Route path='/dev' element={<ThirdPartyDeveloper />} />
          <Route path='/support' element={<Support />} />
          <Route path='/resto' element={<RestaurantOwnerDashboard setShowLogin={setShowLogin} />} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App
