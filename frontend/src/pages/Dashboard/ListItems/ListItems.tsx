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
  CURRENT_MONTH,
  DASHBOARD,
  EMPLOYEE,
  LAST_MONTH,
  MOVIES,
  PREDICT_TICKET,
  YEAR_END_SALE,
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

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Reports
    </ListSubheader>
    <ListItemButton component={NavLink} to={CURRENT_MONTH}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current Month" />
    </ListItemButton>
    <ListItemButton component={NavLink} to={LAST_MONTH}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last Month" />
    </ListItemButton>
    <ListItemButton component={NavLink} to={YEAR_END_SALE}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year End Sale" />
    </ListItemButton>
  </>
);
