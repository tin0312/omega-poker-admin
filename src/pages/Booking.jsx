import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
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
import HandleEdit from "../buttons/actions/HandleEdit";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import EditModel from "../components/EditModel";
import ReorderIcon from "@mui/icons-material/Reorder";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import UpdateUserPosition from "../firebase/UpdateUserPosition";

export default function Booking() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refetch, users, setUsers] = useOutletContext();
  const [successMessage, setSuccessMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [editUser, setEditUser] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await GetUsers();
      setUsers(data);
    }
    fetchData();
    console.log("Refetching...");
  }, [refetch, setUsers]);

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

  function handleEditUser(user) {
    setEditUser(user);
  }

  function handleCloseEditUser() {
    setEditUser(null);
  }

  const handleHighlightRow = (userId) => {
    setHighlightedRow(userId);
    setTimeout(() => {
      setHighlightedRow(null);
    }, 1000);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedUsers = Array.from(users);
    const [movedUser] = reorderedUsers.splice(result.source.index, 1);
    reorderedUsers.splice(result.destination.index, 0, movedUser);

    // Update the local positions
    const updatedUsers = reorderedUsers.map((user, index) => ({
      ...user,
      position: index + 1,
    }));

    setUsers(updatedUsers);

    // Update the positions in the database
    try {
      for (const user of updatedUsers) {
        await UpdateUserPosition(user.id, user.position);
      }
      setSuccessMessage("User positions updated successfully");
      setAlertSeverity("success");
    } catch (error) {
      setSuccessMessage("Failed to update user positions");
      setAlertSeverity("error");
    }
  };

  const getDraggableProps = (provided, snapshot) => {
    const style = {
      ...provided.draggableProps.style,
      ...(snapshot.isDragging && {
        background: "rgb(235,235,235)",
      }),
    };

    return style;
  };

  return (
    <React.Fragment>
      <Title>Omega Poker Waitlist</Title>
      <Table sx={{ mt: "30px" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}></TableCell>
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
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
                      <Draggable
                        key={user.id}
                        draggableId={user.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={getDraggableProps(provided, snapshot)}
                            sx={{
                              backgroundColor:
                                highlightedRow === user.id
                                  ? "#CCFFCC"
                                  : index % 2 === 0
                                  ? "#f6f6f6"
                                  : "white",
                              transition: "background-color 0.5s ease",
                            }}
                          >
                            <TableCell align="left">
                              <div {...provided.dragHandleProps}>
                                <ReorderIcon />
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              {user.position}
                            </TableCell>
                            <TableCell align="center">{`${user.fname} ${user.lname}`}</TableCell>
                            <TableCell align="center">{user.game}</TableCell>
                            <TableCell align="center">{user.phone}</TableCell>
                            <TableCell align="center">
                              <HandleNotify
                                phoneNumber={user.phone}
                                userName={user.fname}
                                setSuccessMessage={setSuccessMessage}
                                setAlertSeverity={setAlertSeverity}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <HandleRemove
                                userId={user.id}
                                users={users}
                                setUsers={setUsers}
                              />
                              <HandleEdit
                                handleEditUser={handleEditUser}
                                user={user}
                              />
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))
                )}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>

      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
        open={!!successMessage}
        onClick={handleCloseBackdrop}
      >
        <Alert
          severity={alertSeverity}
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
      {editUser && (
        <EditModel
          user={editUser}
          setUsers={setUsers}
          onClose={handleCloseEditUser}
          setSuccessMessage={setSuccessMessage}
          setAlertSeverity={setAlertSeverity}
          onUserEdit={handleHighlightRow}
        />
      )}
    </React.Fragment>
  );
}
