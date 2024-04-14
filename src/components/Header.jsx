import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Logo from '../assets/icons/logo.png';

const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          className='logoSection'
          style={{ display: 'flex', flexFlow: 'row no wrap' }}
        >
          <div>
            <img src={Logo} alt='Logo' />
          </div>
          <div>
            <Typography variant='h6' className='logo'>
              <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
                Weather App
              </Link>
            </Typography>
          </div>
        </div>
        <nav>
          <ul
            style={{
              display: 'flex',
              listStyleType: 'none',
              alignItems: 'center',
            }}
          >
            <li style={{ marginRight: '1rem' }}>
              <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/favorites'
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
