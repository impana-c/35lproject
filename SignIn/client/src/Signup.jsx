import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup() {    

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     axios.post("http://localhost:3001/signup", { name, email, password })
    //     .then(result => {console.log(result)
    //     navigate("/login")
    //     })
    //     .catch(err => console.log(err))
    // }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/signup", { name, email, password })
        .then(result => {
            console.log(result)
            // Check for incorrect signups
            if(result.data === "Name, email, and password are required"){
                alert("All fields are required, please try again.")
            } else if (result.data === "An account already exists with that email."){
                alert("An account already exists with that email, please log in.")
            // Otherwise redirect to login page
            } else{
                navigate("/login")
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <div>
            <h2><center>Sign Up</center></h2>
                {/* Create form with email, name, and password options */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">
                            <strong>Name: </strong>
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter Name' 
                            name='Name' 
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    <button> Sign Up </button>
                    </form>
    
                    <div>
                        Already have an account?
                        <Link to="/login"><button> Login </button></Link>
                    </div>
                
            </div>
        </div>
      );
    }
    
export default Signup;