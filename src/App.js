import React,{useEffect,useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import Post from './store/PostContext';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';

function App() {
 
  const {user,setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)


  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
    console.log(user)
  })
  return (
    <Router>
      <Post>
      <div>
        <Routes>
          <Route element={<Home/>} path='/' />
          <Route element={<Signup /> }path='signup/'/>
          <Route element={<Login />}path='login/'/>
          <Route element={<Create />}path='create/'/>
          <Route element={<ViewPost />}path='viewpost/'/>
        </Routes>
        
      </div>
      </Post>
    </Router>

  );
}

export default App;
