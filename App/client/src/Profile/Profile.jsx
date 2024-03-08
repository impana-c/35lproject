import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const userSession = localStorage.getItem('token');

  useEffect(() => {
    const getInfo = async () => {
      if (userSession) {
        try {
          const response = await axios.get('http://localhost:3001/profile', { params: { token: userSession } });
          setUser(response.data.user);
          console.log(user);
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