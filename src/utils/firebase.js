// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported,  } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiXYeOGa54ih0iPNK8joyj7f-1xJw6MCA",
  authDomain: "usermanagementdashboard.firebaseapp.com",
  projectId: "usermanagementdashboard",
  storageBucket: "usermanagementdashboard.appspot.com",
  messagingSenderId: "996942765511",
  appId: "1:996942765511:web:9451fb81d07db95fa70de2",
  measurementId: "G-F6J1K6SQC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Function to initialize analytics
const initializeAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

let analytics;
initializeAnalytics().then((initializedAnalytics) => {
  analytics = initializedAnalytics;
});

export const auth = getAuth(app); // Pass the app instance to getAuth
export { analytics };
