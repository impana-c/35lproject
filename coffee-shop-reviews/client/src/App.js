import React, { useState } from 'react';
import ReviewForm from './components/ReviewForm.js';


const App = () => {
  const [ratings, setRatings] = useState([]);

  const handleSubmit = (newRating) => {
    setRatings([...ratings, newRating]);
  };

  return (
    <div>
      <h1>Coffee Shop Ratings & Reviews</h1>
      <ReviewForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;