'use client'

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ margin: 5 }} />
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <AppMenu />
          </Grid>
          <Grid item xs={10}>
            <ListofFoods />
          </Grid>
        </Grid>
        <AppNavigation /> {/**App Navigation */}
      </Container>
    </React.Fragment>
  );
}

function AppMenu() {
  return (
    <Paper>
      <MenuList>
        <MenuItem href="/food/add" component="a">
          <AddIcon />
          <ListItemText>Donate</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}

function ListofFoods() {
  const [foods, setFoods] = React.useState([]);

  React.useEffect(function () {
    fetchFood().then(resp => {
      setFoods(resp);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      {foods.map((food, idx) => (
        <Grid item xs={4} key={idx}>
          <FoodCard
            id={food._id}
            title={food.title}
            quantity={food.quantity}
            address={food.address}
            expirydate={food.expirydate}
            image={food.image}
          />
        </Grid>
      ))}
    </Grid>
  );
}

async function fetchFood() {
  const url = 'http://localhost:3000/api/food';
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

function AppNavigation() {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction label="Student Resource Sharing" icon={<MenuBookIcon />} />
        <BottomNavigationAction href='/food' label="Food Rescource Sharing" icon={<FoodBankIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

function FoodCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.image}
        title={props.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {props.quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Localty: {props.address}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Expiry Date: {props.expirydate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" href={`/food/${props.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

function formatPrice(price) {
  if (!price) {
    return 'FREE';
  }

  return `₹${price.toLocaleString()}`;
}
