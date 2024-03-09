import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = () => {
  const [coffeeShopName, setCoffeeShopName] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/reviews', { coffeeShopName, rating, review });
      console.log(res.data);
      // Clear form fields after submission
      setCoffeeShopName('');
      setRating('');
      setReview('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Review</h2>
      <div>
        <label>Coffee Shop Name:</label>
        <input type="text" value={coffeeShopName} onChange={(e) => setCoffeeShopName(e.target.value)} />
      </div>
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
  );
};

export default ReviewForm;
