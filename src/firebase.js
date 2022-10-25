import {initializeApp} from 'firebase/app'
import {getFirestore,collection} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDhd6yZafFk-tYHtX0eSRHMIoEX_wEmpU4",
    authDomain: "revival-resources.firebaseapp.com",
    projectId: "revival-resources",
    storageBucket: "revival-resources.appspot.com",
    messagingSenderId: "561469890157",
    appId: "1:561469890157:web:9c8a10140900c9fceb2964",
    measurementId: "G-LL0GEQXKPL"
};
initializeApp(firebaseConfig)
const db =  getFirestore()
const app = initializeApp(firebaseConfig);
const books = collection(db,'books')
const guides = collection(db,'guides')
export {
    books,guides,db
}
