import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function Nav(){
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const logout = ()=>{ localStorage.removeItem('token'); navigate('/login'); }
  return (
    <nav className="nav">
      <div className="logo">DailyAware</div>
      <div className="nav-right">
        {token ? <button className="btn ghost" onClick={logout}>Logout</button> : <>
          <Link to="/login" className="btn ghost">Login</Link>
          <Link to="/signup" className="btn">Signup</Link>
        </>}
      </div>
    </nav>
  )
}

export default function App(){
  return (
    <div className="app">
      <Nav />
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="*" element={<Dashboard/>} />
        </Routes>
      </main>
    </div>
  )
}
