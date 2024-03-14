import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ReviewForm = () => {
  const [coffeeShopName, setCoffeeShopName] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [shop, setShop] = useState(null);
  const [user, setUser] = useState(null);
  const userSession = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      const shopName = localStorage.getItem('searchresult');
      if (shopName) {
        try {
          const response = await axios.get('http://localhost:3001/searchresult', { params: { name: shopName } });
          setShop(response.data.shop);
          setCoffeeShopName(response.data.shop.name);
          if (userSession) {
            const response2 = await axios.get('http://localhost:3001/profile', { params: { token: userSession } });
            setUser(response2.data.user);
          }
        } catch (error) {
          console.error('Error fetching shop:', error);
        }
      }
    };

    getInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      alert("Rating is outside of range, please try again.");
      return;
    }
    try {
      const res = await axios.post('http://localhost:3001/reviews', { coffeeShopName, rating, review, userID: user._id, shopID: shop._id });
      console.log(res.data);
      alert("Review submitted.");
      setRating('');
      setReview('');
      navigate("/searchresult"); // Ensure you have a route configured to handle this path
    } catch (err) {
      console.error(err);
    }
  };

  const renderStars = (ratingValue) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < ratingValue ? <StarIcon key={i} /> : <StarBorderIcon key={i} />);
    }
    return stars;
  };


  const userInformation = user ? (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
      <Avatar />
      <Typography variant="subtitle1" component="p" sx={{ my: 'auto' }}>{user.name}</Typography>
    </Box>
  ) : (
    <Typography>Loading...</Typography>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Submit a Review</h4>
        {userInformation}
        <TextField
          label="Rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#423629',
              '&:hover': {
                backgroundColor: '#30261d',
              }
            }}
          >
            Submit Review
          </Button>
        </Box>
      </form>

      <h4>Past Reviews</h4>
      {shop && shop.ratings && shop.ratings.length > 0 ? (
        <Box sx={{ overflowY: 'auto', maxHeight: 300 }}>
          {shop.ratings.map((rating) => (
          <Box key={rating._id} sx={{ margin: '10px', padding: '10px', border: '0.75px solid #ccc', borderRadius: '3px' }}>
            <Typography variant="subtitle1">User: {rating.username}</Typography>
            <Box display="flex">
              {renderStars(rating.rating)}
            </Box>
            <Typography variant="body2">Review: {rating.review}</Typography>
          </Box>
        ))}
        </Box>
      ) : <Typography>No reviews available.</Typography>}
    </div>
  );
};

export default ReviewForm;
