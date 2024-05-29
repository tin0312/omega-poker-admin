import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
  Alert,
  Backdrop,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { AddUser } from "../../firebase/AddUser";

export default function HandleAdd() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);
  const [successAddMessage, setSuccessAddMessage] = useState("");

  const handleOpen = () => setIsNewFormOpen(true);
  const handleClose = () => {
    setIsNewFormOpen(false);
    reset();
  };
  const handleCloseBackdrop = () => setSuccessAddMessage("");

  const onSubmit = async (data) => {
    try {
      const customerEmail = data.email ? data.email : "Not provided";
      await AddUser(
        data.fname,
        data.lname,
        data.phone,
        customerEmail,
        data.game
      );
      handleClose();
      setSuccessAddMessage("User added successfully!");
    } catch (error) {
      console.log("Error adding user: ", error);
    }
  };

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
            <FormLabel component="legend" sx={{ mb: 2}}>
              <Typography variant="h4" sx={{ color: "black", textAlign: "center" }}>
                Customer Information
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
                rules={{ required: "First Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="First Name"
                    error={!!errors.fname}
                    helperText={errors.fname ? errors.fname.message : ""}
                    sx={{ flex: 1 }}
                  />
                )}
              />
              <Controller
                name="lname"
                required
                control={control}
                defaultValue=""
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Last Name"
                    error={!!errors.lname}
                    helperText={errors.lname ? errors.lname.message : ""}
                    sx={{ flex: 1 }}
                  />
                )}
              />
            </Box>
            {/* Phone and Email */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  pattern: {
                    value:
                      /^([0-9]{9})|([A-Za-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$/,
                    message: "Invalid email or ID format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    variant="outlined"
                    sx={{ flex: 1 }}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  required: "Phone Number required",
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
                    required
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
                rules={{ required: "Game is required" }}
                render={({ field }) => (
                  <FormControl required fullWidth error={!!errors.game}>
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
                    {!!errors.game && (
                      <Typography color="error">
                        {errors.game.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Box>
            <Button
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "black",
                border: "1px solid black",
                borderRadius: "4px",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              Add
            </Button>
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
