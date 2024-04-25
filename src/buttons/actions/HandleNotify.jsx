import React from "react";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export default function HandleNotify({ phoneNumber, userName }) {
  async function notifyUser() {
    try {
      const response = await fetch(import.meta.env.VITE_SERVERLESS_FUNCTION_URL, {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, userName })
      });

      if (response.ok) {
        console.log("SMS message sent successfully");
      } else {
        const errorMessage = await response.text();
        console.error("Error sending SMS message", errorMessage);
        // Handle the error here, such as displaying an error message to the user
      }
    } catch (error) {
      console.error("Error sending SMS message", error);
      // Handle the error here, such as displaying an error message to the user
    }
  }

  return (
    <>
      <IconButton aria-label="Notify" onClick={notifyUser}>
        <ChatBubbleIcon />
      </IconButton>
    </>
  );
}
