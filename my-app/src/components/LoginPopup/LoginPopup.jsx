import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login")
  const { setToken } = useContext(StoreContext)

  const handleLogin = (e) => {
    e.preventDefault();
    const fakeToken = "fake_token_123";
    localStorage.setItem("token", fakeToken);
    setToken(fakeToken);
    setShowLogin(false); // Ferme la popup
  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? null : <input type="text" placeholder='Your name' required />}
          <input type="email" placeholder='Your email' required />
          <input type="password" placeholder='Password' required />
        </div>

        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-google">
          <img src={assets.google_icon} width={20} height={20} alt="" />
          <p>Sign in with Google</p>
        </div>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
