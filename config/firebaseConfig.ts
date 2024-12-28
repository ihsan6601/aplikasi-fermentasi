import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";

import {getMessaging} from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyB51BnmRdfh0Q1ZLDb3glJWrAyO1FO0PeE",
  authDomain: "ta-ihsan-748a6.firebaseapp.com",
  databaseURL: "https://ta-ihsan-748a6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ta-ihsan-748a6",
  storageBucket: "ta-ihsan-748a6.firebasestorage.app",
  messagingSenderId: "663590029465",
  appId: "1:663590029465:web:7d95a40dee1472c746d008",
  measurementId: "G-JGTC20M2BD"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

  // Firebase Collection and Document
export const dataLoggingCollection = collection(FIREBASE_DB, "Data Logging");
export const monitoringDocument = doc(dataLoggingCollection, "monitoring");
export const currentFermentasiDocument = doc(dataLoggingCollection, "current_fermentasi");
export const historyCollection = collection(FIREBASE_DB, "History");
