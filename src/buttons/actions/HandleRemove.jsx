import React from 'react';
import { db } from '../../firebase/FirebaseConfig';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';

export default function HandleRemove({ userId, users, setUsers }) {
  async function removeUser(userId) {
    try {
      // Get the user to be removed
      const userToRemove = users.find(user => user.id === userId);

      // Delete the user document
      await deleteDoc(doc(db, 'waitlist', userId));

      // Update the positions of remaining users in Firestore & UI
      const updatedUsers = await Promise.all(
        users.map(async (user) => {
          if (user.id !== userId && user.position > userToRemove.position) {
            const newPosition = user.position - 1;
            const docRef = doc(db, 'waitlist', user.id);
            await updateDoc(docRef, { position: newPosition });
            return { ...user, position: newPosition };
          }
          return user;
        })
      );

      // Remove the user from the local state
      setUsers(updatedUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.log("Error deleting user: ", error);
    }
  }

  return (
    <IconButton aria-label="remove" onClick={() => removeUser(userId)}>
      <Box 
        sx={{
          backgroundColor: "red",
          borderRadius: "5px",
          padding: "8px",
          display: "flex",
          alignItems: "center", // Corrected property name
          justifyContent: "center"
        }}
      >
        <ClearIcon sx={{ color: "white" }} />
      </Box>
    </IconButton>
  );
}
