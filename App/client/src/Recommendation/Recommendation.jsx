import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@mui/material/Paper';
import WifiIcon from '@mui/icons-material/Wifi';
import WcIcon from '@mui/icons-material/Wc';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';


const useStyles = makeStyles((theme) => ({
  cafeItem: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    border: 'none',
     height: '250px'
    
  },
  image: {
    width: '100%',
    height: '150px', 
    borderRadius: theme.spacing(1),
    objectFit: 'cover',
  },
  name: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: theme.spacing(1, 0),
  },
  features: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(1, 0),
  },
  averageRating: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#f44336',
  },
}));

function Recommendation() {
  const classes = useStyles();
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    const getRecommendation = async () => {
      try {
        const response = await axios.get('http://localhost:3001/toprated');
        setRecommend(response.data.result);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    getRecommendation();
  }, []);

  return ( //took grid logic from componenet to showcase them
  <div>
    <Link to="/home" style={{ textDecoration: 'underline', color: 'black'  }}>
  <Typography
    variant="h6"
    component="div"
    sx={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: '24px',
      cursor: 'pointer',
    }}
  >
    Go back to Home
  </Typography>
</Link>
  <Typography variant="h2" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
    Top Rated
  </Typography>
  <Grid container spacing={3}f alignItems="center">
    {recommend.map((cafe, index) => (
      <Grid item xs={12} sm={6} md={4} key={index} style={{ height: '300px', width: '300px' }}>
        <Paper elevation={3} className={classes.cafeItem}>
          <Link to="/searchresult" onClick={() => localStorage.setItem('searchresult', cafe.name)}>
            <img className={classes.image} src={cafe.imgurl} alt={cafe.name} />
            <div className={classes.name} style={{ color: 'black' }}>{cafe.name}</div>
            <div className={classes.features}>
            <div className={classes.averageRating} style={{ color: 'black' }}>Rating: {cafe.averageRating}</div>
              {cafe.wifi === 'yes' && <WifiIcon />}
              {cafe.bathrooms === 'yes' && <WcIcon />}
            </div>
          </Link>
        </Paper>
      </Grid>
    ))}
  </Grid>
</div>
);
}
export default Recommendation;
