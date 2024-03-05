import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      const email = localStorage.getItem('email');
      if (email) {
        try {
          const response = await axios.get('http://localhost:3001/profile', { params: { email } });
          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    getInfo();
  }, []);

  return (
    <div>
      <h2><center>My Profile</center></h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Location: UCLA</p>
          {/* <p>Class of: <i>insert year</i></p>
          <p>Other preferences: <i>insert other preferences</i></p> */}
        </div>
      ) : ( <p>Loading...</p> )}
      <Link to="/updateprofile"> <button>Update Profile</button> </Link>
      <Link to="/home"> <button>Home</button> </Link>
    </div>
  );
}

export default Profile;

// import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";

// function Profile() {
//     const [email, setEmail] = useState('');

//     useEffect(() => {
//         const storedEmail = localStorage.getItem('email');
//         if (storedEmail) {
//             setEmail(storedEmail);
//         }
//     }, []);

//     return (
//         <div>
//             <h2>My Profile</h2>
//             <p>Email: {email}</p>
//             <Link to="/home"><button>Home</button></Link>
//         </div>
//     );
// }

// export default Profile;