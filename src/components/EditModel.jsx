import React, { useState } from "react";
import { UpdateUser } from "../firebase/UpdateUser";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function EditModel({
  setAlertSeverity,
  setUsers,
  user,
  onClose,
  setSuccessMessage,
  onUserEdit,
  setModalOpen,
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Destructure user data for easier comparison
    const {
      fname: userFname,
      lname: userLname,
      phone: userPhone,
      game: userGame,
    } = user;
    const { fname, lname, phone, game } = data;

    // Check if no input is provided or all inputs are unchanged
    if (
      (!fname && !lname && !phone && !game) ||
      (fname === userFname &&
        lname === userLname &&
        phone === userPhone &&
        game === userGame)
    ) {
      setSuccessMessage("No changes made");
      setAlertSeverity("warning");
      onClose();
      setModalOpen(false);
      return;
    }

    // Prepare the data object to only include changed fields
    const updatedData = {};
    if (fname && fname !== userFname) updatedData.fname = fname;
    if (lname && lname !== userLname) updatedData.lname = lname;
    if (phone && phone !== userPhone) updatedData.phone = phone;
    if (game && game !== userGame) updatedData.game = game;

    try {
      await UpdateUser(
        updatedData.fname || userFname,
        updatedData.lname || userLname,
        updatedData.phone || userPhone,
        updatedData.game || userGame,
        user.id
      );
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? { ...u, ...updatedData } : u))
      );
      setAlertSeverity("success");
      setSuccessMessage("User Information Edited");
      onUserEdit(user.id); // Highlight the edited row
      onClose();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving customer information", error);
      setAlertSeverity("error");
      setSuccessMessage("Failed to edit user information");
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          "& .MuiTextField-root": { m: 0 },
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: { xs: "20px", sm: "30px", md: "50px" },
          borderRadius: "10px",
          width: { xs: "90vw", sm: "70vw", md: "40vw" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <FormLabel component="legend" sx={{ mb: 2, alignSelf: "center" }}>
          <Typography variant="h4" sx={{ color: "black" }}>
            Edit Information
          </Typography>
        </FormLabel>
        {/* Name */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Controller
            name="fname"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="First Name" sx={{ flex: 1 }} />
            )}
          />
          <Controller
            name="lname"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Last Name" sx={{ flex: 1 }} />
            )}
          />
        </Box>
        {/* Phone */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              pattern: {
                value: /^[0-9]{3} [0-9]{3} [0-9]{4}$/,
                message: "Phone number must be in the format XXX XXX XXXX",
              },
              maxLength: {
                value: 12,
                message: "Phone number cannot exceed 12 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                type="text"
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ""}
                variant="outlined"
                sx={{ flex: 1 }}
                inputProps={{ maxLength: 12 }}
              />
            )}
          />
        </Box>
        {/* Game */}
        <Box sx={{ width: "100%" }}>
          <Controller
            name="game"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Game</InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Game"
                >
                  <MenuItem value={"NLH"}>NLH</MenuItem>
                  <MenuItem value={"PLO"}>PLO</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            gap: 2,
            marginTop: 2,
          }}
        >
          <Button
            type="submit"
            sx={{
              flex: 1,
              color: "white",
              backgroundColor: "black",
              border: "1px solid black",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            SAVE
          </Button>
          <Button
            onClick={onClose}
            sx={{
              flex: 1,
              color: "red",
              borderColor: "red",
              border: "1px solid red",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "red",
                color: "white",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
