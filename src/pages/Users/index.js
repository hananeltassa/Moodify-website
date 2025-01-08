import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import UsersTable from "../../components/UsersTable";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { getAllUsers, } from "../../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Unauthorized. Please log in.");
          return;
        }
        const fetchedUsers = await getAllUsers(token);
        setUsers(fetchedUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle role change
  const handleRoleChange = async (id, newRole) => {
    console.log("test");
  };

  // Handle ban/unban toggle
  const handleBanToggle = async (id) => {
    console.log("test");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 3 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Users
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Manage all registered users below.
        </Typography>
        <UsersTable rows={users} onRoleChange={handleRoleChange} onBanToggle={handleBanToggle} />
      </Box>
    </DashboardLayout>
  );
};

export default Users;
