import { db } from "./FirebaseConfig";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function GetUpdateCustomers(setBadgeNum) {
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "waitlist"), (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          // Increment the badge number
          setBadgeNum((prevBadgeNum) => prevBadgeNum + 1);

          // Get the data from the added document
          const docData = change.doc.data();

          try {
            // Add the data to the "customers" collection
            await addDoc(collection(db, "customers"), docData);
          } catch (error) {
            console.error(
              "Error adding document to customers collection:",
              error
            );
          }
        }
      });
    });

    return () => unsubscribe();
  }, [setBadgeNum]);
}

