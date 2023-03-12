
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
// your config
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)

export {db};