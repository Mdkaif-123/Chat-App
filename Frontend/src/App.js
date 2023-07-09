import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/LoginPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import socket from './components/socket/socket';
import { useEffect, useState } from 'react';

function App() {

  useEffect(() => {
    socket.emit("userDetails", {
      userName: localStorage.getItem("chatAppUser"),
      email: localStorage.getItem("chatAppEmail"),
    })
  }, [])


  const [mode, setMode] = useState("dark")


  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode("dark")
    } else {
      setMode("light")
    }

  }, [])
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    }
  }, [mode])
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home mode={mode} setMode={setMode} />} />
          <Route exact path='/login' element={<Login mode={mode} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
