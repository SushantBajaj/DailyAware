import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [err,setErr]=useState('')
  const navigate=useNavigate()

  async function submit(e){
    e.preventDefault(); setErr('');
    try{
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/auth/login', {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password})
      });
      const data = await res.json();
      if(!res.ok) return setErr(data.error || 'Login failed');
      localStorage.setItem('token', data.token);
      navigate('/');
    }catch(err){ setErr('Server error') }
  }

  return (
    <div className="card auth-card">
      <h2>Welcome back</h2>
      <form onSubmit={submit}>
        <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} required/></label>
        <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
        <div className="row">
          <button className="btn">Login</button>
        </div>
        {err && <p className="error">{err}</p>}
      </form>
    </div>
  )
}
