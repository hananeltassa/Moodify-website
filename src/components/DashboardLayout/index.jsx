import React, { useContext, useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import AppBarComponent from "./AppBarComponent";
import SidebarComponent from "./SidebarComponent";
import { ThemeContext } from "../../context/ThemeContext";

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleThemeMode } = useContext(ThemeContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* AppBar Component */}
      <AppBarComponent
        handleDrawerToggle={handleDrawerToggle}
        toggleThemeMode={toggleThemeMode}
        mode={mode}
      />
      {/* Sidebar Component */}
      <SidebarComponent
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        mode={mode}
      />
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
