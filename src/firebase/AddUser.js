import { nanoid } from "nanoid";
import { db } from "./FirebaseConfig";
import {
  collection,
  setDoc,
  getDocs,
  doc,
  Timestamp,
} from "firebase/firestore";
import moment  from "moment-timezone"; 

function formatTime(timestamp, timeZone = 'America/Toronto') {
  const utcDate = timestamp.toDate(); 
  const localDate = moment(utcDate).tz(timeZone);
  return localDate.format('h:mm A');
}

async function AddUser(fname, lname, phone, email, game) {
  const userId = nanoid();
  const timeStamp = formatTime(Timestamp.now());
  try {
    const collectionRef = collection(db, "waitlist");
    const collectionSnapshot = await getDocs(collectionRef);
    const userPosition = collectionSnapshot.size + 1;
    const userInfo = {
      wait: timeStamp,
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
