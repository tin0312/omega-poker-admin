import React from 'react';
import { db } from '../../firebase/FirebaseConfig';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function HandleRemove({ userId, users, setUsers }) {
  async function removeUser(userId) {
    try {
      // Delete the user document
      await deleteDoc(doc(db, 'waitlist', userId));

      // Update the positions of remaining users position in firestire & UI
      const updatedUsers = users.map(user => {
        if (user.id !== userId && user.position > 0) {
          const newPosition = user.position - 1;
          const docRef = doc(db, 'waitlist', user.id);
          updateDoc(docRef, { position: newPosition });
          updateRemainingUser(user.fname, user.phone, newPosition); 
          return { ...user, position: newPosition };
        }
        return user;
      });

      // Remove the user from the local state
      setUsers(updatedUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.log("Error deleting user: ", error);
    }
  }

// Update remaining user positions in SMS
  async function updateRemainingUser(userName, phoneNumber, newPosition){
      try {
        const response = await fetch(import.meta.env.VITE_SERVERLESS_FUNCTION_URL,
        {
          method: "POST",
          body: JSON.stringify({userName, phoneNumber, newPosition})
        })
        if(response.ok)
        {
          console.log("SMS message sent successfully")
        } else{
            const errorMessage = await response.text();
            console.error("Error send SMS messgae", errorMessage)
          }
      } catch(error){
        console.error("Error sending SMS message", error)
      }

  }

  return (
    <>
      <IconButton aria-label="remove" onClick={() => removeUser(userId)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}
