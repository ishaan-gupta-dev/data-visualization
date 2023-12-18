import React, { Component, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
// import readXlsxFile from "read-excel-file";
import googleplaystoreData from "../../data/googleplaystore";

const AllData = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "App",
      headerName: "App Name",
      flex: 4,
      cellClassName: "name-column--cell",
    },
    {
      field: "Category",
      headerName: "Category",
      flex: 2,
    },
    {
      field: "Rating",
      headerName: "Rating",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "Size",
      headerName: "Size",
      flex: 1,
    },
    {
      field: "Installs",
      headerName: "Installs",
      // flex: 1,
    },
    {
      field: "Type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "Price",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "Content Rating",
      headerName: "Content Rating",
      flex: 1,
    },
    {
      field: "Genres",
      headerName: "Genres",
      flex: 1,
    },
    {
      field: "Last Updated",
      headerName: "Last Updated",
      flex: 1,
    },
    {
      field: "Current Ver",
      headerName: "Current Ver",
      flex: 1,
    },
    {
      field: "Android Ver",
      headerName: "Android Ver",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={googleplaystoreData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.App}
        />
      </Box>
    </Box>
  );
};

export default AllData;
