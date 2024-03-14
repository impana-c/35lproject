import './Login.css'; //imports the css file 
import React, {useState} from "react"; 
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'; 
 
function Login() { 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [name, setName] = useState()
  const [password2, setPassword2] = useState()

  const login_func = async () => { 
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login_func();
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/signup", { name, email, password, password2 });
      console.log(result);
      if (result.data === "Name, email, and password are required") {
        alert("All fields are required, please try again.");
      } else if (result.data === "An account already exists with that email.") {
        alert("An account already exists with that email, please log in.");
      } else if (result.data === "Passwords do not match.") {
        alert("Passwords do not match, please try again.");
      } else {
        await login_func();
        navigate("/home");
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
    <div>
    <h1 style={{ 
        fontFamily: 'Poppins, sans-serif', 
        fontSize: '10vh', 
        color: '#30261d', 
        textAlign: 'center',
        textShadow: '0 0px 100px white', // Adding white shadow with blur and offset
        fontWeight: 'bold',
        marginBottom: '2rem'
      }}>cafFIEND</h1>
    <div className = "main">
      <input type ="checkbox" id= "chk" aria-hidden = "true"/>
      <div className='signup'>
        <form onSubmit={handleSignUp}>
        <label htmlFor="chk" aria-hidden="true" className="Login-label" style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '2rem' }}>Sign up</label>
          <input type= "text" name= "txt" placeholder='User Name' required= "" className = "login-input" style={{ fontFamily: 'Poppins, sans-serif' }} onChange={(e) => setName(e.target.value)} />
          <input type= "email" name= "email" placeholder='Email' required= ""  className = "login-input" style={{ fontFamily: 'Poppins, sans-serif' }} onChange={(e) => setEmail(e.target.value)} />
          <input type= "password" name= "pswd" placeholder='Password' required= ""  className = "login-input" style={{ fontFamily: 'Poppins, sans-serif' }} onChange={(e) => setPassword(e.target.value)} />
          <input type= "password" name= "pswd" placeholder='Retype Password' required= ""  className = "login-input" style={{ fontFamily: 'Poppins, sans-serif' }} onChange={(e) => setPassword2(e.target.value)} />
          <button style={{ fontFamily: 'Poppins, sans-serif' }}> Sign up</button>

        </form>
      </div>


      <div className = "login">
        <form onSubmit={handleSubmit}>
        <label htmlFor='chk' aria-hidden="true" className="Login-label" style={{ fontFamily: 'Poppins, sans-serif' , paddingTop: '2rem',  marginTop: '3.5rem'}}>Login</label>
          <input
            type = "email"
            name = "email"
            placeholder = "Email"
            required = ""
            className="login-input"  
            style={{ fontFamily: 'Poppins, sans-serif' , marginBottom: '1.25rem' ,  marginTop: '-1rem'}}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
          type = "password"
          name = "pswd"
          placeholder = "Password"
          required = ""  
          className="login-input"  
          style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '3rem' }}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button type ="submit" style={{ fontFamily: 'Poppins, sans-serif'}}>Login</button>
          </form>
      </div>
    </div>
    </div>
    </div>
  );
}


export default Login;