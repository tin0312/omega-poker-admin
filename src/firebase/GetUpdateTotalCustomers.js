import {db} from "./FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react"



export default function GetUpdateCustomers(setBadgeNum){
        useEffect(()=>{
            const unsubcribe = onSnapshot(collection(db, "waitlist"), (snapshot) =>{
                snapshot.docChanges().forEach((change) =>{
                    if(change.type === "added"){
                        setBadgeNum((prevBadgeNum) => prevBadgeNum + 1)
                    }
                })
            })
            return () => unsubcribe()
        },[setBadgeNum])
}