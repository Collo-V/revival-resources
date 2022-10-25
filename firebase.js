import {initializeApp} from 'firebase/app'
import {getFirestore,collection} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyATe6gJztZbriB0vTgwW3KHg96GFtriadE",
    authDomain: "new-finetek.firebaseapp.com",
    projectId: "new-finetek",
    storageBucket: "new-finetek.appspot.com",
    messagingSenderId: "331636695526",
    appId: "1:331636695526:web:ddbb34838cb07f1284b627",
    measurementId: "G-CWDJ0LDB7M"
}
initializeApp(firebaseConfig)
const db =  getFirestore()
const app = initializeApp(firebaseConfig);
const myBlogs = collection(db,'blogs')
const myTeam = collection(db,'team')
export {
    myBlogs,myTeam,db
}