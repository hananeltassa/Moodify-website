import React, { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import AppBarComponent from "./AppBarComponent";
import SidebarComponent from "./SidebarComponent";
import ThemeProviderComponent from "./ThemeProviderComponent";

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mode, setMode] = useState("light");


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProviderComponent mode={mode}>
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
    </ThemeProviderComponent>
  );
};

export default DashboardLayout;
