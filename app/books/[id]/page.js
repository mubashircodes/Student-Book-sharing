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
            <BookDetail id={params.id} />
          </Grid>
        </Grid>

        <AppNavigation /> {/**App Navigation */}
      </Container>
    </React.Fragment>
  );
}

const BookDetail = (props) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/books/${props.id}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data.data);
        } else {
          console.error('Failed to fetch book:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching book:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [props.id]);

  return (
    <Box mt={4}>
      {loading ? (
        <CircularProgress />
      ) : book ? (
        <Card>
          <CardMedia
            component="img"
            alt={book.title}
            height="300"
            image={book.image}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {book.title}
            </Typography>
            <Typography variant="h5" component="div">
              {formatPrice(book.price)}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Author: {book.author}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Localty: {book.address}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Condition: {book.condition}
            </Typography>
            <Typography variant="body1">{book.description}</Typography>
            {/* Add other book details as needed */}
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small" href={`/`}>
              Go Back
            </Button>
            {book.userEmail && (
              <Button variant="contained" size="small" href={`mailto:${book.userEmail}`}>
                Contact
              </Button>
            )}
          </CardActions>
        </Card>
      ) : (
        <Typography variant="body1">Book not found</Typography>
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
