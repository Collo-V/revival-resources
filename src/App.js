import {Routes as Switch,Route,BrowserRouter as Router, } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Home from "./pages/Home";
import Books from "./pages/Books";
import {books} from "./firebase";
import {onSnapshot} from 'firebase/firestore'
import {writeBooks} from "./store/reducers/books";

function App() {
  const dispatch = useDispatch()
  const {darkMode} = useSelector(state => state.settings)
  useEffect(()=>{
    let html =document.getElementsByTagName('html')[0]
    if(darkMode){
      html.classList.add('dark')
    }else {
      html.classList.remove('dark')
    }
  },[darkMode])
  useEffect(()=>{
    onSnapshot(books,snapshot => {
      let tempBooks = {}
      let docs = snapshot.docs
      docs.forEach(doc=>{
        tempBooks[doc.id] = {...doc.data(),id:doc.id}
      })
      dispatch(writeBooks(tempBooks))

    })
  },[])
  return (
    <div className="App">
      <Router >
        <div className="flex h-screen-h bg-slate-100 dark:bg-slate-900 dark:text-white">
          <div className="w-full">
            <Switch>
              <Route path='/' element={<Home/>}/>
              <Route path='/books' element={<Books/>}/>
            </Switch>
          </div>
        </div>
      </Router>


    </div>
  );
}

export default App;
