'use client'
import React from 'react';
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
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { AppNavigation } from '../src/app_navigation';

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ margin: 5 }} />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <AppMenu />
          </Grid>
          <Grid item xs={9}>
            <RoomCardForm />
          </Grid>
        </Grid>
        <AppNavigation />
      </Container>
    </React.Fragment>
  );
}

function AppMenu() {
  return (
    <Paper sx={{ padding: 2 }}>
      <MenuList>
        <MenuItem href="/room/add" component="a" sx={{ display: 'flex', alignItems: 'center' }}>
          <AddHomeIcon sx={{ marginRight: 1 }} />
          <ListItemText>Rooms</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

function RoomCardForm() {
  const [rooms, setRooms] = React.useState([]);

  React.useEffect(function () {
    fetchRoom().then((resp) => {
      setRooms(resp);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      {rooms.map((room, idx) => (
        <Grid item xs={4} key={idx}>
          <RoomCard
            id={room._id}
            title={room.title}
            condition={room.condition}
            image={room.image}
            price={room.price}
            contact={room.contact}
            description={room.description}
            address={room.address}
          />
        </Grid>
      ))}
    </Grid>
  );
}

async function fetchRoom() {
  const url = 'http://localhost:3000/api/room';
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

function RoomCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={props.image} title={props.title} />
      <CardContent>
        <Typography variant="h6" gutterBottom component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Condition: {props.condition}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact: {props.contact}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {props.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {props.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {props.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" href={`/room/${props.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
