import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [err,setErr]=useState('')
  const navigate=useNavigate()

  async function submit(e){
    e.preventDefault(); setErr('');
    try{
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/auth/signup', {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,password})
      });
      const data = await res.json();
      if(!res.ok) return setErr(data.error || 'Signup failed');
      localStorage.setItem('token', data.token);
      navigate('/');
    }catch(err){ setErr('Server error') }
  }

  return (
    <div className="card auth-card">
      <h2>Create your account</h2>
      <form onSubmit={submit}>
        <label>Name<input value={name} onChange={e=>setName(e.target.value)} required/></label>
        <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} required/></label>
        <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
        <div className="row">
          <button className="btn">Signup</button>
        </div>
        {err && <p className="error">{err}</p>}
      </form>
    </div>
  )
}
