import * as React from "react";
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
import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import api from "../api/axiosBase";
import { DeleteForever } from "@material-ui/icons";
import VisibilityIcon from "@material-ui/icons/Visibility";

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

const Casting = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [data, setData] = useState([]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getCasting();
  }, []);

  const getCasting = () => {
    api
      .get("/characters/getCharacters")
      .then((result) => {
        if (result.data?.msg !== "error") {
          setData(result.data.getCharacters);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const columns = [{ title: "casting", field: "charac" }];
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
            Casting
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

        <MaterialTable
          icons={allIcons}
          data={data}
          columns={columns}
          options={{
            pageSizeOptions: [5, 10, 15, 20],
            actionsColumnIndex: -1,
            emptyRowsWhenPaging: true,
            // selection:true
          }}
          actions={[
            {
              icon: () => <VisibilityIcon />,
              tooltip: "Detalles/Editar",
              onClick: (e, rowData) => {
                console.log(e, rowData);
              },
            },
            {
              icon: () => <DeleteForever />,
              tooltip: "Eliminar",
              onClick: (e, rowData) => {
                console.log(e, rowData);
              },
            },
          ]}
        />
      </Main>
    </Box>
  );
};

export default Casting;
