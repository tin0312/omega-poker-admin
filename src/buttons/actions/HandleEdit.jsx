import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";

export default function HandleEdit({handleEditUser, user}) {
  return (
    <IconButton aria-label="edit" onClick= {() => handleEditUser(user)}>
      <Box
        sx={{ 
          backgroundColor: "blue", 
          borderRadius: "5px", 
          padding: "8px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center"
        }}
      >
        <EditIcon sx={{ color: "white" }} />
      </Box>
    </IconButton>
  );
}
