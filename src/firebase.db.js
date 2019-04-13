import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'react-firebase-c777.firebaseapp.com',
  databaseURL: 'https://react-firebase-c777.firebaseio.com',
  projectId: 'react-firebase-c777',
  storageBucket: 'react-firebase-c777.appspot.com',
  messagingSenderId: '745025579359'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, firebase };
