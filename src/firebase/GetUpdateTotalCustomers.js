import { Badge } from "@mui/icons-material";
import { db } from "./FirebaseConfig";
import { collection, onSnapshot, getDocs, addDoc, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function GetUpdateCustomers(setBadgeNum) {
  useEffect(() => {
    let originalSize = 0;

    // Function to fetch the original collection size
    const fetchOriginalSize = async () => {
      const snapshot = await getDocs(collection(db, "waitlist"));
      originalSize = snapshot.size;
    };
    fetchOriginalSize();
    const unsubscribe = onSnapshot(collection(db, "waitlist"), (snapshot) => {
      

      // Calculate the difference between the new snapshot size and the original size
      const diff = snapshot.size - originalSize > 0 ? snapshot.size - originalSize : 0;

      // Update the badge number with the difference
      setBadgeNum(diff);
   
      snapshot.docChanges().forEach(async (change)=>{
        if(change.type === 'removed'){
              return
        } 
        else if (change.type === 'added' && diff > 0) {
          // Check if the document already exists in the customers collection
          const customerQuery = query(collection(db, "customers"), where("id", "==", change.doc.id));
          const customerSnapshot = await getDocs(customerQuery);
          if (customerSnapshot.empty) {
            // Document does not exist in the customers collection, add it
            await addDoc(collection(db, "customers"), change.doc.data());
          }
        }
      });
    });

    return () => unsubscribe();
  }, [setBadgeNum]);
}
