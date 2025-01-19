import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4">Home Page Content</Typography>
        <Typography variant="body1">
          Welcome to the admin panel's home page! You can add charts, statistics, or other content here.
        </Typography>
      </Box>
    </DashboardLayout>
  );
};

export default Home;
