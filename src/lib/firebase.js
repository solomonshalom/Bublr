import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import FIREBASE_CONFIG from './firebase-config'

if (firebase.apps.length === 0) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export default firebase
