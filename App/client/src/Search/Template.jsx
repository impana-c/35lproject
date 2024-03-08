import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Template(){
    const [shop, setShop] = useState(null);
    const [user, setUser] = useState(null);
    const userSession = localStorage.getItem('token');

    useEffect(() => {
        const getInfo = async () => {
          const shop = localStorage.getItem('searchresult');
          if (shop) {
            try {
              const response = await axios.get('http://localhost:3001/searchresult', { params: { name: shop } });
              setShop(response.data.shop);
              const response2 = await axios.get('http://localhost:3001/profile', { params: { token: userSession } });
              setUser(response2.data.user);
            } catch (error) {
              console.error('Error fetching shop:', error);
            }
          }
        };
    
        getInfo();
      }, []);
    

    return (
    <div>
        <h2><center>{localStorage.getItem('searchresult')}</center></h2>
      {shop ? (
        <div>
            <p>Location: {shop.location.address}</p>
            <p>Average rating: {shop.averageRating}</p>
            <p>Cost: {shop.cost}</p> {/* replace with number of $ */}

            <h3>Features:</h3>
            <li>Bathrooms: {shop.bathrooms}</li>
            <li>Wifi: {shop.wifi}</li>
            <li>Noise: {shop.noise}</li>
            <li>Studyability: {shop.studyability}</li>

            <h3><center>Ratings & Reviews</center></h3>
            <h4>Add a Review</h4>
            {user ? (
              <ul>User associated with review: {user.name}</ul> //change this text later for frontend
            ) : (<ul>Loading...</ul>) }
            {/* ADD RATING COMPONENT HERE */}
            <p>TO BE IMPLEMENTED</p>
    
            <h4>Past Reviews</h4>
        </div>
      ) : ( <p>Loading...</p> )}
      <Link to="/home"><button>Back to home...</button></Link>
      <br/>
      <p><center><small>Note: much of the data on this page was taken from 'yelp.com'.</small></center></p>
    </div>
  );
}

export default Template;