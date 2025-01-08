import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Tooltip, Typography } from "@mui/material";

const UsersTable = () => {
  const [rows, setRows] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@gmail.com", gender: "Female", isBanned: false },
    { id: 2, name: "Bob Smith", email: "bob@gmail.com", gender: "Male", isBanned: true },
    { id: 3, name: "Charlie Brown", email: "charlie@gmail.com", gender: "Other", isBanned: false },
    { id: 4, name: "Diana Prince", email: "diana@gmail.com", gender: "Female", isBanned: false },
    { id: 5, name: "Eve Adams", email: "eve@gmail.com", gender: "Female", isBanned: true },
  ]);

  // Handle ban/unban toggle
  const toggleBan = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, isBanned: !row.isBanned } : row
      )
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "gender", headerName: "Gender", width: 130 },
    {
      field: "isBanned",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Typography
          sx={{ color: params.value ? "red" : "green", fontWeight: "bold" }}
        >
          {params.value ? "Banned" : "Active"}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.row.isBanned ? "Unban User" : "Ban User"}>
          <Button
            variant="contained"
            color={params.row.isBanned ? "success" : "error"}
            onClick={() => toggleBan(params.row.id)}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {params.row.isBanned ? "Unban" : "Ban"}
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 1,
        overflow: "hidden",
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell:hover": {
          backgroundColor: "rgba(245, 245, 245, 0.8)",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#f5f5f5",
          fontWeight: "bold",
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        checkboxSelection
      />
    </Box>
  );
};

export default UsersTable;
