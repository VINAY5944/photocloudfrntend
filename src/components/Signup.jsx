import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import rooturl from "../url";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const [detail, setDetail] = useState([]);

  const nav = useNavigate();

  const formsubmitted = async (e) => {
    e.preventDefault();

    const siginInfo = await axios.post(`${rooturl}/register`, {
        name,email,
        password
      })
      .then((response) => {
        setDetail(response.data);
        localStorage.setItem("currentUserInfo", JSON.stringify(response.data));
      });

    if (detail) {
      nav("/");
    } else {
      alert("wrong credentials");
    }
  };

  return (
    <div className="main">
      <div className="formdiv">
        <form onSubmit={formsubmitted}>
     <h1> sign-up</h1>    
          <div>
            <label>
           
              <input
                value={email}
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
              ></input>
            </label>
          </div>
          <div>
            <label>
            
              <input
                value={password}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
              ></input>
            </label>
          </div>
          <div>
            <label>
            
              <input
                value={name}
                placeholder="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
              ></input>
            </label>
          </div>
        
          <button type="submit">sign up</button>
          <p>Already have an account  <Link to="/" >log-in</Link>  instead?</p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
