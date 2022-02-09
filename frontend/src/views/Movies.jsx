import * as React from "react";
import { useState, useEffect } from "react";
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
import { Button, Dialog,TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import api from "../api/axiosBase";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "./../css/bootstrap.css";
import { DeleteForever } from "@material-ui/icons";
import { useNavigate } from 'react-router-dom';


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
    movie: " ",
    description: " ",
    year: 0,
    image: " ",
  });
  const [genres, setGenres] = useState([]);
  const [characters, setCharacters] = useState([]);
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState({});
  const [selectedCharacters, setSelectedCharacters] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  const [movieData, setMovieData] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [data, setData] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieCharacters, setMovieCharacters] = useState([]);
  const navigate = useNavigate();
  const changeHandlerMovie = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const saveMovieModify = (e, movie) => {
    api
      .put("/movies/updateMovie", { movie: movie })
      .then((result) => {
        alert(result.data.msg);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleClickDelete = (event, id) => {
    api
      .delete("/movies/deleteMovie", { data: { movie_id: id } })
      .then((result) => {
        alert(result.data.msg);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const changeHandlerMovieData = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Name",
      field: "movie",
    },
    {
      title: "Year",
      field: "year",
    },
  ];
  const handleClickOpen = () => {
    getGenre();
    getCharacters();
    //comented frond
    // getCharacters();
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };


  useEffect(() => {
    if (localStorage['login'] !== "true") {
      navigate("/")
    }
    getMovies();
  }, []);

  const getMoviesGenres = (id) => {
    api.get("/modifyMoviesGenres/getMoviesGenresByID/" + id).then((result) => {
      setMovieGenres(result.data.getMovieGenre);
    });
  };
  const getMoviesCharacters = (id) => {
    api
      .get("/modifyMoviesCharacters/getMoviesCharacterByID/" + id)
      .then((result) => {
        setMovieCharacters(result.data.getMovieCharacter);
      });
  };
  const getMovies = () => {
    api.get("/movies/getMovies").then((result) => {
      console.log(result.data.movies);
      setData(result.data.movies);
    });
  };
  const getMoviesById = (id) => {
    api.get("/movies/getmovieByID/" + id).then((result) => {
      setMovieData(result.data.getMoviesByID.getMovies[0]);
      getMoviesCharacters(id);
      getMoviesGenres(id);
    });
  };
  const saveMovie = (e) => {
    api
      .post("/movies/insertMovie", {
        movie,
        selectedCharacters,
        selectedGenres,
      })
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
      .catch((err) => { });
  };
  const getCharacters = () => {
    api.get("/characters/getCharacters").then((result) => {
      setCharacters(result.data.getCharacters);
    });
  };

  const handleSelectedGenres = (data) => {
    setSelectedGenres(data);
  };
  const handleSelectedCharacters = (data) => {
    setSelectedCharacters(data);
  };
  //edit
  const handleClickOpenEdit = (e, id) => {
    getMoviesById(id);
    getGenre();
    setOpenEdit(true);
  };

  const handleEditGenres = (e, dataTarget, movieData) => {
    console.log("e", e);
    console.log("dataTarget", dataTarget);
    console.log("movieData", movieData);
  };
  const handleEditCharacters = (e, dataTarget, movieData) => {
    console.log("e", e);
    console.log("dataTarget", dataTarget);
    console.log("movieData", movieData);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
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
          title=""
          icons={allIcons}
          columns={columns}
          data={data}
          options={{
            pageSizeOptions: [5, 10, 15, 20, data.length],
            actionsColumnIndex: -1,
            emptyRowsWhenPaging: true,
            // selection:true
          }}
          // actions={[
          //   {
          //     icon: () => <VisibilityIcon style={{ color: "#707070" }} />,
          //     tooltip: t("detalles_tooltip"),
          //     onClick: (event, rowData) =>
          //       selectComunication(rowData, "ViewComunication"),
          //   },
          //   {
          //     icon: () => <DeleteIcon style={{ color: "#707070" }} />,
          //     tooltip: t("deleteFromSystem"),
          //     onClick: (event, rowData) => deleteComunication(rowData),
          //   },
          // ]}
          actions={[
            {
              icon: () => <VisibilityIcon />,
              tooltip: "Detalles/Editar",
              onClick: (event, rowData) =>
                handleClickOpenEdit(event, rowData.id),
            },
            {
              icon: () => <DeleteForever />,
              tooltip: "Eliminar",
              onClick: (event, rowData) => handleClickDelete(event, rowData.id),
            },
          ]}
        />
        {/*add movie*/}
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
          <TextField
            id="movies"
            label="Movie"
            name="movie"
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
          <div className="mb-2 ml-3 mr-3 p-2">
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={genres?.map((genre) => {
                return { value: genre.id, label: genre.genre };
              })}
              onChange={handleSelectedGenres}
            />
          </div>
          <div className="mb-2 ml-3 mr-3 p-2">
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={characters?.map((character) => {
                return { value: character.id, label: character.charac };
              })}
              onChange={handleSelectedCharacters}
            />
          </div>
        </Dialog>

        {/* edit movie */}
        <Dialog fullScreen open={openEdit} onClose={handleCloseEdit}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseEdit}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {movieData.movie}
              </Typography>

              <Button
                autoFocus
                color="inherit"
                onClick={(e) => saveMovieModify(e, movieData)}
              >
                Guardar
              </Button>
            </Toolbar>
          </AppBar>
          <TextField
            id="editmovies"
            label="Movie"
            name="movie"
            variant="outlined"
            size="medium"
            className="m-3 p-2"
            value={movieData.movie}
            onChange={changeHandlerMovieData}
          />
          <TextField
            id="edityear"
            label="Year"
            name="year"
            variant="outlined"
            className="m-3 p-2"
            value={movieData.year}
            onChange={changeHandlerMovieData}
          />
          <TextField
            id="editdescription"
            label="Description"
            name="description"
            multiline
            rows={4}
            className="m-3 p-2"
            value={movieData.description}
            onChange={changeHandlerMovieData}
          />

          <h1>aqui Genres</h1>
          <Select
            closeMenuOnSelect={false}
            isMulti
            value={movieGenres.map((genres) => {
              return { value: genres?.genres_id, label: genres?.genre };
            })}
            options={genres.map((genre) => {
              return { value: genre.id, label: genre.genre };
            })}
            onChange={(e, dataTarget) =>
              handleEditGenres(e, dataTarget, movieData)
            }
          />
          <h1>aqui Characters</h1>
          <Select
            closeMenuOnSelect={false}
            isMulti
            value={movieCharacters.map((characters) => {
              return {
                value: characters?.characters_id,
                label: characters?.charac,
              };
            })}
            options={characters.map((character) => {
              return { value: character.id, label: character.charac };
            })}
            onChange={(e, dataTarget) =>
              handleEditCharacters(e, dataTarget, movieData)
            }
          />
        </Dialog>
      </Main>
    </Box>
  );
}
