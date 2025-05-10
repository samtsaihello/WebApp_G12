// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mui/material'
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from 'react-router-dom';
import About from './components/About.jsx'
import Home from './components/Home.jsx';
import Palette from './components/Palette.jsx';
import Info from './components/Info.jsx';
import Change from './components/Change.jsx';
import History from './components/History.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pal" element={<Palette />} />
        <Route path="/info" element={<Info />} >
          <Route path="change" element={<Change />} />
          <Route path="history" element={<History />} />
        </Route> 
      </Routes>
    </>
  )
}

export default App
