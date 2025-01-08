import React from "react";
import { Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText, Box, Button, } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoBlack from "../../assets/Logo-black.png";
import LogoWhite from "../../assets/Logo-white.png";

const SidebarComponent = ({ mobileOpen, handleDrawerToggle, drawerWidth, mode }) => {
  const location = useLocation();

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: mode === "dark" ? "#121212" : "#00000",
        color: mode === "dark" ? "#FFFFFF" : "#000000",
      }}
    >
      {/* Top Section: Branding and Navigation */}
      <Box>
        {/* Toolbar for branding */}
        <Toolbar
          sx={{
            justifyContent: "center", 
            paddingY: 2,
          }}
        >
          <img
            src={mode === "dark" ? LogoWhite : LogoBlack}
            alt="Admin Logo"
            style={{
              objectFit: "contain",
            }}
          />
        </Toolbar>

        {/* Navigation list */}
        <List sx={{ mt: 2 }}>
          {[
            { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
            { text: "Users", icon: <PersonIcon />, link: "/users" },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.link}
              sx={{
                backgroundColor:
                  location.pathname === item.link ? "rgba(255, 97, 0, 0.2)" : "inherit",
                borderRadius: 2,
                paddingX: 2,
                paddingY: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 96, 0, 0.1)",
                },
                transition: "background-color 0.3s ease",
                width: "100%",
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
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.link ? "bold" : "normal",
                  color: location.pathname === item.link ? "primary.main" : "inherit",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Bottom Section: Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LogoutIcon />}
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 3,
            paddingY: 1,
          }}
          onClick={() => alert("Logged out!")}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Temporary drawer for mobile view */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* Permanent drawer for desktop view */}
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