import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ReviewForm = () => {
  const [coffeeShopName, setCoffeeShopName] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
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
            setCoffeeShopName(response.data.shop.name);
            const response2 = await axios.get('http://localhost:3001/profile', { params: { token: userSession } });
            setUser(response2.data.user);
          } catch (error) {
            console.error('Error fetching shop:', error);
          }
        }
      };
  
      getInfo();
    }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (rating < 1 || rating > 5){
        alert("Rating is outside of range, please try again.")
        return; }
      const res = await axios.post('http://localhost:3001/reviews', { coffeeShopName, rating, review, userID: user._id, shopID: shop._id });
      console.log(res.data);
      console.log(coffeeShopName);
     
      setRating('');
      setReview('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Submit a Review</h4>
        {user ? (
            <p>User associated with review: {user.name}</p> //change this text later for frontend
          ) : (<p>Loading...</p>) }
        <div>
          <label>Rating:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
        <div>
          <label>Review:</label>
          <textarea value={review} onChange={(e) => setReview(e.target.value)}></textarea>
        </div>
        <button type="submit">Submit Review</button>
      </form>
      <h4>Past Reviews</h4>
      {shop ? (
        <div>
          <ul>
            {shop.ratings.map(ratings => (
              <li key={ratings._id}>
                <p>User: {ratings.username}</p>
                <p>Rating: {ratings.rating}</p>
                <p>Review: {ratings.review}</p>
              </li>
            ))}
          </ul>

        </div>
      ) : ( <p>Loading...</p> )}
    </div>
  );
};

export default ReviewForm;
