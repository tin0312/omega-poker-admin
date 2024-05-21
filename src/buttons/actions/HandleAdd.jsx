import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select, Button } from "@mui/material";
import { AddUser } from "../../firebase/AddUser";
import {Alert, Backdrop} from "@mui/material";

export default function HanldeAdd() {
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fname: "",
    lname: "",
    phone:"",
    game:"",
    email:""
  })
  const [successAddMessage, setSuccessAddMessage] = useState("");

  const handleOpen = () => {
    setIsNewFormOpen(true);
  };

  const handleClose = () => {
    setIsNewFormOpen(false);
  };

  const handleCloseBackdrop = () => {
    setSuccessAddMessage("");
  }

  async function addUser() {
    try {
      const customerEmail = customerInfo.email ? customerInfo.email : "Not provided";
      await AddUser(customerInfo.fName, customerInfo.lName, customerInfo.phone, customerEmail, customerInfo.game);
      handleClose();
      setSuccessAddMessage("User added successfully!")
    } catch (error) {
      console.log("Error adding user: ", error);
    }
  }

  return (
    <>
      <IconButton sx={{ color: "#FFF" }} aria-label="add" onClick={handleOpen}>
        <PersonAddIcon />
      </IconButton>
      {isNewFormOpen && (
        <Modal
          open={isNewFormOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 0},
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "50px",
              borderRadius: "10px",
              width: "40vw",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
            noValidate
            autoComplete="off"
          >
            <FormLabel component="legend" sx={{ mb: 2, alignSelf: "center" }}>
              <Typography variant="h4" sx={{ color: "black" }}>
                Customer Information
              </Typography>
            </FormLabel>
            {/* Name */}
            <Box sx={{ display: "flex", gap:4}}>
              <TextField
                required
                id="outlined-required"
                label="First Name"
                sx={{ flex: 1 }}
                onChange={(event) => setCustomerInfo({...customerInfo, fName: event.target.value })}
              />
              <TextField
                required
                id="outlined-required"
                label="Last Name"
                sx={{ flex: 1 }}
                onChange={(event) => setCustomerInfo({...customerInfo, lName: event.target.value })}
              />
            </Box>
            {/* Phone and Email */}
            <Box sx={{ display: "flex", gap:4}}>
              <TextField
                id="outlined-required"
                label="Email"
                variant="outlined"
                sx={{ flex: 1}}
                onChange={(event) => setCustomerInfo({...customerInfo, email: event.target.value })}
              />
              <TextField
                required
                id="outlined-required"
                label="Phone Number"
                type="number"
                variant="outlined"
                sx={{ flex: 1}}
                onChange={(event) => setCustomerInfo({...customerInfo, phone: event.target.value })}
              />
            </Box>
            {/* Game */}
            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Game</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={customerInfo.game}
                  label="Game"
                  onChange={(event) => setCustomerInfo({...customerInfo, game: event.target.value })}
                >
                  <MenuItem value={"NLH (No limit Texas Hold’em)"}>NLH (No limit Texas Hold’em)</MenuItem>
                  <MenuItem value={"PLO (Pot limit Omaha)"}>PLO (Pot limit Omaha)</MenuItem>
                </Select>
              </FormControl>
            </Box>
             <Button sx={{color: "white",
              backgroundColor: "black",
              border: "1px solid black",
              borderRadius: "4px",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "white",
                color: "black"}
              }} onClick={addUser}>Add</Button>
          </Box>
        </Modal>
      )}
       <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
        open={!!successAddMessage}
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
          {successAddMessage}
        </Alert>
      </Backdrop>
    </>
  );
}
