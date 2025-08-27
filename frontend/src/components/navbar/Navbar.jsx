import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { gettotalAmount, getQuantity, token, setToken } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img className="navbar-logo" src={assets.logo} alt="" />
      </Link>
      <ul className="navbar-content">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app"
          onClick={() => setMenu("mobile")}
          className={menu === "mobile" ? "active" : ""}
        >
          mobile
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          contact
        </a>
      </ul>
      <div className="right-navbar">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-basket">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />{" "}
          </Link>
          {gettotalAmount() == 0 ? (
            ""
          ) : (
            <div className="navbar-basket-count">{getQuantity()}</div>
          )}{" "}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in </button>
        ) : (
          <div className="navbar-profile">
            <img className="profie" src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={()=>navigate("/myorder")}>
                <img src={assets.bag_icon} alt="" />
                Order
              </li>
              <hr />
              <li onClick={Logout}>
                <img src={assets.logout_icon} alt="" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
