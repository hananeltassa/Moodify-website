import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Tooltip, Typography, MenuItem, Select, TextField, IconButton, Paper, useTheme } from "@mui/material";
import BanIcon from "@mui/icons-material/Block";
import UnbanIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";

const UsersTable = ({ rows, onBanToggle, onRoleChange, onDeleteUser }) => {
  const theme = useTheme();
  const [searchText, setSearchText] = React.useState("");

  const handleSearchClear = () => {
    setSearchText("");
  };

  const normalizeRole = (role) =>
    role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "gender", headerName: "Gender", width: 100 },
    {
      field: "spotifyUser",
      headerName: "Spotify",
      width: 100,
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            color: params.row.spotify_id ? theme.palette.success.main : "gray",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {params.row.spotify_id ? "Yes" : "No"}
        </Typography>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params) => (
        <Select
          value={normalizeRole(params.row.role)}
          onChange={(e) => onRoleChange(params.row.id, e.target.value)}
          fullWidth
          variant="outlined"
          disabled={params.row.email === "admin@moodify.com"}
          sx={{
            fontSize: "14px",
            backgroundColor:
              theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100],
            borderRadius: "8px",
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              padding: "8px",
            },
          }}
        >
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </Select>
      ),
    },
    {
      field: "isBanned",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.is_banned ? theme.palette.error.main : theme.palette.success.main,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {params.row.is_banned ? "Banned" : "Active"}
        </Typography>
      ),
    },
    {
      field: "banAction",
      headerName: "Ban/Unban",
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.row.is_banned ? "Unban User" : "Ban User"}>
          <Button
            variant="contained"
            color={params.row.is_banned ? "success" : "error"}
            onClick={() => onBanToggle(params.row.id)}
            disabled={params.row.email === "admin@moodify.com"}
            startIcon={params.row.is_banned ? <UnbanIcon /> : <BanIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 2,
              padding: "6px 12px",
            }}
          >
            {params.row.is_banned ? "Unban" : "Ban"}
          </Button>
        </Tooltip>
      ),
    },
    {
      field: "deleteAction",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Delete User">
          <Button
            variant="contained"
            color="error"
            onClick={() => onDeleteUser(params.row.id)}
            disabled={params.row.email === "admin@moodify.com"}
            startIcon={<DeleteIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 2,
              padding: "6px 12px",
            }}
          >
            Delete
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        height: 600,
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[3],
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f8f9fa",
        }}
      >
        <Box sx={{ position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
          <SearchIcon sx={{ position: "absolute", left: 10, color: theme.palette.text.secondary }} />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              pl: 4,
              width: 300,
              backgroundColor: theme.palette.background.default,
              borderRadius: 1,
            }}
          />
          {searchText && (
            <IconButton
              onClick={handleSearchClear}
              sx={{
                position: "absolute",
                right: 10,
                color: theme.palette.text.secondary,
              }}
            >
              <ClearIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
          checkboxSelection
          sx={{
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-columnHeader": {
              fontWeight: "bold",
              backgroundColor: theme.palette.grey[200],
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default UsersTable;