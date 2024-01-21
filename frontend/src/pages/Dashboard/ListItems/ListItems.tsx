import * as React from "react";
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import PeopleIcon from "@mui/icons-material/People";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  DASHBOARD,
  EMPLOYEE,
  MOVIES,
  PREDICT_TICKET,
} from "../../../util/routesUtil";

export const mainListItems = (
  <>
    <ListItemButton component={NavLink} to={DASHBOARD}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={NavLink} to={MOVIES}>
      <ListItemIcon>
        <MovieIcon />
      </ListItemIcon>
      <ListItemText primary="Movies" />
    </ListItemButton>
    <ListItemButton component={NavLink} to={EMPLOYEE}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employee" />
    </ListItemButton>
    <ListItemButton component={NavLink} to={PREDICT_TICKET}>
      <ListItemIcon>
        <LocalActivityIcon/>
      </ListItemIcon>
      <ListItemText primary="Predict Ticket" />
    </ListItemButton>
  </>
);
