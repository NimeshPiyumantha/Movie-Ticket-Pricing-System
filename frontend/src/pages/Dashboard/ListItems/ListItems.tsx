import * as React from 'react';
import { NavLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieIcon from '@mui/icons-material/Movie';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <>
    <ListItemButton component={NavLink} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/movies" >
      <ListItemIcon>
        <MovieIcon />
      </ListItemIcon>
      <ListItemText primary="Movies" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/employee">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employee" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
       Reports
    </ListSubheader>
    <ListItemButton component={NavLink} to="/current-month">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current Month" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/last-month">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last Month" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/year-end-sale">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year End Sale" />
    </ListItemButton>
  </>
);
