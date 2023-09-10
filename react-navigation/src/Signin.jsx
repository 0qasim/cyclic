import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "styled-components";
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { userContext } from "./App";
const Signin = () => {
const navigate = useNavigate();
  const user = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

// ...
const handleSubmit = (e) => {
  e.preventDefault();
  if (user.email) {
    // User is already signed in, show a toast message or redirect
    toast.info("You are already signed in.");
    // Optionally, you can redirect them to another page
    setTimeout(() => {
      navigate("/"); // Redirect to the home page after a delay (in milliseconds)
    }, 3000);    return; // Exit the function to prevent further execution
  }
  axios.post("http://localhost:3001/Signin", { email, password }, { withCredentials: true })
    .then((result) => {
      toast.error(result.data);
      console.log(result);
      if (result.data === "**Success") {
        toast.success("Login successful");
        setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
// ...


  return (
    <div
      style={{
        backgroundImage: `url(./bg.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: `calc(100vh-80px)`,
      }}
      className="d-flex justify-content-center align-items-center vh-100"
    ><ToastContainer/>
      <div
        className="bg-white p-4 rounded shadow-lg w-50"
        style={{ opacity: 0.7, color: "black" }}
      >
        <form onSubmit={handleSubmit}>
          <h1 className="mb-4">Sign In</h1>
          <div className="mb-3">
            <label>Email address</label>
            <input style={{fontSize:"17px"}}
              required
              autoComplete="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input style={{fontSize:"17px"}}
                required
                autoComplete="current-password"
                type={show ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                onClick={() => setShow(!show)}
                style={{
                  background: " lightgrey ",
                  position: "absolute",
                  right: "27%",
                  borderRadius:"8px"
                }}
              >
                {show ? "Hide" : "Show"}
              </label>
            </div>
          </div>
          <div className=" mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <div className=" clearfix ">
            <SigninButton type="submit" className=" btn btn-primary float-end">
              Submit
            </SigninButton>
          </div>
          <p className="mt-3 text-right">
            Don't have an account? <Link to="/Signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;

const SigninButton = styles.button`
padding:8px;
width:35%;
border-radius:5px;
border:1px solid grey;
background-color: #4b37cf;

`;
