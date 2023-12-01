'use client'

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuFoodIcon from '@mui/icons-material/MenuFood';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Home() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                            <AddFoodForm />
                        </Grid>
                    </Grid>

                    <AppNavigation /> {/**App Navigation */}
                </Container>
            </React.Fragment>
        </LocalizationProvider>
    );
}

function AddFoodForm() {
    const [formData, setFormData] = React.useState({
        title: '',
        quantity: '',
        address: '',
        expirydate: '',
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
            const response = await fetch('http://localhost:3000/api/food', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                setSnackbarOpen(true);
                console.log('Food added successfully:', result.data);
                // Redirect to the homepage
                // OR if not using react-router-dom
                window.location.href = '/';
                // You can perform additional actions here if needed
            } else {
                console.error('Failed to add Food:', response.statusText);
                // Handle the error as needed
            }
        } catch (error) {
            console.error('Error adding Food:', error.message);
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
                    Your Donation has been added successfully!
                </MuiAlert>
            </Snackbar>

            <AppInput
                placeholder="Enter food title ex: Pizza, Biryani"
                required
                name="title"
                value={formData.title}
                onChange={handleInputChange}
            />
            <AppInput
                placeholder="Enter Quantity Ex: 12 peices of Pizza"
                required
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
            />
            <AppInput
                placeholder="Enter location, e.g: Mehdipatnam, Tolichowki"
                required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
            />

            <Box sx={{ margin: 2 }}>
            <DatePicker />
                
            </Box>

            

            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                    <Button variant="outlined" size="large" href="/food">
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large" type="submit">
                        View
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
                <BottomNavigationAction href='/' label="Student Resource Sharing" icon={<MenuFoodIcon />} />
                <BottomNavigationAction href='/food' label="Food Rescource Sharing" icon={<FoodBankIcon />} />
            </BottomNavigation>
        </Paper>
    );
}
