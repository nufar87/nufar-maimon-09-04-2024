import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useTheme from '@mui/material/styles/useTheme';
import { fetchFavorite } from '../store/actions/weatherActions';
import FavoriteCard from '../components/FavoriteCard';
import { Grid } from '@mui/material';

const FavoritesPage = () => {
  const theme = useTheme();
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const dispatch = useDispatch();

  const handleFavoriteCardClick = (favorite) => {
    dispatch(fetchFavorite(favorite));
  };

  return (
    <div
      style={{
        marginLeft: '20px',
        display: 'flex',
        margin: '8px',
        height: '100%',
        flexDirection: 'column',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ marginLeft: '24px' }}>
        <h3 style={{ color: theme.palette.primary.dark }}>Favorites</h3>
      </div>
      <div>
        <Grid
          container
          spacing={2}
          alignItems='stretch'
          style={{ justifyContent: 'center' }}
        >
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <Grid item xs={12} sm={4} md={3} lg={2} key={index}>
                <Link
                  to='/'
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    onClick={() => handleFavoriteCardClick(favorite)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Grid
                      container
                      spacing={1}
                      alignItems='stretch'
                      justifyContent='center'
                    >
                      <FavoriteCard fav={favorite} />
                    </Grid>
                  </div>
                </Link>
              </Grid>
            ))
          ) : (
            <p>Start collecting your favorite cities!</p>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default FavoritesPage;
