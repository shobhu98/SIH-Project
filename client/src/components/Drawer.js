import React, { useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";

import { createMuiTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";

import ListAltIcon from "@material-ui/icons/ListAlt";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { purple } from "@material-ui/core/colors";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paddingClass: {
    padding: theme.spacing(0, 1),
  },
  title: {
    flexGrow: 1,
  },
  
}));

export default function MiniDrawer(props) {
  const [darkMode, setDarkMode] = useState(true);
  const classes = useStyles();
  //const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { children } = props;

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#673ab7",
      },
      secondary: {
        main: "#ff4081",
        light: "#8748ae",
        dark: "#8748ae",
      },
    },
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              SHO Portal
            </Typography>

            <Button
              onClick={() => setDarkMode(!darkMode)}
              startIcon={<SettingsBrightnessIcon />}
              size="large"
              style={{ color: purple[50] }}
            >
              
            </Button>
            <Button
              startIcon={<ExitToAppIcon />}
              size="large"
              style={{ color: purple[50] }}
              onClick={() => {
                localStorage.clear()
                window.location.reload(false);
              }}
              
            >
             
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {[
              "Pending FIR",
              "Ongoing Investigations",
              "Closed Investigations",
            ].map((text, index) => (
              <ListItem button key={text} component={Link} to={"/" + text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <ListAltIcon />
                  ) : index === 1 ? (
                    <AutorenewIcon />
                  ) : (
                    <PlaylistAddCheckIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>{children}</div>
        </main>
      </MuiThemeProvider>
    </div>
  );
}
