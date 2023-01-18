import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export const Login = () => {
  //STATES
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState({});

  //NAVIGATION
  const navigate = useNavigate();

  //HANDLING INPUT FUNCTION
  const handleinput = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setError((prev) => {
        delete prev.email;
        return prev;
      });
    } else {
      setError((prev) => {
        delete prev.password;
        return prev;
      });
    }
    setMsg({});
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  //FUNCTION FOR VALIDATION
  const validateForm = async () => {
    let err = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //mail validation
    if (input.email === "") {
      err.email = "*Please enter a mail Id";
    } else if (!emailRegex.test(input.email)) {
      err.email = "*Enter a valid mail Id";
    } else {
      delete err.email;
    }

    //password validation
    if (input.password === "") {
      err.password = "*Please enter a password";
    } else if (input.password.length < 8) {
      err.password = "*Password should be more than 8 characters";
    } else {
      delete err.password;
    }

    setError(err);
    return Object.keys(err).length < 1;
  };

  //NOTIFICATION
  const notifyLogin = () => {
    Store.addNotification({
      title: "Success !",
      message: "Logged in successfully",
      type: "success",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1500,
        onScreen: true,
      },
    });
  };

  //FUNCTION FOR FORM SUBMISSION
  const submitform = async (e) => {
    e.preventDefault();

    try {
      let isvalidate = validateForm();
      if (isvalidate) {
        setLoader(true);
        var user = await axios.get(`/dynamo/v1/logins/${input.email}`);
        user = user.data.data.Item;
        console.log(user);
        if (
          user.password === input.password &&
          user.ownermail === input.email
        ) {
          let username = user.ownername;
          localStorage.setItem("currentmail", input.email);
          localStorage.setItem("currentuser", username);
          notifyLogin();
          setMsg({});
          setTimeout(() => {
            navigate("/ownerDashboard");
          }, 2000);
          setMsg({});
        } else {
          setLoader(false);
          setMsg({ msg: "Incorrect mail Id or passsword" });
        }
      } else {
        setLoader(false);
        setMsg({ msg: "something went wrong" });
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  //MAIN RETURN
  return (
    <div id="login">
      <ReactNotifications />
      {/* back button */}
      <div id="backbuttoncontainer">
        <FaAngleLeft id="backicon" />
        <Link id="back" to="/">
          BACK
        </Link>
      </div>

      {/* main container */}
      <div id="container">
        <form onSubmit={submitform}>
          <img src="/asserts/images/logo.png" id="loginlogo" alt="" />
          <div id="loginheader">
            <strong>Login for Appointlet</strong>
          </div>
          <br />
          <span>
            Do not have an account?
            <Link to="/signup" id="accountexist">
              sign up
            </Link>
          </span>
          <div id="formDetails">
            <input
              autoComplete="off"
              type="text"
              id="email"
              placeholder="Email ID"
              name="email"
              onChange={handleinput}
              value={input.email || ""}
            />
            <span className="mailspan">{error.email || ""}</span>
            <input
              autoComplete="off"
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleinput}
              value={input.password || ""}
            />
            <span className="passwordspan">{error.password || ""}</span>
            <span className="nilAccount">{msg.msg || ""}</span>
            <button type="submit" id="signinbutton">
              {loader ? (
                <ThreeDots
                  height="25"
                  width="25"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                />
              ) : (
                "LogIn"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
