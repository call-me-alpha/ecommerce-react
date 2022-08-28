// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBMPubDXY33tHiidrrvRclAT8Fxi9xhS2U',
    authDomain: 'call-me-alpha-ecommerce.firebaseapp.com',
    projectId: 'call-me-alpha-ecommerce',
    storageBucket: 'call-me-alpha-ecommerce.appspot.com',
    messagingSenderId: '276091137396',
    appId: '1:276091137396:web:9e2b8f7839635eb5359021',
    measurementId: 'G-9689LFN7RG'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
