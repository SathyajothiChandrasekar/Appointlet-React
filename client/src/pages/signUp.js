import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import axios from 'axios';

export const SignUp = () => {

    //STATES
    const [input, setInput] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState({});
    const [loader, setLoader] = useState(false);
    // const [msg, setMsg] = useState({})

    //NAVIGATION
    const navigate = useNavigate();


    //FUNCTION FOR HANDLING INPUT
    const handleinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'email') {
            setError((prev) => {
                delete prev.email;
                return prev;
            })
        } else if (name === "password") {
            setError((prev) => {
                delete prev.password;
                return prev;
            })
        } else {
            setError((prev) => {
                delete prev.name;
                return prev;
            })
        }

        setInput((prev) => ({ ...prev, [name]: value }));
    };


    //FORM VALIDATION
    const validateForm = async () => {
        let err = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z]+$/;

        //name validation
        if (input.name === "") {
            err.name = "*Please enter username";
        } else if (!nameRegex.test(input.name)) {
            err.name = "*Name must be alphabet";
        } else {
            delete err.name;
        }

        //mail validation
        if (input.email === "") {
            err.email = "*Please enter email Id";
        } else if (!emailRegex.test(input.email)) {
            err.email = "*Please enter a valid Mail ID";
        } else {
            delete err.email;
        }

        //password validation
        if (input.password === "") {
            err.password = "*Please enter a password";
        } else if (input.password.length < 8) {
            err.password = "*Password should be  8 characters or more";
        } else {
            delete err.password;
        }

        setError({ ...err });
        return Object.keys(err).length < 1;
    };


    //FUNCTION FOR FORM SUBMISSION
    const submitform = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoader(true);
            try {
                console.log("try");
                let users = await axios.get(`/dynamo/v1/logins/${input.email}`);
                var usermail = users.data.data.Items;
                console.log('try2');
                if (
                    input.name !== "" &&
                    input.email !== "" &&
                    input.password !== "" &&
                    input.password.length > 8 &&
                    usermail?.ownermail !== input.email
                ) {
                    console.log('axios')
                    axios.put("/dynamo/v1/logins", {
                        ownername: input.name,
                        ownermail: input.email,
                        password: input.password,
                    }).then((res) => {
                        localStorage.setItem("currentmail", input.email);
                        localStorage.setItem("currentuser", input.name);
                        setLoader(false)
                        navigate("/ownerDashboard");
                    })
                        .catch(err => {
                            setLoader(false);
                            console.log(err);
                        });
                } else {
                    setLoader(false);
                }
            } catch (error) {
                setLoader(false);
                console.log(error);
            }
        }
    };



    //MAIN RETURN
    return (
        <div>
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
                    <img src="/asserts/images/logo.png" id="signuplogo" alt="" />
                    <div id="signupheader">
                        <strong>Sign Up for Appointlet</strong>
                    </div>
                    <br />
                    <span>
                        Already have an account?
                        <Link to="/login" id="accountexist">
                            login
                        </Link>
                    </span>
                    <div id="formDetails">
                        <input
                            autoComplete="off"
                            type="text"
                            id="name"
                            placeholder="User Name"
                            name="name"
                            onChange={handleinput}
                        />
                        <span className="namespan">{error.name || ""}</span>
                        <input
                            autoComplete="off"
                            type="text"
                            id="mail"
                            placeholder="E Mail ID"
                            name="email"
                            onChange={handleinput}
                        />
                        <span className="emailspan">{error.email || ""}</span>
                        <input
                            autoComplete="off"
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleinput}
                        />
                        <span className="passwordspan">{error.password || ""}</span>
                        <button
                            type="submit"
                            id="signupbutton"
                            defaultValue="Sign up">
                            {loader ? (
                                <TailSpin
                                    height="25"
                                    width="25"
                                    color="white"
                                    ariaLabel="tail-spin-loading"
                                    radius="1"
                                />
                            ) : (
                                "Sign up"
                            )}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

