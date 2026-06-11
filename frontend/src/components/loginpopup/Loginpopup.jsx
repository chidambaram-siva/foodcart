import React, { useState , useContext } from "react";
import { assets, url } from "../../assets/assets";
import "./Loginpopup.css";
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';

 import { toast } from "react-toastify";

const Loginpopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
    const {token,setToken} = useContext(StoreContext)

  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const change = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitLoginHandle = async (e) => {
    e.preventDefault();
    let newUrl;
    if (currState === "Login") {
       newUrl = `${url}/api/user/login`;
    } else {
      newUrl = `${url}/api/user/register`;
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        toast.success(response.data.message,{ autoClose: 500 })
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);

        setData({
          name: "",
          password: "",
          email: "",
        });
        setShowLogin(false);

      } else {
        alert("Failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Login/Register error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="login">
      <form className="login-container" onSubmit={submitLoginHandle}>
        <div className="login-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-input">
          {currState === "Signup" && (
            <input
              onChange={change}
              value={data.name}
              type="text"
              placeholder="Your name"
              name="name"
            />
          )}

          <input
            type="text"
            placeholder="Your email"
            name="email"
            value={data.email}
            onChange={change}
          />
          <input
            type="password"
            placeholder="Your password"
            name="password"
            onChange={change}
            value={data.password}
          />
          <button type="submit">
            {currState === "Login" ? "Login" : "Create Account"}
          </button>
        </div>
        <div className="login-check">
          <input type="checkbox" required />
          <p>
            By continuing, you agree to our terms and conditions.
          </p>
        </div>

        <div className="login-signup">
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Signup")}>Signup</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Loginpopup;
