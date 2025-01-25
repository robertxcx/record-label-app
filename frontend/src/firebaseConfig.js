
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd_ZvhuM1bNNY2pdOKB7nkHOGvH1i7QhI",
  authDomain: "records-label-90cf2.firebaseapp.com",
  projectId: "records-label-90cf2",
  storageBucket: "records-label-90cf2.firebasestorage.app",
  messagingSenderId: "744693219136",
  appId: "1:744693219136:web:fd54aaaf117ce9c71e44a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(app);

// Get a reference to the auth service
const auth = getAuth(app);

export { storage, auth, app };