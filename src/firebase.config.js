import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCRDt8VljtahZDWg0RDiJKVaBZI4UijUxc",
  authDomain: "admin-trial-26596.firebaseapp.com",
  projectId: "admin-trial-26596",
  storageBucket: "admin-trial-26596.appspot.com",
  messagingSenderId: "165137886063",
  appId: "1:165137886063:web:849027f5b9e46ba1f5569a",
  measurementId: "G-H32DPB4GKP"

}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export{ db }