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
import Recommend from './Recommendation/Recommendation';
import ReviewForm from './Ratings/ReviewForm';
//import './App.css'
/*<Route path='/' element={<Signup/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>
*/

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Login/>}/>
        <Route path='/signup' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/updateprofile' element={<UpdateProfile/>}/>
        <Route path='/searchresult' element={<Template/>}/>
        <Route path='/recommend' element={<Recommend/>}/>
        <Route path='/reviews' element={<ReviewForm/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;