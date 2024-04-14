import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCitySuggestions,
  selectCity,
} from '../store/actions/weatherActions';
import {
  TextField,
  Paper,
  Popper,
  List,
  ListItem,
  ListItemText,
  Modal,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const SearchBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false); // State to control error modal visibility
  const suggestions = useSelector((state) => state.weather.suggestions);
  const dispatch = useDispatch();

  const handleInputChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (/^[a-zA-Z]+$/.test(term)) {
      if (term.length >= 3) {
        try {
          dispatch(fetchCitySuggestions(term));
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      }
    } else {
      setShowErrorModal(true);
    }
  };

  const handleSelectCity = (city) => {
    dispatch(selectCity(city));
    setSearchTerm(city.city);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'search-suggestions-popper' : undefined;

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setSearchTerm(''); // Reset search term to an empty string
  };
  return (
    <div className='searchBar'>
      <TextField
        label='Search City'
        value={searchTerm}
        style={{ width: '300px', margin: 'auto' }}
        onChange={handleInputChange}
        fullWidth
        onClick={handleClick}
      />
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Paper>
          <List>
            {suggestions.map((city, index) => (
              <ListItem key={index} onClick={() => handleSelectCity(city)}>
                <ListItemText primary={`${city.city}, ${city.country}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
      <Modal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        aria-labelledby='error-modal-title'
        aria-describedby='error-modal-description'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          style={{
            maxWidth: '400px',
            padding: '20px',
            backgroundColor: '#f4f4f4',
            position: 'relative',
          }}
        >
          <Typography variant='h6' id='error-modal-title' align='center'>
            Error
          </Typography>
          <Typography
            variant='body1'
            id='error-modal-description'
            align='center'
          >
            Only English letters are allowed in the search field.
          </Typography>
          <IconButton
            aria-label='close'
            // onClick={() => setShowErrorModal(false)}
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              zIndex: 999,
            }} // Ensure higher z-index
          >
            <CloseIcon />
          </IconButton>
        </Paper>
      </Modal>
    </div>
  );
};

export default SearchBar;
