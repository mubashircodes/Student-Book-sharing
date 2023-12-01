'use client'

import * as React from 'react';
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
import { AppNavigation } from '../src/app_navigation';
import AddHomeIcon from '@mui/icons-material/AddHome';

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
            <EquipCardForm />
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
        <MenuItem href="/equipment/add" component="a">
          <AddHomeIcon />
          <ListItemText>Equipment</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}

function EquipCardForm() {
  const [equips, setEquips] = React.useState([]);

  React.useEffect(function () {
    fetchEquip().then(resp => {
      setEquips(resp);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      {equips.map((equip, idx) => (
        <Grid item xs={4} key={idx}>
          <RoomCard
            id={equip._id}
            title={equip.title}
            image={equip.image}
            price={equip.price}
            description={equip.description}
            address={equip.address}
            category={equip.category}
          />
        </Grid>
      ))}
    </Grid>
  );
}

async function fetchEquip() {
  const url = 'http://localhost:3000/api/equipment';
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

function RoomCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.image}
        title={props.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Title:{props.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Address:{props.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {props.price}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Description:{props.description}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {props.category}
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

function formatPrice(price) {
  if (!price) {
    return 'FREE';
  }

  return `₹${price.toLocaleString()}`;
}
