// // import React, { useEffect, useState } from 'react';
// // import { Link } from "react-router-dom";
// // import axios from 'axios'
// // import { useNavigate } from "react-router-dom";
// // import './UpdateProfile.css'
// // import HomeIcon from '@mui/icons-material/Home';


// // function UpdateProfile(){
// //     const [name, setName] = useState("")
// //     const [email, setEmail] = useState("")
// //     const [passwordOld, setPasswordOld] = useState("")
// //     const [passwordNew, setPasswordNew] = useState("")
// //     const navigate = useNavigate()
// //     const [user, setUser] = useState(null);
// //     const userEmail = localStorage.getItem('email');
// //     const userSession = localStorage.getItem('token');

// //     useEffect(() => {
// //         const getInfo = async () => {
// //         //   const email = userEmail;
// //         //   if (email) {
// //         //     try {
// //         //       const response = await axios.get('http://localhost:3001/profile', { params: { email } });
// //         //       setUser(response.data.user);
// //         //     } catch (error) {
// //         //       console.error('Error fetching user:', error);
// //         //     }
// //         //   }
// //               // const email = localStorage.getItem('email');
// //             if (userSession) {
// //                 try {
// //                     const response = await axios.get('http://localhost:3001/profile', { params: { token: userSession } });
// //                     setUser(response.data.user);
// //                 } catch (error) {
// //                     console.error('Error fetching user:', error);
// //                 }
// //             }
        
// //         };
// //         getInfo();
// //       }, []);

// //     const handleSubmit = (e) => {
// //         e.preventDefault()
// //         axios.post("http://localhost:3001/updateprofile", { name, email, passwordOld, passwordNew, userEmail })
// //         .then(result => {
// //             console.log(result)
// //             // Check for incorrect signups
// //             if (result.data === "Passwords do not match.") {
// //                 alert("Your old password does not match, please try again.")
// //             } else if (result.data === "New password = current password.") {
// //                 alert("The new password must be different from your current password.")
// //             } else if (result.data === "Enter old password first.") {
// //                 alert("You must correctly enter your old password to update your password.")
// //             // Otherwise redirect to login page
// //             } else{
// //                 navigate("/profile")
// //             }
// //         })
// //         .catch(err => console.log(err))
// //     }

// //     return (
// //         <div>
// //         <Link to="/home">
// //         <HomeIcon
// //             sx={{
// //             color: '#4b3832',
// //             fontSize: '35px',
// //             textAlign: 'center',
// //             marginLeft: '5px',
// //             marginTop: '5px'
// //             }}
// //         >
// //         </HomeIcon>
// //         </Link>
// //         <div className="UpdateProfile-body">
// //             <div className = "UpdateProfile-main">
// //             <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize:'4vh', color: '#4b3832', textAlign: 'center', marginBottom: '5px', marginTop: '20px'}}>Update Profile</h4>
// //                 {/* Create form with email, name, and password options */}
// //                 {user ? (
// //                 <form onSubmit={handleSubmit} style = {{ textAlign: 'center'}}>
// //                     <div>
// //                         <label htmlFor="name">
// //                             <strong>Name: </strong>
// //                         </label>
// //                         <input 
// //                             type="text" 
// //                             placeholder={user.name}
// //                             name='Name' 
// //                             className="UpdateProfile-input"
// //                             onChange={(e) => setName(e.target.value)}
// //                         />
// //                     </div>
// //                     <div>
// //                         <label htmlFor="email">
// //                             <strong>Email: </strong>
// //                         </label>
// //                         <input 
// //                             type="text" 
// //                             placeholder={user.email}
// //                             name='email' 
// //                             className="UpdateProfile-input"
// //                             onChange={(e) => setEmail(e.target.value)}
// //                         />
// //                     </div>
// //                     <p></p>
// //                     <p></p>
// //                     <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize:'2.8vh', color: '#4b3832', textAlign: 'center', marginBottom: '5px', marginTop: '35px'}}>Update Password</h4>
// //                     <div>
// //                         <label htmlFor="passwordOld">
// //                             <strong>Current Password: </strong>
// //                         </label>
// //                         <input 
// //                             type="password" 
// //                             placeholder='Enter Current Password' 
// //                             name='passwordOld' 
// //                             className="UpdateProfile-input"
// //                             onChange={(e) => setPasswordOld(e.target.value)}
// //                         />
// //                     </div>
// //                     <div>
// //                         <label htmlFor="passwordNew">
// //                             <strong>New Password: </strong>
// //                         </label>
// //                         <input 
// //                             type="password" 
// //                             placeholder='Enter New Password' 
// //                             name='passwordNew' 
// //                             className="UpdateProfile-input"
// //                             onChange={(e) => setPasswordNew(e.target.value)}
// //                         />
// //                     </div>
// //                     <button className="UpdateProfile-button" size="medium"
// //             type="submit"
// //             variant="contained"
// //             style={{
// //               fontFamily: 'Poppins, sans-serif',
// //               backgroundColor: '#423629',
// //               color: '#fff',
// //               '&:hover': {
// //                 backgroundColor: '#30261d'
// //               },
// //               marginTop: '15px',
// //             }}> Save Changes </button>
// //                 </form>
// //                 ) : ( <p>Loading...</p> )}
                
// //             </div>
// //         </div>
// //         </div>
// //       );
// // }

