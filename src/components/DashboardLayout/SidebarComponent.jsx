import React from "react";
import { Drawer, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Box,} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import Logo from "../../assets/Logo-black.png";
import LogoBlack from "../../assets/Logo-black.png";
import LogoWhite from "../../assets/Logo-white.png";

const SidebarComponent = ({ mobileOpen, handleDrawerToggle, drawerWidth, mode }) => {
  const drawer = (
    <div>
      {/* Toolbar for branding */}
      <Toolbar>
      {/* Logo */}
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
        ].map((item, index) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
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
