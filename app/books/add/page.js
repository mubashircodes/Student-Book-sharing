'use client'

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ margin: 5 }} />

        <Grid
          container
          justifyContent="center"
          direction="row"
          alignItems="center">
          <Grid item xs={6}>
            <AddBookForm />
          </Grid>
        </Grid>

        <AppNavigation /> {/**App Navigation */}
      </Container>
    </React.Fragment>
  );
}

function AddBookForm() {
  const [formData, setFormData] = React.useState({
    title: '',
    author: '',
    address: 'tolichowki',
    type: 'new',
    price: 0,
    image: 'https://m.media-amazon.com/images/I/61FmuzUH8AL._AC_UF1000,1000_QL80_.jpg'
  });
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSnackbarOpen(true);
        console.log('Book added successfully:', result.data);
        // Redirect to the homepage
        // OR if not using react-router-dom
        window.location.href = '/';
        // You can perform additional actions here if needed
      } else {
        console.error('Failed to add book:', response.statusText);
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error adding book:', error.message);
      // Handle the error as needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          Book added successfully!
        </MuiAlert>
      </Snackbar>

      <AppInput
        placeholder="Enter book title"
        required
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <AppInput
        placeholder="Enter book author"
        required
        name="author"
        value={formData.author}
        onChange={handleInputChange}
      />

      <Box sx={{ margin: 2 }}>
        <RadioGroup
          name="type"
          required
          value={formData.type}
          onChange={handleInputChange}
        >
          <FormControlLabel value="new" control={<Radio />} label="New" />
          <FormControlLabel value="used_new" control={<Radio />} label="Used – Like New" />
          <FormControlLabel value="used_good" control={<Radio />} label="Used – Good" />
          <FormControlLabel value="used_fair" control={<Radio />} label="Used – Fair" />
        </RadioGroup>
      </Box>

      <AppInput
        placeholder="Enter book price"
        type="number"
        required
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
      />

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <Button variant="outlined" size="large" href="/">
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" size="large" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

function AppInput(props) {
  return (
    <Box sx={{ margin: 2 }}>
      <FormControl fullWidth>
        <OutlinedInput {...props} />
      </FormControl>
    </Box>
  );
}

function AppNavigation() {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction label="Student Resource Sharing" icon={<MenuBookIcon />} />
        <BottomNavigationAction label="Food Rescource Sharing" icon={<FoodBankIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
