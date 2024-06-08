import { nanoid } from "nanoid";
import { db } from "./FirebaseConfig";
import {
  collection,
  setDoc,
  getDocs,
  doc,
  Timestamp,
} from "firebase/firestore";

function formatTimeStamp(Timestamp) {
  const date = Timestamp.toDate();
  let hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, 0);
  const ampm = hour > 12 ? "PM" : "AM";
  hour = hour % 12 ? hour : 12;
  const strHour = hour.toString().padStart(2, 0);
  return `${strHour}:${minute} ${ampm}`;
}

async function AddUser(fname, lname, phone, email, game) {
  const userId = nanoid();
  try {
    const collectionRef = collection(db, "waitlist");
    const collectionSnapshot = await getDocs(collectionRef);
    const userPosition = collectionSnapshot.size + 1;
    const userInfo = {
      wait: formatTimeStamp(Timestamp.now()),
      id: userId,
      fname: fname,
      lname: lname,
      phone: phone,
      email: email,
      game: game,
      position: userPosition,
    };
    await setDoc(doc(collectionRef, userId), userInfo);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}

export { AddUser };
