import React from "react";
import { Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoBlack from "../../assets/Logo-black.png";
import LogoWhite from "../../assets/Logo-white.png";

const SidebarComponent = ({ mobileOpen, handleDrawerToggle, drawerWidth, mode }) => {
  const location = useLocation();

  const drawer = (
    <div>
      {/* Toolbar for branding */}
      <Toolbar>
        <img
          src={mode === "dark" ? LogoWhite : LogoBlack}
          alt="Admin Logo"
          className="mt-2 mb-4"
        />
      </Toolbar>

      {/* Navigation list */}
      <List>
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
              backgroundColor: location.pathname === item.link ? "rgba(0, 0, 0, 0.1)" : "inherit",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
            }}
          >
            <ListItemIcon
              sx={{ color: location.pathname === item.link ? "primary.main" : "inherit" }}
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
    </div>
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
