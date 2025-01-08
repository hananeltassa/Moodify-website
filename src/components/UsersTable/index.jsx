import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Tooltip,
  Typography,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import BanIcon from "@mui/icons-material/Block";
import UnbanIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const UsersTable = () => {
  const theme = useTheme(); // Get the current theme
  const [rows, setRows] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@gmail.com", gender: "Female", role: "User", isBanned: false },
    { id: 2, name: "Bob Smith", email: "bob@gmail.com", gender: "Male", role: "Admin", isBanned: true },
    { id: 3, name: "Charlie Brown", email: "charlie@gmail.com", gender: "Other", role: "User", isBanned: false },
    { id: 4, name: "Diana Prince", email: "diana@gmail.com", gender: "Female", role: "Moderator", isBanned: false },
    { id: 5, name: "Eve Adams", email: "eve@gmail.com", gender: "Female", role: "User", isBanned: true },
  ]);

  const [searchText, setSearchText] = useState("");

  const toggleBan = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, isBanned: !row.isBanned } : row
      )
    );
  };

  const handleRoleChange = (id, newRole) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, role: newRole } : row
      )
    );
  };

  const handleSearchClear = () => {
    setSearchText("");
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "gender", headerName: "Gender", width: 130 },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params) => (
        <Select
          value={params.row.role}
          onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
          sx={{
            fontSize: "14px",
            height: "40px",
            backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#f0f0f0",
            borderRadius: "8px",
            color: theme.palette.text.primary,
          }}
        >
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Moderator">Moderator</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </Select>
      ),
    },
    {
      field: "isBanned",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.value ? theme.palette.error.main : theme.palette.success.main,
            fontWeight: "bold",
          }}
        >
          {params.value ? "Banned" : "Active"}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <Tooltip title={params.row.isBanned ? "Unban User" : "Ban User"}>
          <Button
            variant="outlined"
            color={params.row.isBanned ? "success" : "error"}
            onClick={() => toggleBan(params.row.id)}
            startIcon={params.row.isBanned ? <UnbanIcon /> : <BanIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 2,
              padding: "6px 12px",
            }}
          >
            {params.row.isBanned ? "Unban" : "Ban"}
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
      {/* Header Section */}
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
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: 300,
            backgroundColor: theme.palette.background.default,
            borderRadius: 1,
            boxShadow: 1,
          }}
        />
      </Box>

      {/* DataGrid Section */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
          checkboxSelection
          sx={{
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#f9f9f9",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.default,
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: 14,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.default,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default UsersTable;