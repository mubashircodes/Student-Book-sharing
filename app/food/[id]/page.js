'use client'

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { CircularProgress, Typography, Card, CardContent, CardMedia } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { AppNavigation } from '../../src/app_navigation';
import dayjs from 'dayjs';

export default function Home({ params }) {
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
                        <FoodDetail id={params.id} />
                    </Grid>
                </Grid>

                <AppNavigation /> {/**App Navigation */}
            </Container>
        </React.Fragment>
    );
}

const FoodDetail = (food) => {
    const [foodData, setFoodData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/foods/${food.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFoodData(data.data);
                } else {
                    console.error('Failed to fetch food:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching :', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFood();
    }, [food.id]);

    return (
        <Box mt={4}>
            {loading ? (
                <CircularProgress />
            ) : food ? (
                <Card>
                    <CardMedia
                        component="img"
                        alt={food.title}
                        height="300"
                        image={food.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {food.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {food.quantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Localty: {food.address}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Expiry Date: {dayjs(food.expirydate).format('DD MM YYYY')}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" size="small" href={`/`}>
                            Go Back
                        </Button>
                    </CardActions>
                </Card>
            ) : (
                <Typography variant="body1">food not found</Typography>
            )}
        </Box>
    );
};

function formatPrice(price) {
    if (!price) {
        return 'FREE';
    }

    return `₹${price.toLocaleString()}`;
}
