import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../components/Title";
import GetUsers from "../firebase/GetUsers";
import HandleRemove from "../buttons/actions/HandleRemove";
import HandleNotify from "../buttons/actions/HandleNotify";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";

export default function Booking() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refetch, users, setUsers] = useOutletContext();
  const [successMessage, setSuccessMessage] = useState("");

  // make a call to firestore to get waitlist datat
  useEffect(() => {
    async function fetchData() {
      const data = await GetUsers();
      setUsers(data);
    }
    fetchData();
    console.log("Refetching...")
  }, [refetch,setUsers]);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  }
  const handleCloseBackdrop = () => {
    setSuccessMessage("");
  };

  return (
    <React.Fragment>
      <Title>Omega Poker Wailist</Title>
      <Table sx={{ mt: "30px" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              POSITION
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              NAME
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              GAME
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              PHONE NUMBER
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              NOTIFY
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              ACTIONS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell align="center" colSpan={7}>
                <p>No Bookings</p>
              </TableCell>
            </TableRow>
          ) : (
            users
              .sort((user1, user2) => user1.position - user2.position)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow 
                key={user.id} 
                sx={{ 
                  '& > *': { paddingTop: "15px", paddingBottom: "15px" },
                  backgroundColor: index % 2 === 0 ? '#f6f6f6' : 'white'
                }}
              >
                <TableCell align="center">{user.position}</TableCell>
                <TableCell align="center">{`${user.fname} ${user.lname}`}</TableCell>
                <TableCell align="center">{user.game}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">
                  <HandleNotify
                    phoneNumber={user.phone}
                    userName={user.fname}
                    setSuccessMessage={setSuccessMessage}
                  />
                </TableCell>
                <TableCell align="center">
                  <HandleRemove
                    userId={user.id}
                    users={users}
                    setUsers={setUsers}
                  />
                </TableCell>
              </TableRow>
              ))
          )}
        </TableBody>
      </Table>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
        open={!!successMessage}
        onClick={handleCloseBackdrop}
      >
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {successMessage}
        </Alert>
      </Backdrop>
      <TablePagination
        component="div"
        rowsPerPageOptions={[4, 5]}
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 3 }}
      />
    </React.Fragment>
  );
}
