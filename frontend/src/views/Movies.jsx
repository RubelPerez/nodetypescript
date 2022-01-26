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
  Slide,
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

const Peliculas = () => {



  useEffect(() => {
    getMovies();
  }, []);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [movieData, setMovieData] = useState({});
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
    });
  }
  const getMovies = () => {
    api.get("/movies/getMovies").then((result) => {
      console.log(result.data.movies)
      setData(result.data.movies)
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenEdit = (e, id) => {
    getMoviesById(id)
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);

  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
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
          // rowStyle: (rowData) => ({
          //   backgroundColor: rowData.status ==='Pendiente'? "rgba(173, 20, 20, 0.6)" : "blue"
          // }),
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
                // getMoviesById(rowData.id);
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
              Pelicula
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />

          <Select closeMenuOnSelect={false} isMulti options={options} />
        </List>
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

          <Select closeMenuOnSelect={false} isMulti options={options} />
        </List>
      </Dialog>
    </div>

  );
};

export default Peliculas;
