import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import UsersTable from "../../components/UsersTable";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { getAllUsers, updateUserRole } from "../../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleRoleChange = async (id, newRole) => {
    const user = users.find((user) => user.id === id);
    if (user.email === "admin@moodify.com") {
      alert("This user's role cannot be modified.");
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Unauthorized. Please log in.");
        return;
      }
      await updateUserRole(token, id, newRole);
  
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );
      setSuccessMessage("User role updated successfully.");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error updating role:", err);
      setError(err.message);
    }
  };

  const handleBanToggle = (id) => {
    const user = users.find((user) => user.id === id);
    if (user.email === "admin@moodify.com") {
      alert("This user cannot be banned.");
      return;
    }
  
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isBanned: !user.isBanned } : user
      )
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        <UsersTable
          rows={users}
          onRoleChange={handleRoleChange}
          onBanToggle={handleBanToggle}
        />
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </DashboardLayout>
  );
};

export default Users;
