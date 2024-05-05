import { React, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useOutletContext } from "react-router-dom";
import GetCustomers from "../firebase/GetCustomers";
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";


export default function Customers() {
  const [rows, setRows] = useState([]);
  const [refetch] = useOutletContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetCustomers();
        setRows(data);
      } catch (error) {
        console.log("Error getting users data: ", error);
      }
    }
    fetchData();
  }, [refetch]);

  const columns = [
    {
      field: "fname",
      headerName: "First name",
      flex: 1,
      editable: true,
    },
    {
      field: "lname",
      headerName: "Last name",
      flex: 1,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      
      flex: 1,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      
      flex: 1,
      editable: true,
    },
    {
      field: "game",
      headerName: "Game",
      type: "number",
      flex: 1,
      editable: true,
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{
        "& .css-1knaqv7-MuiButtonBase-root-MuiButton-root, & .css-1k23hlb-MuiButtonBase-root-MuiButton-root": {
            color: "#1A4D2E !important", // Change the text color of the buttons to red
          },
        "& .css-1k23hlb-MuiButtonBase-root-MuiButton-root":{
            borderColor: "#1A4D2E"
        }
      }}>
        <GridToolbarColumnsButton/>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: 'Change density' } }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarExport
          slotProps={{
            tooltip: { title: 'Export data' },
            button: { variant: 'outlined' },
          }}
        />
      </GridToolbarContainer>
    );
  }
  

  return (
    <>
    <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Customers
        </Typography>
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          sx={{ border: "none", color: "#14343b" }}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: CustomToolbar}}
        />
      </Box>
    </>
  );
}
