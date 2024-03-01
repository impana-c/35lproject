import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {    

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/login", { email, password })
        .then(result => {
            console.log(result)
            // Direct to homepage if user and password match
            if(result.data === "Correct user and password."){
                navigate("/home")
            // Otherwise send various alert messages if user doesn't exist/password doesn't match
            } else if (result.data === "Password is wrong."){
                alert("Password is incorrect, please try again.")
            } else{
                navigate("/signup")
                alert("No user exists with that email, please sign up.")
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <div>
                <h2><center>Login</center></h2>
                <form onSubmit={handleSubmit}> 
                {/* Create form with email, and password options */}
                    <div>
                        <label htmlFor="email">
                            <strong>Email: </strong>
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter Email' 
                            name='email' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">
                            <strong>Password: </strong>
                        </label>
                        <input
                            type="password" 
                            placeholder='Enter Password' 
                            name='password' 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button> Login</button>
                    </form>
                    <div>
                        Don't have an account?
                        <Link to="/signup"><button>Sign Up</button></Link>
                    </div>
                
            </div>
        </div>
      );
    }
    
export default Login;