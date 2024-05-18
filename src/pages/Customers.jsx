import { React, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useOutletContext } from "react-router-dom";
import GetCustomers from "../firebase/GetCustomers";
import Button from "@mui/material/Button";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import ClearAllIcon from "@mui/icons-material/ClearAll";

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
    async function handleDeleteAll() {
      try {
        const querySnapshot = await getDocs(collection(db, "customers"));
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
      } catch (error) {
        console.log("Error deleting all customers: ", error);
      }
      setRows([]);
    }
    return (
      <GridToolbarContainer
      sx={{
        "& .MuiButton-root":{
          color: "black",
          borderColor: "black",
        }

      }}
      >
        <GridToolbarColumnsButton/>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: "Change density" } }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarExport
          slotProps={{
            tooltip: { title: "Export data" },
            button: { variant: "outlined" },
          }}
        />
        <Button
          sx={{
            color: "black", // Change the text color
            borderColor: "black", // Change the border color
            "&:hover": {
              borderColor: "black", // Change border color on hover
            },
          }}
          variant="outlined"
          size="small"
          onClick={handleDeleteAll}
          startIcon={<ClearAllIcon />
        }
        >
          Clear All
        </Button>{" "}
        {/* Button to delete all rows */}
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
          rows={rows.map((row, index) => ({ ...row, id: index }))}
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
          slots={{ toolbar: CustomToolbar }}
          localeText={{
            noRowsLabel:
              "No customers information saved! Please check back later!",
          }}
        />
      </Box>
    </>
  );
}
