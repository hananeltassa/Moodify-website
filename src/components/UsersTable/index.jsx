import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Tooltip, Typography, MenuItem, Select, TextField, InputAdornment, IconButton, Paper, useTheme,} from "@mui/material";
import BanIcon from "@mui/icons-material/Block";
import UnbanIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const UsersTable = ({ rows, onBanToggle, onRoleChange }) => {
  const theme = useTheme();
  const [searchText, setSearchText] = React.useState("");

  const handleSearchClear = () => {
    setSearchText("");
  };

  const normalizeRole = (role) => role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    { field: "name", headerName: "Name", width: 140 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "gender", headerName: "Gender", width: 80 },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Select
            value={normalizeRole(params.row.role)}
            onChange={(e) => onRoleChange(params.row.id, e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              fontSize: "14px",
              height: "100%",
              marginTop: 1,
              backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#f0f0f0",
              borderRadius: "8px",
              color: theme.palette.text.primary,
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
        </Box>
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
            textAlign:'center',
            justifyContent: 'center',
            display: 'flex', 
            marginTop:2,
          }}
        >
          {params.row.is_banned ? "Banned" : "Active"}
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
            onClick={() => onBanToggle(params.row.id)} // Call the parent handler
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
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
          checkboxSelection
        />
      </Box>
    </Paper>
  );
};

export default UsersTable;