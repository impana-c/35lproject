import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function UpdateProfile(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [passwordOld, setPasswordOld] = useState("")
    const [passwordNew, setPasswordNew] = useState("")
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const userEmail = localStorage.getItem('email');
    const userSession = localStorage.getItem('token');

    useEffect(() => {
        const getInfo = async () => {
        //   const email = userEmail;
        //   if (email) {
        //     try {
        //       const response = await axios.get('http://localhost:3001/profile', { params: { email } });
        //       setUser(response.data.user);
        //     } catch (error) {
        //       console.error('Error fetching user:', error);
        //     }
        //   }
              // const email = localStorage.getItem('email');
            if (userSession) {
                try {
                    const response = await axios.get('http://localhost:3001/profile', { params: { token: userSession } });
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        
        };
        getInfo();
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/updateprofile", { name, email, passwordOld, passwordNew, userEmail })
        .then(result => {
            console.log(result)
            // Check for incorrect signups
            if (result.data === "Passwords do not match.") {
                alert("Your old password does not match, please try again.")
            } else if (result.data === "New password = current password.") {
                alert("The new password must be different from your current password.")
            } else if (result.data === "Enter old password first.") {
                alert("You must correctly enter your old password to update your password.")
            // Otherwise redirect to login page
            } else{
                navigate("/profile")
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <div>
            <h2><center>Update Profile</center></h2>
                {/* Create form with email, name, and password options */}
                {user ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">
                            <strong>Name: </strong>
                        </label>
                        <input 
                            type="text" 
                            placeholder={user.name}
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
                            placeholder={user.email}
                            name='email' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <p></p>
                    <p>Update password:</p>
                    <div>
                        <label htmlFor="passwordOld">
                            <strong>Current Password: </strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder='Enter Current Password' 
                            name='passwordOld' 
                            onChange={(e) => setPasswordOld(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="passwordNew">
                            <strong>New Password: </strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder='Enter New Password' 
                            name='passwordNew' 
                            onChange={(e) => setPasswordNew(e.target.value)}
                        />
                    </div>
                    <button> Save Changes </button>
                </form>
                ) : ( <p>Loading...</p> )}
                
            </div>
        </div>
      );
}

export default UpdateProfile;