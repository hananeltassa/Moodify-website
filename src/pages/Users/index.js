import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardLayout from "../../components/DashboardLayout";
import UsersTable from "../../components/UsersTable";
import { Box, Typography, CircularProgress, Alert, Snackbar } from "@mui/material";
import { setUsers, setLoading, setError, updateRole, toggleBan, setSuccessMessage, clearMessages,} from "../../redux/slices/usersSlice";
import { getAllUsers, updateUserRole, toggleUserBan } from "../../services/userService";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error, successMessage } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setLoading(true));
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Unauthorized. Please log in.");
        const fetchedUsers = await getAllUsers(token);
        //console.log(fetchedUsers);
        dispatch(setUsers(fetchedUsers));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleRoleChange = async (id, newRole) => {
    const token = localStorage.getItem("authToken");
    const user = users.find((user) => user.id === id);

    if (user.email === "admin@moodify.com") {
      alert("This user's role cannot be modified.");
      return;
    }

    try {
      if (!token) throw new Error("Unauthorized. Please log in.");
      await updateUserRole(token, id, newRole);
      dispatch(updateRole({ id, newRole }));
      dispatch(setSuccessMessage("User role updated successfully."));
    } catch (err) {
      dispatch(setError(err.message || "Failed to update role."));
    }
  };

  const handleBanToggle = async (id) => {
    const token = localStorage.getItem("authToken");

    try {
      if (!token) throw new Error("Unauthorized. Please log in.");
      const { user } = await toggleUserBan(token, id);
      dispatch(toggleBan({ id, isBanned: user.is_banned }));
      dispatch(
        setSuccessMessage(
          `User has been ${user.is_banned ? "banned" : "unbanned"} successfully.`
        )
      );
    } catch (err) {
      dispatch(setError(err.message || "Failed to toggle ban status."));
    }
  };

  const handleSnackbarClose = () => {
    dispatch(clearMessages());
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
        <Snackbar
          open={!!successMessage}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message={successMessage}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </Box>
    </DashboardLayout>
  );
};

export default Users;