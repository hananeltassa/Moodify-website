import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const AppBarComponent = ({ handleDrawerToggle, toggleThemeMode, mode }) => {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: "240px" },
      }}
    >
      <Toolbar>
        {/* Hamburger menu button for mobile sidebar */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {/* App title */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Hi, Welcome back! 👋
        </Typography>
        {/* Theme toggle switch */}
        <IconButton onClick={toggleThemeMode} color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {/* Notifications and profile avatar */}
        <NotificationsIcon sx={{ mr: 2 }} />
        <Avatar alt="Profile Picture" src="/profile.jpg" />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
