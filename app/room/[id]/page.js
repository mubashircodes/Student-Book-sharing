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
                        <RoomDetail id={params.id} />
                    </Grid>
                </Grid>

                <AppNavigation /> {/**App Navigation */}
            </Container>
        </React.Fragment>
    );
}

const RoomDetail = (room) => {
    const [room, setRoomData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/rooms/${room.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setRoomData(data.data);
                } else {
                    console.error('Failed to fetch room:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching room:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [room.id]);

    return (
        <Box mt={4}>
            {loading ? (
                <CircularProgress />
            ) : room ? (
                <Card>
                    <CardMedia
                        component="img"
                        alt={room.title}
                        height="300"
                        image={room.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {room.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Contact: {room.contact}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: {room.price}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {room.description}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {room.address}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" size="small" href={`/`}>
                            Go Back
                        </Button>
                    </CardActions>
                </Card>
            ) : (
                <Typography variant="body1">Room not found</Typography>
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
