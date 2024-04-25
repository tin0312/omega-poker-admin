import React from 'react';
import { db } from '../../firebase/FirebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function HandleRemove({userId, users, setUsers}) {
  async function removeUser(userId) {
    try {
      await deleteDoc(doc(db, 'waitlist', userId));
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.log("Error deleting user: ", error);
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
