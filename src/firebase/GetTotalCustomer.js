import {db} from './FirebaseConfig';
import {getCountFromServer, collection} from 'firebase/firestore';


async function GetTotalCustomer() {
    const waitlistRef = collection(db, "waitlist");
    const totalCustomer = (await getCountFromServer(waitlistRef)).data().count;
    return totalCustomer;
}

export default GetTotalCustomer;