import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
import {jwtDecode} from 'jwt-decode'
import { useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const roleToRouteMap = { //mapping out routes
  customer:"/",
  restaurant_owner: "/resto",
  delivery_driver:"/delivery-driver",
  sales_team:"/sales-team",
  third_party_developer:"/third-party"
}
const LoginPopup = ({setShowLogin}) => {

  const navigate = useNavigate()
  const {url, setToken} = useContext(StoreContext)

    const [currState,setCurrState] = useState("Login")
    const [formData, setFormData] = useState({
      username:'',
      email:'',
      password:'',
      role: 'customer' //add roles and customer is default
    })

    const handleChange = (e) =>{
      const name = e.target.name
      const value = e.target.value
      setFormData(data=> ({
        ...data,[name]:value}))
    }

    useEffect(()=>{
      console.log(formData)
    }, [formData])

    const base = "http://localhost/api/auth"

    const onLogin = async (e) => {
      e.preventDefault();
      try {
        let newUrl = url;
        let payload = {}
        if (currState === 'Login') {
          newUrl += "/signin";// backend login
          payload = formData
        } else {
          newUrl += "/signup"; // backend register
          payload = {
            ...formData, roles:[formData.role]
          }
        }

        const res = await axios.post(newUrl, payload);

        if (res.data.success || res.data.accessToken) {
          const token = res.data.token || res.data.accessToken
          setToken(token)
          localStorage.setItem("token", res.data.accessToken);

          //decode token for role
          let userRole = res.data.roles || null;
          if(!userRole && token){
            const decoded = jwtDecode(token)
            userRole = decoded.role || (decoded.roles && decoded.roles[0])
          }
          if(!userRole) userRole = "customer"
          
          localStorage.setItem("userRole", userRole)
          localStorage.setItem("user", JSON.stringify(res.data.username))

          const route = roleToRouteMap[userRole] || "/"
          navigate(route)

          setShowLogin(false)
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.error("Auth error:", err.response?.data || err.message);
        alert("Login failed.");
      }
    };


  return (
    <div className='login-popup'>
        <form className="login-popup-container" onSubmit={onLogin}>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
                  
            </div>
            <div className="login-popup-inputs">
              {currState==="Login"? null : ( <>
                <input name="username" type="text" placeholder='Your username' required onChange={handleChange} value={formData.username}/>
                
                {/* Insert role selection in dropdown */}
                <select name="role" required onChange={handleChange} value={formData.role}>
                  <option value ="customer">Customer</option>
                  <option value="restaurant_owner">Restaurant Owner</option>
                  <option value="delivery_driver">Delivery Driver</option>
                </select>
                </>
              )}           
              <input name="email" type="email" placeholder='Your email' required onChange={handleChange} value={formData.email}/>
              <input name="password" type="password" placeholder='Password' required onChange={handleChange} value={formData.password}/>
            </div>

            <button type='submit'>{currState==="Sign up"?"Create account":"Login"}</button>

            <div className="login-popup-google">
              <img src={assets.google_icon} width={20} height={20} alt="" />
              <p>Sign in with Google</p>
            </div>

            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
            
        </form>
    </div>
  )
}

export default LoginPopup
