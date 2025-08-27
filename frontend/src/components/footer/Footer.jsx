import { assets } from "../../assets/assets";
import "./Footer.css";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-first">
            <img src={assets.logo} alt="" />
            <p>
              Delicious meals delivered fresh to your door. Browse your favorites, add to cart, and enjoy a seamless ordering experience. Quality food, fast service, and satisfaction guaranteed every time. Discover new dishes, track your orders easily, and enjoy exclusive offers. Your hunger ends here — tasty, fast, and always reliable.
            </p>
            <div className="footer-logo">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
          </div>
          <div className="footer-center">
            <h1>Company</h1>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Private Policy</li>
              <li>Delivery</li>
            </ul>
          </div>
          <div className="footer-end">
            <h1>Get us in Touch</h1>
            <ul>
                <li>+1-200-567-983</li>
                <li>Contact@Tomato.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="footer-copyrights">
          <p>Copyrights 2025 © Tomato.com - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
