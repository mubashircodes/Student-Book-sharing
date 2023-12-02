import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Paper from '@mui/material/Paper';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AddHomeIcon from '@mui/icons-material/AddHome';
import DevicesIcon from '@mui/icons-material/Devices';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

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
              { <BottomNavigationAction href="/equipment" label="Tution Listings" icon={<SchoolIcon />} /> }
              { <BottomNavigationAction href="/equipment" label="Volunteer Opportunities" icon={<GroupIcon />} /> }
              { <BottomNavigationAction href="/equipment" label="Lost & Found" icon={<AutoModeIcon />} /> }
              { <BottomNavigationAction href="/equipment" label="Ride Sharing" icon={<TwoWheelerIcon />} />}
          </BottomNavigation>
      </Paper>
  );
}
