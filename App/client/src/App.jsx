import { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Signup from './Signin/Signup'
import Login from './Signin/Login' 
import Homepage from './Homepage/Homepage'
import Profile from './Profile/Profile'
import UpdateProfile from './Profile/UpdateProfile'
import Search from './Search/Search';
import Template from './Search/Template';
// import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/updateprofile' element={<UpdateProfile/>}/>
        {/* <Route path='/search' element={<Search/>}/> */}
        <Route path='/searchresult' element={<Template/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;