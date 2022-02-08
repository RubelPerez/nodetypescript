import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import allIcons from "./../components/AllIcons";
import ListDashboard from "./../components/ListDashboard";
import MaterialTable from "material-table";
import { Button, Dialog, TextareaAutosize, TextField } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Select from "react-select";
import api from "../api/axiosBase";
import "./../css/bootstrap.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Movies() {
  //data var
  const [movie, setMovie] = useState({
    movies: " ",
    description: " ",
    year: 0,
    image: " ",
  });
  const [genres, setGenres] = useState([]);
  const [characters, setCharacters] = useState([]);
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const changeHandlerMovie = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    getGenre();
    //comented frond
    // getCharacters();
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  //api's calls
  // React.useEffect(() => {});
  const saveMovie = (e) => {
    api
      .post("/movies/insertMovie", movie)
      .then((result) => {
        alert(result.data.msg);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getGenre = () => {
    api
      .get("/genres/getGenres")
      .then((result) => {
        setGenres(result.data.getAllGenre);
      })
      .catch((err) => {});
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar style={{ background: "#5E8AC4" }} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Movies
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListDashboard />
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        <Button variant="outlined" onClick={handleClickOpen}>
          Add movie
        </Button>
        <MaterialTable
          icons={allIcons}
          options={{
            pageSizeOptions: [5, 10, 15, 20],
            actionsColumnIndex: -1,
            emptyRowsWhenPaging: true,
            // selection:true
          }}
        />

        {/*diaglo*/}
        <Dialog
          fullScreen
          open={openDialog}
          onClose={handleClose}
          //TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Add Movie
              </Typography>
              <Button autoFocus color="inherit" onClick={(e) => saveMovie(e)}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          /* aqui el contenido */
          <TextField
            id="movies"
            label="Movie"
            name="movies"
            variant="outlined"
            size="medium"
            className="m-3 p-2"
            onChange={changeHandlerMovie}
          />
          <TextField
            id="year"
            label="Year"
            name="year"
            variant="outlined"
            className="m-3 p-2"
            onChange={changeHandlerMovie}
          />
          <TextField
            id="description"
            label="Description"
            name="description"
            multiline
            rows={4}
            className="m-3 p-2"
            onChange={changeHandlerMovie}
          />
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={genres?.map((genre) => {
              return { value: genre.id, label: genre.genre };
            })}
            // onChange={handleSelectedGenres}
          />
          {/* <Select
            closeMenuOnSelect={false}
            isMulti
            options={characters?.map((character) => {
              return { value: character.id, label: character.charac };
            })}
            // onChange={handleSelectedCharacters}
          /> */}
        </Dialog>
      </Main>
    </Box>
  );
}
