import React from "react";
import CardActions from "@mui/material/CardActions";
import HandleNotify from "../buttons/actions/HandleNotify";
import HandleRemove from "../buttons/actions/HandleRemove";
import HandleEdit from "../buttons/actions/HandleEdit";
import Box from "@mui/material/Box"
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

const ActionsModal = ({ users, user, setSuccessMessage, setAlertSeverity, setUsers, handleEditUser, onClose, setModalOpen }) => {
  return (
    <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" sx={{fontWeight: "bold"}}>{user.fname} {user.lname}</Typography>
      <CardActions>
        <HandleNotify
          phoneNumber={user.phone}
          userName={user.fname}
          setSuccessMessage={setSuccessMessage}
          setAlertSeverity={setAlertSeverity}
          setModalOpen={setModalOpen}
        />
        <HandleRemove
          userId={user.id}
          users={users}
          setUsers={setUsers}
          setModalOpen={setModalOpen}
        />
        <HandleEdit
          handleEditUser={handleEditUser}
          user={user}
        />
      </CardActions>
      <Button onClick={onClose} sx={{color: "black"}}>Close</Button>
    </Box>
  );
};

export default ActionsModal;
