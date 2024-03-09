import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from '../Ratings/ReviewForm';

function Template(){
    const [shop, setShop] = useState(null);

    useEffect(() => {
        const getInfo = async () => {
          const shop = localStorage.getItem('searchresult');
          if (shop) {
            try {
              const response = await axios.get('http://localhost:3001/searchresult', { params: { name: shop } });
              setShop(response.data.shop);
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

            <h3><center>Rating History</center></h3>
            <p>TO BE IMPLEMENTED</p>

        </div>
      ) : ( <p>Loading...</p> )}
      <ReviewForm/>
      <Link to="/home"><button>Back to home...</button></Link>
    </div>
  );
}

export default Template;