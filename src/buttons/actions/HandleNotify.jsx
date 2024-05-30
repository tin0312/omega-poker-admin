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
  setAlertSeverity,
  setModalOpen,
}) {
  const [customMessage, setCustomMessage] = useState("");
  const [isCustomMessage, setIsCustomMessage] = useState(false);
  const [isMessageOption, setIsMessageOption] = useState(false);

  const handleOpen = () => setIsMessageOption(true);
  const handleClose = () => {
    setIsCustomMessage(false);
    setIsMessageOption(false);
  };
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
    setModalOpen(false);
    setAlertSeverity("success");
    setSuccessMessage("Default Message Sent");
  };

  const handleSendCustomMessage = () => {
    handleSendMessage(customMessage);
    setIsCustomMessage(false);
    handleClose();
    setModalOpen(false);
    setAlertSeverity("success");
    setSuccessMessage("Custom Message Sent");
  };

  return (
    <>
      <IconButton aria-label="Notify" onClick={handleOpen}>
        <Box
          sx={{
            backgroundColor: "green",
            borderRadius: "5px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
          }}
        >
          <ChatBubbleIcon sx={{ color: "white", fontSize: "18px" }} />
        </Box>
      </IconButton>
      <Modal
        open={isMessageOption}
        onClose={handleClose}
        aria-labelledby="notification-modal-title"
        aria-describedby="notification-modal-description"
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
            boxShadow: 24,
            borderRadius: "8px",
            width: "80%",
            maxWidth: "600px",
          }}
        >
          <Typography
            id="notification-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            {isCustomMessage
              ? "Customer Notification Message"
              : "Do you want to send a custom message?"}
          </Typography>
          {isCustomMessage ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                gap: "30px",
              }}
            >
              <TextField
                label="Custom Message"
                variant="outlined"
                value={customMessage}
                onChange={handleCustomMessage}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={handleSendCustomMessage}
                sx={{
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
                Send Message
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Button
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid black",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                variant="contained"
                onClick={handleOpenCustomInput}
              >
                Yes
              </Button>
              <Button
                sx={{
                  color: "red",
                  backgroundColor: "white",
                  border: "1px solid red",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "red",
                    color: "white",
                  },
                }}
                variant="contained"
                onClick={handleSendDefaultMessage}
              >
                No
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
