import React, { useContext } from "react";
import { Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoBlack from "../../assets/Logo-black.png";
import LogoWhite from "../../assets/Logo-white.png";
import { ThemeContext } from "../../context/ThemeContext";

const SidebarComponent = ({ mobileOpen, handleDrawerToggle, drawerWidth }) => {
  const { mode } = useContext(ThemeContext);
  const location = useLocation();

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: mode === "dark" ? "#121212" : "#FFFFFF",
        color: mode === "dark" ? "#FFFFFF" : "#000000",
      }}
    >
      <Box>
        <Toolbar
          sx={{
            justifyContent: "center",
            paddingY: 2,
          }}
        >
          <img
            src={mode === "dark" ? LogoWhite : LogoBlack}
            alt="Admin Logo"
            style={{ objectFit: "contain" }}
          />
        </Toolbar>
        <List sx={{ mt: 2 }}>
          {[
            { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
            { text: "Users", icon: <PersonIcon />, link: "/users" },
            { text: "Settings", icon: <SettingsIcon />, link: "/settings" },

          ].map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.link}
              sx={{
                backgroundColor: location.pathname === item.link ? "rgba(255, 97, 0, 0.2)" : "inherit",
                borderRadius: 2,
                paddingX: 2,
                paddingY: 1,
                "&:hover": { backgroundColor: "rgba(255, 96, 0, 0.1)" },
                transition: "background-color 0.3s ease",
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.link ? "primary.main" : "inherit",
                  minWidth: "40px",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  fontWeight: location.pathname === item.link ? "bold" : "normal",
                  color: location.pathname === item.link ? "primary.main" : "inherit",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SidebarComponent;