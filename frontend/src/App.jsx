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
import { useCallback, useState } from 'react';

function App() {
  // const [count, setCount] = useState(0)
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");

  const handleGetAccount = useCallback((account) => {
    setAccount(account);
  },[]);

  const handleGetName = useCallback((name) => {
    setName(name);
  }
,[]);

  return (
    <>
        <Navbar inputname={name} onSetAccount={handleGetAccount} onSetName={handleGetName} />
        <div className="pt-12  text-white overflow-y-auto w-full h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pal" element={<Palette account={account} />} />
          <Route path="/info" element={<Info />} >
            <Route path="change" element={<Change name={name} account={account} onSetName={handleGetName} />} />
            <Route path="history" element={<History user={account} />} />
          </Route> 
        </Routes>
        </div>
    </>
    
  )
}

export default App
