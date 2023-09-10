import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "styled-components"
import { toast,ToastContainer } from "react-toastify";
const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/Signup", { name, email, password })
      .then((result) => {
        console.log(result);
        toast.success("Signup successful")

        Navigate("/Signin");
      })
      .catch((err) => 
        console.log(err)
      );
  };

  return (
    <div style={{backgroundImage:`url(./043.webp)`,backgroundRepeat:"no-repeat", backgroundSize: "cover",}} className="img-fluid shadow-4  d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25 "style={{opacity:0.8,color:'black'}}>
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="mb-3 form-group">
            <label className=" form-label">Name</label>
            <input  style={{fontSize:"17px"}}
              required
              autoComplete=""
              type="text"
              className="form-control rounded-0 "
              placeholder="Enter Your Name Here"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" form-group">
            <label>Email address</label>
            <input  style={{fontSize:"17px"}}
              required
              autoComplete=""
              type="email"
              className=" form-control "
              placeholder="Enter email Here"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 form-group">
            <label>Password</label>
            <input  style={{fontSize:"17px"}}
              required
              autoComplete=""
              type="password"
              className="form-control "
              placeholder="Enter password Here"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="clearfix">
            <SignupButton type="submit" className="btn btn-primary float-end">
              Sign Up
            </SignupButton>
          </div>
        </form>
        <p className="forgot-password text-right">
          Already registered <Link to="/Signin">sign in?</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
const SignupButton = styles.button`
padding:8px;
width:35%;
border-radius:5px;
border:1px solid lightgrey;
background-color: #4b37cf;

`;