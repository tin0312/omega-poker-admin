import {db} from "./FirebaseConfig";
import {updateDoc, doc} from "firebase/firestore";

async function UpdateUser(fname, lname, phone, game, userId){
    try{   
        const docRef = doc(db, "waitlist", userId)
        await updateDoc(docRef, {
            fname: fname,
            lname: lname,
            phone: phone,
            game: game
        })

    } catch(error){
        console.log("Error updating selected user", error)
    }
}

export {UpdateUser}