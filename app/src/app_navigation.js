import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Paper from '@mui/material/Paper';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AddHomeIcon from '@mui/icons-material/AddHome';
import DevicesIcon from '@mui/icons-material/Devices';

export function AppNavigation() {
  return (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
              showLabels
          >
              <BottomNavigationAction href="/" label="Books" icon={<MenuBookIcon />} />
              <BottomNavigationAction href="/food" label="Food" icon={<VolunteerActivismIcon />} />
              <BottomNavigationAction href="/room" label="Rooms" icon={<AddHomeIcon />} />
              <BottomNavigationAction href="/equipment" label="Equipment Rental" icon={<DevicesIcon />} />


          </BottomNavigation>
      </Paper>
  );
}
