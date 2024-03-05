import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from "./Search"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Search/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
