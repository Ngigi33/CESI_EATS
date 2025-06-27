import React, { useState } from 'react'
import { Route, Routes, useLocation} from 'react-router-dom'

//component imports
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
//import Orders from './pages/Orders/Orders'
import { List } from 'lucide-react'
//import Add from './pages/Add/Add'

//pages
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import DeliveryDashboard from './pages/DeliveryDashboard/DeliveryDashboard'
//footers section
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import Account from './pages/Account/Account'
import About from './pages/About/About'
import Delivery from './pages/Delivery/Delivery'


//features
//import DeliveryDashboard from './features/delivery/DeliveryDashboard/DeliveryDashboard'
import SalesDepartment from './features/sales/SalesDepartment/SalesDepartment'
import ThirdPartyDeveloper from './features/dev/ThirdPartyDeveloper/ThirdPartyDeveloper'
import Support from './features/support/Support'
import RestaurantOwnerDashboard from './features/restaurant-owner/RestaurantOwnerDashboard/RestaurantOwnerDashboard'

import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <ToastContainer/>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/deliverydashboard' element={<DeliveryDashboard/>} />
          <Route path='/sales' element={<SalesDepartment />} />
          <Route path='/dev' element={<ThirdPartyDeveloper />} />
          <Route path='/support' element={<Support />} />
          <Route path='/account' element={<Account />} />
          <Route path='/resto' element={<RestaurantOwnerDashboard setShowLogin={setShowLogin} />} />
          <Route path="/about" element={<About />} />
          <Route path="/delivery-page" element={<Delivery />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App
