import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useOutletContext } from "react-router-dom";
import GetCustomers from "../firebase/GetCustomers";

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
      //   width: 150,
      flex: 1,
      editable: true,
    },
    {
      field: "lname",
      headerName: "Last name",
      //   width: 150,
      flex: 1,
      editable: true,
    },
    {
        field: "phone",
        headerName: "Phone",
        // width: 150,
        flex: 1,
        editable: true,
      },
    {
      field: "email",
      headerName: "Email",
      // width: 150,
      flex: 1,
      editable: true,
    },
    {
      field: "game",
      headerName: "Game",
      type: "number",
      flex: 1,
      //   width: 150,
      editable: true,
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          sx={{ border: "none" }}
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
        />
      </Box>
    </>
  );
}
