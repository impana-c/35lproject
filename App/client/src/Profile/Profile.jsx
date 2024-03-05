import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const userSession = localStorage.getItem('token');

  useEffect(() => {
    const getInfo = async () => {
      // const email = localStorage.getItem('email');
      // if (email) {
      //   try {
      //     const response = await axios.get('http://localhost:3001/profile', { params: { email } });
      //     setUser(response.data.user);
      //   } catch (error) {
      //     console.error('Error fetching user:', error);
      //   }
      // }
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
      <Link to="/signup"><button
          onClick={() => {
              axios.post("http://localhost:3001/endsession", { token: userSession })
                  .then(response => {
                      localStorage.setItem('token', "");
                  })
                  .catch(error => {});
              localStorage.setItem('searchresult', "");
          }}
      >Logout</button></Link> 

    </div>
  );
}

export default Profile;