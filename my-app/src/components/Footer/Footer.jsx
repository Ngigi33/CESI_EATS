import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>CESI EATS is your trusted partner for fast and delicious meal deliveries. We are committed to bringing you the best dishes from your favorite restaurants directly to your doorstep, with simplicity and efficiency. Discover an effortless culinary experience, designed just for you!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/delivery-page">Delivery</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+33 (0)1 42 68 18 91 </li>
                <li>contact@cesieats.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © Cesieats.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
