import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CopyrightIcon from '@mui/icons-material/Copyright';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import CategoryIcon from '@mui/icons-material/Category';
import "./../css/bootstrap.css";
const ListDashboard = () => {
  return (
    <div  className="navlinks_ListDashboard">
      <NavLink style={{ color: "black" }}  to="/movies">
        <ListItem className="mb-2" button>
          <ListItemIcon>
            <LocalMoviesIcon />
          </ListItemIcon>
          <ListItemText primary="Movies" />
        </ListItem>
      </NavLink>
      <NavLink style={{ color: "black" }} to="/genres">
        <ListItem className="mb-2" button>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Genres" />
        </ListItem>
      </NavLink>
      <NavLink style={{ color: "black" }} to="/casting">
        <ListItem className="mb-2" button>
          <ListItemIcon>
            <TheaterComedyIcon />
          </ListItemIcon>
          <ListItemText primary="Casting" />
        </ListItem>
      </NavLink>
      <NavLink style={{ color: "black" }} to="/credits">
        <ListItem className="mb-2" button>
          <ListItemIcon>
            <CopyrightIcon />
          </ListItemIcon>
          <ListItemText primary="Credits" />
        </ListItem>
      </NavLink>
    </div>
  );
};

export default ListDashboard;
