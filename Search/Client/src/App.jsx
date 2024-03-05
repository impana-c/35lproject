import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Search from './Search';
import Template from './Template';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Search/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/searchresult' element={<Template/>}/>
        </Routes>
      </BrowserRouter>
      </>
    </div>
  )
}

export default App;

