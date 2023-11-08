import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import PetsIcon from "@mui/icons-material/Pets";
import StoreIcon from "@mui/icons-material/Store";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SetMealIcon from "@mui/icons-material/SetMeal";
import { useNavigate } from "react-router-dom";
export const MainListItems = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          navigate("/staff/dashboard");
        }}
      >
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="Animal" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/staff/habitat");
        }}
      >
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Habitat" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SetMealIcon />
        </ListItemIcon>
        <ListItemText primary="Source" />
      </ListItemButton>
    </React.Fragment>
  );
};

export const SecondaryListItems = () => {
  return <React.Fragment></React.Fragment>;
};
