import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Signup from './Signup'
import Login from './Login'
import Homepage from './Homepage'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'

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
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;