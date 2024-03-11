
import './Login.css';
import React, {useState} from "react"; 
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
 
function Login() { 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/login", { email, password });

      if (result.data === "Correct user and password.") {
        const token = generateToken(20);
        localStorage.setItem('token', token);
        axios.post("http://localhost:3001/startsession", { token, email });
        navigate("/home");
      } else if (result.data === "Password is wrong.") {
        alert("Password is incorrect, please try again.");
      } else {
        navigate("/signup");
        alert("No user exists with that email, please sign up.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateToken = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let token = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  };


  return ( //updated this as needed to figure out what i needed to change 
  <div className="Login-body">
    <div className = "main">
      <input type ="checkbox" id= "chk" aria-hidden = "true"/>
      <div className='signup'>
        <form>
          <label htmlFor = "chk" aria-hidden="true" className="Login-label" >Sign up</label>
          <input type= "text" name= "txt" placeholder='User Name' required= "" className = "login-input" />
          <input type= "email" name= "email" placeholder='Email' required= ""  className = "login-input" />
          <input type= "password" name= "pswd" placeholder='Password' required= ""  className = "login-input" />
          <button> Sign up</button>
        </form>
          
      </div>

      <div className = "login">
        <form onSubmit={handleSubmit}>
          <label htmlFor='chk' aria-hidden = "true" className="Login-label">Login</label>
          <input
            type = "email"
            name = "email"
            placeholder = "Email"
            required = ""
            className="login-input"  
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
          type = "password"
          name = "pswd"
          placeholder = "Password"
          required = ""  
          className="login-input"  
          onChange={(e) => setPassword(e.target.value)}
          />
          <button type ="submit">Login</button>
          </form>
      </div>
    </div>
    </div>
  );
}


export default Login;
