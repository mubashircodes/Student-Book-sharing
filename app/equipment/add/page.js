'use client'

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AppNavigation } from '../../src/app_navigation';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Checkbox, FormControlLabel, FormLabel, InputLabel, MenuItem, Select } from '@mui/material';

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
                            <AddEquipForm />
                        </Grid>
                    </Grid>

                    <AppNavigation /> {/**App Navigation */}
                </Container>
            </React.Fragment>
        </LocalizationProvider>
    );
}

function AddEquipForm() {
    const [formData, setFormData] = React.useState({
        title: '',
        image: '',
        address: '',
        price: '',
        category: '',
        description: '',
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
    const handleCategoryChange = (event) => {
        setFormData({ ...formData, category: event.target.value });
    };
    const handleCheckboxChange = (event) => {
        setFormData({ ...formData, agreeToTerms: event.target.checked });
    };

    const onChooseImage = (event) => {
        const file = event.target.files[0];

        if (file && file.type.match('image.*')) {
            const reader = new FileReader();

            reader.onload = (readEvent) => {
                const image = new Image();
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxSideLength = 300;

                    if (image.width > image.height) {
                        canvas.width = maxSideLength;
                        canvas.height = (image.height / image.width) * maxSideLength;
                    } else {
                        canvas.height = maxSideLength;
                        canvas.width = (image.width / image.height) * maxSideLength;
                    }

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                    const dataURI = canvas.toDataURL('image/jpeg');

                    // Update your formData here
                    setFormData({ ...formData, image: dataURI });
                };

                image.src = readEvent.target.result;
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/equipment', {
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
                window.location.href = '/equipment';
                // You can perform additional actions here if needed
            } else {
                console.error('Failed to add equipment:', response.statusText);
                // Handle the error as needed
            }
        } catch (error) {
            console.error('Error adding equipment:', error.message);
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
                    Your Product has been added successfully!
                </MuiAlert>
            </Snackbar>

            <Box sx={{ margin: 2 }}>
                {formData.image && (
                    <Alert severity="success">
                        <AlertTitle>File attached successfully!</AlertTitle>
                        <img
                            src={formData.image}  // Replace with your state variable holding the data URI
                            alt="Preview"
                            style={{ height: '24px', marginRight: '10px' }}
                        />
                    </Alert>
                )}
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload image
                    <input
                        type="file"
                        onChange={onChooseImage}
                        accept="image/jpeg, image/png"
                        style={{
                            clip: 'rect(0 0 0 0)',
                            clipPath: 'inset(50%)',
                            height: 1,
                            overflow: 'hidden',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            whiteSpace: 'nowrap',
                            width: 1,
                        }}
                    />
                </Button>
            </Box>

            <AppInput
                placeholder="Enter the equipment name"
                required
                name="title"
                value={formData.title}
                onChange={handleInputChange}
            />
            <AppInput
                placeholder="location"
                required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
            />
            <AppInput
                placeholder="Price"
                required
                name="Price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
            />

            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    label="Category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    required
                >
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="sports">Sports Equipment</MenuItem>
                    <MenuItem value="tools">Tools</MenuItem>
                    {/* Add more categories as needed */}
                </Select>
            </FormControl>

            <AppInput
                placeholder="Enter equipment details"
                required
                multiline
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
            />

            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                    <Button variant="outlined" size="large" href="/food">
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large" type="submit">
                        Save
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
