import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';


function App(){
  const [user, setUser] = useState(()=>{
    try{return JSON.parse(localStorage.getItem('user'))}catch{return null}
  });

  useEffect(()=>{
    if(user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  },[user]);

  const logout=()=>{setUser(null); localStorage.removeItem('sessionId');}

  return (
    <div style={{padding:20}}>
      <nav style={{display:'flex',gap:12}}>
        <Link to="/">Home</Link>
        {user ? <><Link to="/dashboard">Dashboard</Link><a href="#" onClick={(e)=>{e.preventDefault();logout();}}>Logout</a></>
              : <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}
      </nav>
      <Routes>
        <Route path="/" element={<h2>Welcome</h2>} />
        <Route path="/login" element={user ? <Navigate to="/dashboard"/>:<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user?<Dashboard user={user}/>:<Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}
export default App;
