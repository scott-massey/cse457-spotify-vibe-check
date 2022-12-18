import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { SpotifyAuth, Scopes } from "react-spotify-auth"
import "react-spotify-auth/dist/index.css"

// Styles
import { styled } from "@mui/material/styles"

// MUI Components
import CssBaseline from "@mui/material/CssBaseline"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button"

// Layout
import Box from "@mui/material/Box"

// Icons
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import DashboardIcon from "@mui/icons-material/Dashboard"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import GitHubIcon from "@mui/icons-material/GitHub"
import QuestionMark from "@mui/icons-material/QuestionMark"

// Data
import { logout, useGetCurrentUserInfo } from "../data"

const NavigationWrapper = ({ children, openHelpModal, ...props }) => {
  let navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const { data: user } = useGetCurrentUserInfo()

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{ backgroundColor: "#303030" }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Spotify Vibe Check
            </Typography>
            {user ? (
              <Button
                variant="contained"
                onClick={logout}
                sx={{
                  backgroundColor: "#1db954",
                  "&:hover": { backgroundColor: "#17863d" },
                }}
              >
                Logout
              </Button>
            ) : (
              <SpotifyAuth
                redirectUri={`${window.location.href}/spotify-callback`}
                clientID="1a62dbf1e301488eb75e500e21603a0d"
                scopes={[
                  Scopes.playlistReadPrivate,
                  Scopes.userReadPrivate,
                  Scopes.playlistReadCollaborative,
                ]}
              />
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
              height: "100%",
              //   position: "fixed",
              //   zIndex: 1,
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton onClick={() => navigate("/vibe")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/vibe/process-book")}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Process Book" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/vibe/video-demo")}>
              <ListItemIcon>
                <VideoLibraryIcon />
              </ListItemIcon>
              <ListItemText primary="Video Demo" />
            </ListItemButton>
            <ListItemButton
              onClick={() =>
                (window.location.href = "https://github.com/csex57/vibe")
              }
            >
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary="GitHub Repo" />
            </ListItemButton>
            <ListItemButton onClick={openHelpModal}>
              <ListItemIcon>
                <QuestionMark />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={
            {
              // backgroundColor: "red",
              // backgroundColor: (theme) =>
              //   theme.palette.mode === "light"
              //     ? theme.palette.grey[100]
              //     : theme.palette.grey[900],
              // flexGrow: 1,
              // height: "100vh",
              // overflow: "auto",
            }
          }
        >
          {/* {children} */}
        </Box>
      </Box>
    </div>
  )
}

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

export { NavigationWrapper }
