import { getDocs, collection} from 'firebase/firestore';
import { db } from './FirebaseConfig';

async function GetUsers() {
    const waitlistData = [];
    const waitlistRef = collection(db, 'waitlist');
    const waitlistSnapshot = await getDocs(waitlistRef);

    waitlistSnapshot.forEach(doc => {
        waitlistData.push(doc.data());
    });
    console.log(waitlistData);
    return waitlistData;
}

export default GetUsers;