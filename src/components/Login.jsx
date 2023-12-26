import React, { useState } from "react";


import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import rooturl from "../url";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [detail, setDetail] = useState([]);
  const nav = useNavigate();

  const formsubmitted = async (e) => {
    e.preventDefault();
    const userInfo = await axios
      .post(`${rooturl}/login`, { email, password })
      .then((response) => {
        setDetail(response.data);
        localStorage.setItem("currentUserInfo", JSON.stringify(response.data));

        const Id = response.data.Id;

        if (Id) {
          nav(`/home`);
        } else {
          alert("wrong credentials");
        }
      });
  };

  return (
    <>
      <div className="main">
        <h1>login</h1>
        <div className="formdiv">
          <form onSubmit={formsubmitted}>
            <div>
              <label>
                <input
                  placeholder="enter your email"
                  value={email}
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </label>
            </div>

            <div>
              <label>
                <input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </label>
            </div>
            <div>
              <button type="submit">login</button>

              <p>
                Don't have an account <Link to="/signup">sign in</Link> instead?
              </p>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
}

export default Login;
