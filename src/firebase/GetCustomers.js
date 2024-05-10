import { getDocs, collection} from 'firebase/firestore';
import { db } from './FirebaseConfig';

async function GetCustomers() {
    const waitlistData = [];
    const waitlistRef = collection(db, 'customers');
    const waitlistSnapshot = await getDocs(waitlistRef);

    waitlistSnapshot.forEach(doc => {
        waitlistData.push(doc.data());
    });
    return waitlistData;
}

export default GetCustomers;