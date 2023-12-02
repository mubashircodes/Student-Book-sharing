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
import AddIcon from '@mui/icons-material/Add';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import backgroundImage from './path-to-your-background-image/background.jpg';

const brightBlue = '#00BFFF'; // Bright blue color
const brightGreen = '#00FF00'; // Bright green color

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: url(${backgroundImage}), // Set the background image
    backgroundSize: 'cover', // Make sure the image covers the entire container
    backgroundPosition: 'center', // Center the background image
    minHeight: '100vh', // Make sure the container takes at least the full viewport height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a semi-transparent white background to make the content readable
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(5),
  },
  brightPaper: {
    backgroundColor: brightBlue,
    color: 'white',
    padding: theme.spacing(2),
  },
  brightMenu: {
    backgroundColor: brightBlue,
    color: 'white',
  },
  brightCard: {
    backgroundColor: brightGreen,
    color: 'white',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.root} fixed>
        <Box className={classes.contentContainer}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <AppMenu classes={classes} />
            </Grid>
            <Grid item xs={10}>
              <Listofbooks classes={classes} />
            </Grid>
          </Grid>
          {/* App Navigation */}
          <AppNavigation />
        </Box>
      </Container>
    </React.Fragment>
  );
}

// (Rest of the code remains unchanged)
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
          <Button variant="contained" size="small" href={/room/${props.id}}>
            View
          </Button>
        </CardActions>
      </Card>
    );
  }