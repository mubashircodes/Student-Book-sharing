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
  return (
    <form>
      <AppInput placeholder="Enter book title" required />
      <AppInput placeholder="Enter book author" required />

      <Box sx={{ margin: 2 }}>
        <RadioGroup
          name="book-condition"
          required
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
        defaultValue={0}
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
