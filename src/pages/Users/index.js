import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4">Users</Typography>
        <Typography variant="body1">This is the Users page.</Typography>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
