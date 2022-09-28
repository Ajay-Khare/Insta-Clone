import React from 'react';
import photo from '../universe.jpg'
import './landingPage.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';


function Landing_page() {
    const navigate = useNavigate()
    const [registered, setRegistered] = useState(true);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")

    const loginHandler = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(data => data.json())
            .then(res => {
                if (res.message === "Incorrect Password") {
                    // toast.error("Incorrect Password", { position: toast.POSITION.BOTTOM_CENTER })
                    alert("Wrong Password")
                }
                if (res.message === "USER NOT REGISTERED") {
                    // toast.error("User not Registered", { position: toast.POSITION.BOTTOM_CENTER })
                    alert("USER NOT REGISTERED")
                }
                if (res.message === "Success") {
                    sessionStorage.setItem("accessToken", res.token);
                    navigate("/feeds")
                }
            })
    }

    const registerHandler = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(data => data.json())
            .then(res => {
                if (res.message === "Success") {
                    // toast.success("Registered Successfully", { position: toast.POSITION.BOTTOM_CENTER })
                    alert("successfully Registered")
                    setRegistered(true)
                    navigate("/")
                }
                if (res.message === "User is Allready Registered") {
                    alert("User is Allready Registered - please Sign in")
                    // toast.error("User is Allready Registered", { position: toast.POSITION.BOTTOM_CENTER })

                }
            })

    }
    return (
        <>
            <div className="container">
                <div className="image">
                    <img src={photo} alt="" />
                </div>
                <div className="form">
                    <div>

                        {registered ?
                            <form className='loginForm'>
                                <input
                                    type="email"
                                    name='email'
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    placeholder='Email Address'
                                />
                                <br />
                                <input
                                    type="password"
                                    name='password'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    placeholder='password' />
                                <br />
                                <button onClick={loginHandler}>LogIn</button>
                                <p>or</p>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setRegistered(false)
                                }}>signUp</button>
                            </form>
                            :
                            <form className='registerForm'>
                                <input type="text" name="name" placeholder='Name'
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                                <br />
                                <input type="email" name="email" placeholder='Email Address'
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                                <br />
                                <input type="password" name='password' placeholder='Password'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                                <br />
                                <button onClick={registerHandler}>Register</button>
                            </form>}
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </>
    )
}
export default Landing_page