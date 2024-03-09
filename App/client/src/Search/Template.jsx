import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from '../Ratings/ReviewForm';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const libraries = ['places'];

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

      const mapContainerStyle = {
        height: '400px',
        width: '50%'
      };
      const center = {
        lat: shop && shop.location.coordinates[0],
        lng: shop && shop.location.coordinates[1]
      };
      const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'YOURAPIKEY', //CHANGE
        libraries,
      });
      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading maps</div>;
      }
    
    return (
    <div>
        <h2><center>{localStorage.getItem('searchresult')}</center></h2>
      {shop ? (
        <div>
            <span>
              <div>
                <p>Location: {shop.location.address}</p>
                <p>Average rating: {shop.averageRating}</p>
                <p>Cost: {shop.cost}</p> {/* replace with number of $ */}
              </div>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={17}
                center={center}
              >
                <MarkerF position={center}/>
              </GoogleMap>
            </span>

            <h3>Features:</h3>
            <li>Bathrooms: {shop.bathrooms}</li>
            <li>Wifi: {shop.wifi}</li>
            <li>Noise: {shop.noise}</li>
            <li>Studyability: {shop.studyability}</li>

            <h3><center>Ratings & Reviews</center></h3>
            <ReviewForm/>
    
        </div>
      ) : ( <p>Loading...</p> )}
      
      <Link to="/home"><button>Back to home...</button></Link>
      <br/>
      <center><small>Note: much of the data on this page was taken from 'yelp.com'.</small></center>
    </div>
  );
}

export default Template;