import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import tableIcons from "../components/AllIcons";
import "./../css/bootstrap.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide, TextField,
} from "@mui/material";
import Select from "react-select";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api/axiosBase";
const qs = require('qs');

const Movies = () => {



  useEffect(() => {
    getMovies();
  }, []);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [data, setData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [movie, setMovie] = useState({
    movies: ' ',
    description: ' ',
    year: 0,
    image: ' '
  })
  const [saveMovieGenre, setSaveMovieGenre] = useState([])
  const [genres, setGenres] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState({})
  const [selectedCharacters, setSelectedCharacters] = useState({})
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieCharacters, setMovieCharacters] = useState([]);
  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "Nombre",
      field: "movie",
    },
    {
      title: "Año",
      field: "year",
    },
  ];
  const getMoviesById = (id) => {
    api.get("/movies/getmovieByID/" + id).then((result) => {
      setMovieData(result.data.getMoviesByID.getMovies[0])
      getMoviesCharacters(id)
      getMoviesGenres(id)
    });
  }
  const getMovies = () => {
    api.get("/movies/getMovies").then((result) => {
      console.log(result.data.movies)
      setData(result.data.movies)
    });
  };

  const getGenre = () => {
    api.get("/genres/getGenres").then((result) => {
      setGenres(result.data.getAllGenre)
    })
  }
  const getCharacters = () => {
    api.get("/characters/getCharacters").then((result) => {
      setCharacters(result.data.getCharacters)
    })
  }
  const getMoviesGenres = (id) => {
    api.get("/modifyMoviesGenres/getMoviesGenresByID/" + id).then((result) => {
      setMovieGenres(result.data.getMovieGenre)

    })
  }
  const getMoviesCharacters = (id) => {
    api.get("/modifyMoviesCharacters/getMoviesCharacterByID/" + id).then((result) => {
      setMovieCharacters(result.data.getMovieCharacter)

    })
  }
  const handleClickOpen = () => {
    getCharacters();
    getGenre();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenEdit = (e, id) => {
    getMoviesById(id);
    getGenre();
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);

  };

  const changeHandlerMovie = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectedGenres = (data) => {

    setSelectedGenres(data)
  }
  const handleSelectedCharacters = (data) => {

    setSelectedCharacters(data)
  }

  const saveMovie = (e) => {

    api.post("/movies/insertMovie", { movie, selectedCharacters, selectedGenres }).then((result) => {
      alert(result.data.msg)
    }).catch((err) => { alert(err) })

  }

  return (
    <div className="App">
      <Button variant="contained" onClick={(e) => handleClickOpen(e)}>
        Agregar una Pelicula
      </Button>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{
          pageSizeOptions: [5, 10, 15, 20, data.length],
          actionsColumnIndex: -1,
          emptyRowsWhenPaging: true,
          // selection:true
        }}
        actions={[
          (rowData) => {
            return {
              icon: () => <VisibilityIcon />,
              tooltip: "Detalles",
              onClick: (event, rowData) => {
                handleClickOpenEdit(event, rowData.id)

              },
            };
          },
        ]}
      />
      {/* add new */}
      <Dialog fullScreen open={open} onClose={handleClose}>
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
              Agregar una pelicula
            </Typography>
            <Button autoFocus color="inherit" onClick={(e) => { saveMovie(e) }}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField
            id="movies"
            name="movies"
            label="Nombre de la pelicula"
            // value={movies}
            onChange={changeHandlerMovie}

          />
          <TextField
            id="description"
            name="description"
            label="Descripcion de la pelicula"
            // value={description}
            onChange={changeHandlerMovie}

          />
          <TextField
            id="year"
            name="year"
            label="Año de la pelicula"
            // value={year}
            onChange={changeHandlerMovie}

          />
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={genres.map((genre) => {
              return { value: genre.id, label: genre.genre }
            })}
            onChange={handleSelectedGenres}

          />
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={characters.map((character) => {
              return { value: character.id, label: character.charac }
            })}
            onChange={handleSelectedCharacters}
          />
        </DialogContent>
      </Dialog>
      {/* edit one */}
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

            <Button autoFocus color="inherit" onClick={handleCloseEdit}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <h1>aqui Genres</h1>
          <Select
            closeMenuOnSelect={false}
            isMulti
            value={movieGenres.map((genres) => {
              return { value: genres?.genres_id, label: genres?.genre }
            })}
            options={genres.map((genre) => {
              return { value: genre.id, label: genre.genre }
            })} />
          <h1>aqui Characters</h1>
          <Select
            closeMenuOnSelect={false}
            isMulti
            value={movieCharacters.map((characters) => {
              return { value: characters?.characters_id, label: characters?.charac }
            })}
          // options={characters.map((character) => {
          //   return { value: character.id, label: character.charac }
          // })}
          />
        </List>
      </Dialog>
    </div>

  );
};

export default Movies;
