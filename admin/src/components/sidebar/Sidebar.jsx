import React from 'react'
import { assets } from "../../assets/assets";
import "./Sidebar.css"
import Navbar from '../navbar/Navbar';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
         <div className="sidebar-option">
            <NavLink to="/add" className="sidebar-options">
                <img src={assets.add_icon} alt="" />
                <p>Add items</p>
            
            </NavLink>
            <NavLink to="/list"  className="sidebar-options">
                <img src={assets.order_icon} alt="" />
                <p>List item</p>
            
            </NavLink>
            <NavLink to="/order" className="sidebar-options">
                <img src={assets.order_icon} alt="" />
                <p>Order item</p>
            
            </NavLink>
         </div>
      </div>
    </div>
  )
}

export default Sidebar
