import { db } from "./FirebaseConfig";
import { collection, onSnapshot, addDoc, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function GetUpdateCustomers(setBadgeNum) {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "waitlist"), async (snapshot) => {
      if (initialLoad) {
        setInitialLoad(false);
      } else {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            const customerQuery = query(collection(db, "customers"), where("id", "==", change.doc.id));
            const customerSnapshot = await getDocs(customerQuery);
            if (customerSnapshot.empty) {
              await addDoc(collection(db, "customers"), change.doc.data());
              setBadgeNum(prev => prev + 1);  // Increment badge number by 1
            }
          } else if (change.type === 'removed') {
            return
          }
        });
      }
    });

    return () => unsubscribe();
  }, [initialLoad, setBadgeNum]);

  return null; // or appropriate JSX if needed
}
