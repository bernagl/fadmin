import * as firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA7PxT3iTGSi0ptD1pArsXdTvkaKbA79cM',
  authDomain: 'wired-plateau-141814.firebaseapp.com',
  databaseURL: 'https://wired-plateau-141814.firebaseio.com',
  projectId: 'wired-plateau-141814',
  storageBucket: 'wired-plateau-141814.appspot.com',
  messagingSenderId: '44467609676',
  timestampsInSnapshots: true
}
firebase.initializeApp(config)

export default firebase.firestore()
