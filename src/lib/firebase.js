import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import FIREBASE_CONFIG from './firebase-config';

if (firebase.apps.length === 0) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore, firebase };