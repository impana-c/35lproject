import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@mui/material/Paper';
import WifiIcon from '@mui/icons-material/Wifi';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import WashIcon from '@mui/icons-material/Wash';
import WcIcon from '@mui/icons-material/Wc';


export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cafeItem: {
     // Add margin to move the element down
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    border: 'none',
  },
  image: {
    width: '100%',
    height: '250px',
    borderRadius: theme.spacing(1),
    objectFit: 'cover', // Option 1: Crop the image
  },
  name: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '15px'
  },
  rating: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#f44336', // Red color for rating
    margin: theme.spacing(1, 0),
  },
  icon : {
    margin: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center', // Align items vertically
  }
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

  <>
  <Typography variant="h2" align="center" gutterBottom style={{ fontWeight: 'bold',  fontFamily: 'Poppins, sans-serif', color: '#4b3832' }}>
    Top Rated
  </Typography>

  <div className={classes.root}>
        <Grid container spacing={3}>
          {recommend.map((cafe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link
                  to="/searchresult" 
                  onClick={() => {
                      // Store the name in local storage before navigating
                      localStorage.setItem('searchresult', cafe.name);
                      console.log(localStorage.getItem('searchresult'))
                  }}
                  style={{ textDecoration: 'underline', fontFamily: 'Poppins, sans-serif' }}
              >
                
              <Paper elevation={3} className={classes.cafeItem}>
                <img className={classes.image} src={cafe.imgurl} alt={cafe.name} />
                <div className={classes.name}>{cafe.name}</div>
                <div className={classes.averageRating}>Rating: {cafe.averageRating}</div>
                <div className= {classes.icon}>
                <div className = {classes.wifi}>{cafe.wifi === 'yes' && <WifiIcon style = {{marginRight: '5px'}}/>} </div>
                <div classname = {classes.bathroom}>{cafe.bathrooms === 'yes' && <WcIcon/>} </div>
                </div>
              </Paper>
              </Link> 
            </Grid> 
          ))}
        </Grid>
    </div>

      <Link to="/home">
      <HomeIcon
        sx={{
          color: '#4b3832',
          fontSize: '45px',
          position: 'relative',
          bottom: '800px',
          left: '10px',
        }}
      >
      </HomeIcon>
    </Link>
    </>
  );
}
export default Recommendation;
