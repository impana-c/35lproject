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
      <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize:'4vh', color: '#4b3832', textAlign: 'center'}}>My Profile</h4>
      {user ? (
        <div style ={{textAlign: 'center', fontFamily: 'Poppins, sans-serif', marginTop: '-20px'}}>
          <div >
          <p> <strong> Name: </strong> {user.name}</p>
          <p> <strong> Email: </strong>{user.email}</p>
          <p> <strong> Location: </strong>UCLA</p>
          </div>

          <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize:'4vh', color: '#4b3832', textAlign: 'center', marginBottom: '5px', marginTop: '-5px'}}>History</h4>
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
      <Link to="/updateprofile"> <button className='Profile-button' style={{
              fontFamily: 'Poppins, sans-serif',
              backgroundColor: '#423629',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#30261d'
              },
              marginTop: '10px',
            }}>Update Profile</button> </Link>
      <Link to="/home"> <button className="Profile-button" style={{
              fontFamily: 'Poppins, sans-serif',
              backgroundColor: '#423629',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#30261d'
              },
              marginTop: '10px',
            }}>Home</button > </Link>
      <Link to="/"><button className='Profile-button' style={{
              fontFamily: 'Poppins, sans-serif',
              backgroundColor: '#423629',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#30261d'
              },
              marginTop: '10px',
            }}
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