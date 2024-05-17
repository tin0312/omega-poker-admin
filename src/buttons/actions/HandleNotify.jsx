import React, { useState } from "react";
import {
  IconButton,
  Button,
  Modal,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export default function HandleNotify({
  phoneNumber,
  userName,
  setSuccessMessage,
}) {
  const [customMessage, setCustomMessage] = useState("");
  const [isCustomMessage, setIsCustomMessage] = useState(false);
  const [isMessageOption, setIsMessageOption] = useState(false);

  const handleOpen = () => setIsMessageOption(true);
  const handleClose = () => setIsMessageOption(false);
  const handleOpenCustomInput = () => setIsCustomMessage(true);

  const handleCustomMessage = (e) => {
    setCustomMessage(e.target.value);
    setIsCustomMessage(true);
  };

  const handleSendMessage = async (message) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVERLESS_FUNCTION_URL,
        {
          method: "POST",
          body: JSON.stringify({ phoneNumber, userName, message }),
        }
      );

      if (response.ok) {
        console.log("SMS message sent successfully");
      } else {
        const errorMessage = await response.text();
        console.error("Error sending SMS message", errorMessage);
      }
    } catch (error) {
      console.error("Error sending SMS message", error);
    }
  };

  const handleSendDefaultMessage = () => {
    const defaultMessage = `Hi ${userName},\nYou are up the waitlist, please head to the cashier counter!`;
    handleSendMessage(defaultMessage);
    handleClose();
    setSuccessMessage("Default Message Sent");
  };

  const handleSendCustomMessage = () => {
    handleSendMessage(customMessage);
    setIsCustomMessage(false);
    handleClose();
    setSuccessMessage("Custom Message Sent");
  };

  return (
    <>
      <IconButton aria-label="Notify" onClick={handleOpen}>
        <ChatBubbleIcon />
      </IconButton>
      <Modal
        open={isMessageOption}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography id="notification-modal-title" variant="h6" component="h2">
            {isCustomMessage
              ? "Customer notify message"
              : "Do you want to send a custom message?"}
          </Typography>
          {isCustomMessage ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "700px",
                gap: "30px",
              }}
            >
              <Typography
                id="notification-modal-title"
                variant="h6"
                component="h2"
              >
                Customer notify message
              </Typography>
              <TextField
                label="Custom Message"
                variant="outlined"
                value={customMessage}
                onChange={handleCustomMessage}
                sx={{ width: "100%" }}
              />
              <Button
                variant="contained"
                onClick={handleSendCustomMessage}
                style={{ alignSelf: "flex-end" }}
              >
                Send Message
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: "10px", alignSelf: "flex-end" }}>
              <Button sx={{backgroundColor: "black"}}  variant="contained" onClick={handleOpenCustomInput}>
                Yes
              </Button>
              <Button  sx={{backgroundColor: "black"}} variant="contained" onClick={handleSendDefaultMessage}>
                No
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
