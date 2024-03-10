import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {    

<<<<<<< HEAD
  useEffect(() => {
    const getInfo = async () => {
      if (userSession) {
        try {
          const response = await axios.get('http://localhost:3001/profile', { params: { token: userSession } });
          setUser(response.data.user);
          console.log(user);
        } catch (error) {
          console.error('Error fetching user:', error);
=======
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
                // localStorage.setItem('email', email);
                const token = generateToken(20); 
                localStorage.setItem('token', token);
                axios.post("http://localhost:3001/startsession", { token, email })
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

    const generateToken = (length) => {
        const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let token = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters.charAt(randomIndex);
>>>>>>> frontend2
        }
        return token;
    };

    return (
        <div>
<<<<<<< HEAD
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Location: UCLA</p>

          <h3>My Visited</h3>
          <ul>
            {user.visited.map(shop => (
              <li key={shop._id}>
                <p>Name: {shop.name}</p>
                <p>Location: {shop.location.address}</p>
                <p>Rating: {shop.averageRating}</p>
              </li>
            ))}
          </ul>

=======
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
>>>>>>> frontend2
        </div>
      );
    }
    
export default Login;