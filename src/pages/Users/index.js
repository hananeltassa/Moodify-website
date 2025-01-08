import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import UsersTable from "../../components/UsersTable";
import { Box, Typography } from "@mui/material";

const Users = () => {
  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Page Title */}
        <Typography variant="h4" sx={{ mb: 2 }}>
          Users
        </Typography>

        {/* Description */}
        <Typography variant="body1" sx={{ mb: 3 }}>
          Manage all registered users below.
        </Typography>

        {/* Users Table */}
        <UsersTable />
      </Box>
    </DashboardLayout>
  );
};

export default Users;
