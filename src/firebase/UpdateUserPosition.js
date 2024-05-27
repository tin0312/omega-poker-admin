import { db } from "./FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

async function UpdateUserPosition(userId, index) {
  try {
    const userRef = doc(db, "waitlist", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      await updateDoc(userRef, {
        position: index,
      });
    } else {
      console.log("User document does not exist");
    }
  } catch (error) {
    console.log("Error updating user position", error);
  }
}

export default UpdateUserPosition;