// // export default UpdateProfile;

// import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";


// function UpdateProfile(){
//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [passwordOld, setPasswordOld] = useState("")
//     const [passwordNew, setPasswordNew] = useState("")
//     const navigate = useNavigate()
//     const [user, setUser] = useState(null);
//     const userEmail = localStorage.getItem('email');
//     const userSession = localStorage.getItem('token');

//     useEffect(() => {
//         const getInfo = async () => {
//         //   const email = userEmail;
//         //   if (email) {
//         //     try {
//         //       const response = await axios.get('http://localhost:3001/profile', { params: { email } });
//         //       setUser(response.data.user);
//         //     } catch (error) {
//         //       console.error('Error fetching user:', error);
//         //     }
//         //   }
//               // const email = localStorage.getItem('email');
//             if (userSession) {
//                 try {
//                     const response = await axios.get('http://localhost:3001/profile', { params: { token: userSession } });
//                     setUser(response.data.user);
//                 } catch (error) {
//                     console.error('Error fetching user:', error);
//                 }
//             }
        
//         };
//         getInfo();
//       }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post("http://localhost:3001/updateprofile", { name, email, passwordOld, passwordNew, userEmail })
//         .then(result => {
//             console.log(result)
//             // Check for incorrect signups
//             if (result.data === "Passwords do not match.") {
//                 alert("Your old password does not match, please try again.")
//             } else if (result.data === "New password = current password.") {
//                 alert("The new password must be different from your current password.")
//             } else if (result.data === "Enter old password first.") {
//                 alert("You must correctly enter your old password to update your password.")
//             // Otherwise redirect to login page
//             } else{
//                 navigate("/profile")
//             }
//         })
//         .catch(err => console.log(err))
//     }

//     return (
//         <div>
//             <div>
//             <h2><center>Update Profile</center></h2>
//                 {/* Create form with email, name, and password options */}
//                 {user ? (
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="name">
//                             <strong>Name: </strong>
//                         </label>
//                         <input 
//                             type="text" 
//                             placeholder={user.name}
//                             name='Name' 
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="email">
//                             <strong>Email: </strong>
//                         </label>
//                         <input 
//                             type="text" 
//                             placeholder={user.email}
//                             name='email' 
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <p></p>
//                     <p>Update password:</p>
//                     <div>
//                         <label htmlFor="passwordOld">
//                             <strong>Current Password: </strong>
//                         </label>
//                         <input 
//                             type="password" 
//                             placeholder='Enter Current Password' 
//                             name='passwordOld' 
//                             onChange={(e) => setPasswordOld(e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="passwordNew">
//                             <strong>New Password: </strong>
//                         </label>
//                         <input 
//                             type="password" 
//                             placeholder='Enter New Password' 
//                             name='passwordNew' 
//                             onChange={(e) => setPasswordNew(e.target.value)}
//                         />
//                     </div>
//                     <button> Save Changes </button>
//                 </form>
//                 ) : ( <p>Loading...</p> )}
                
//             </div>
//         </div>
//       );
// }

// export default UpdateProfile;

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './UpdateProfile.css';
import HomeIcon from '@mui/icons-material/Home';

function UpdateProfile(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const userEmail = localStorage.getItem('email');
    const userSession = localStorage.getItem('token');

    useEffect(() => {
        const getInfo = async () => {
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
        e.preventDefault();
        axios.post("http://localhost:3001/updateprofile", { name, email, passwordOld, passwordNew, userEmail })
        .then(result => {
            console.log(result);
            // Handle different responses from the server
            // Redirect to profile page on success
            navigate("/profile");
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <Link to="/home">
                <HomeIcon
                    sx={{
                        color: '#4b3832',
                        fontSize: '35px',
                        textAlign: 'center',
                        marginLeft: '5px',
                        marginTop: '5px'
                    }}
                />
            </Link>
            <div className="UpdateProfile-body">
            <div className = "UpdateProfile-main">
             <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize:'4vh', color: '#4b3832', textAlign: 'center', marginBottom: '5px', marginTop: '20px'}}>Update Profile</h4>
                    {user ? (
                       <form onSubmit={handleSubmit} style = {{ textAlign: 'center'}}>
                            <div>
                                <label htmlFor="name">
                                    <strong>Name: </strong>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder={user.name}
                                    name='Name' 
                                    className="UpdateProfile-input"
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
                                    className="UpdateProfile-input"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="UpdateProfile-password">
                            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize:'2.75vh', color: '#4b3832', textAlign: 'center', marginBottom: '5px', marginTop: '20px'}}>Update Password</h4>
                                <div>
                                    <label htmlFor="passwordOld">
                                        <strong>Current Password: </strong>
                                    </label>
                                    <input 
                                        type="password" 
                                        placeholder='Enter Current Password' 
                                        name='passwordOld' 
                                        className="UpdateProfile-input"
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
                                        className="UpdateProfile-input"
                                        onChange={(e) => setPasswordNew(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className="UpdateProfile-button" size="medium"
                                type="submit"
                                variant="contained"
                                style={{
                                fontFamily: 'Poppins, sans-serif',
                                backgroundColor: '#423629',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#30261d'
                                },
                                marginTop: '15px',
                                }}>
                                Save Changes
                            </button>
                        </form>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}



export default UpdateProfile;
