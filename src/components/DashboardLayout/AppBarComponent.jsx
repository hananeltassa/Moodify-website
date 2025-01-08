import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar, Tooltip, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../../context/ThemeContext";

const AppBarComponent = ({ handleDrawerToggle }) => {
  const { mode, toggleThemeMode } = useContext(ThemeContext);

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: "240px" },
        backdropFilter: "blur(10px)",
        color: mode === "dark" ? "#FFFFFF" : "#000000",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                transition: "background-color 0.3s ease",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "18px", sm: "20px" },
            }}
          >
            Admin Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}>
            <IconButton
              onClick={toggleThemeMode}
              color="inherit"
              sx={{
                mr: 2,
                "&:hover": {
                  color: mode === "dark" ? "#FF6100" : "#FF8E53",
                  transition: "color 0.3s ease",
                },
              }}
            >
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              sx={{
                mr: 2,
                "&:hover": {
                  color: mode === "dark" ? "#FF6100" : "#FF8E53",
                  transition: "color 0.3s ease",
                },
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton
              color="inherit"
              sx={{
                "&:hover": {
                  boxShadow: "0 0 10px rgba(255,97,0,0.5)",
                  transition: "box-shadow 0.3s ease",
                },
              }}
            >
              <Avatar alt="Profile Picture" src="/profile.jpg" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;