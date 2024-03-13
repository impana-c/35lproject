import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'

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
    <div className = "Profile-body">
         <div className = "Profile-main">
      <h2 style= {{textAlign: 'center', fontWeight: 'bold'}}>My Profile</h2>
      {user ? (
        <div style ={{textAlign: 'center'}}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Location: UCLA</p>

          <h2>History</h2>
          <ul style={{ maxHeight: '100px', overflowY: 'auto', listStyle: 'none' }}>
            {user.visited.map(shop => (
              <li key={shop._id} style={{alignItems: 'center', marginLeft: '-30px', marginBottom: '10px' }}>
              <h4 style={{ margin: 0 }}>Name: {shop.name}</h4>
              <p style={{ margin: 0 }}>Location: {shop.location.address}</p>
              <p style={{ margin: 0 }}>Rating: {shop.averageRating}</p>
              </li>
            ))}
          </ul>

        </div>
      ) : ( <p>Loading...</p> )}
      <Link to="/updateprofile"> <button className='Profile-button'>Update Profile</button> </Link>
      <Link to="/home"> <button className="Profile-button">Home</button > </Link>
      <Link to="/"><button className='Profile-button'
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
</div>
  );
}

export default Profile;