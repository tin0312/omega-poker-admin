import { nanoid } from "nanoid";
import { db } from "./FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

async function AddUser(fName, lName, phone, email, game){
    const userID = nanoid();
    try{
        const collectionRef = collection(db, "waitlist");
        const collectionSnapshot = await getDocs(collectionRef);
        const userPosition = collectionSnapshot.size + 1;
        const userInfo = {
            id: userID,
            fname: fName,
            lname: lName,
            phone: phone,
            email: email,
            game: game,
            position: userPosition
        }
        await addDoc(collectionRef, userInfo);
    } catch(error){
        console.error("Error adding user: ", error);
    }
}

export { AddUser }