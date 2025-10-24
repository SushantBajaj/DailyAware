import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function SmallBar({ value, max }){
  const h = Math.round((value / (max||1)) * 100);
  return <div className="sbar"><div className="fill" style={{height:h+'%'}}></div><div className="lbl">{value}</div></div>
}

export default function Dashboard(){
  const [entries,setEntries]=useState([])
  const [form,setForm]=useState({date:new Date().toISOString().slice(0,10), mood:'Neutral', energy:5, screenTime:120, notes:''})
  const [err,setErr]=useState('')
  const token = localStorage.getItem('token') || '';

  useEffect(()=>{ fetchEntries() }, [])

  async function fetchEntries(){
    if(!token) return;
    try{
      const res = await fetch(API + '/api/entries', { headers:{ Authorization: 'Bearer '+token } });
      const data = await res.json();
      if(!res.ok) return setErr(data.error || 'Failed');
      setEntries(data);
    }catch(err){ setErr('Server error') }
  }

  async function submit(e){
    e.preventDefault(); setErr('');
    try{
      const res = await fetch(API + '/api/entries', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', Authorization: 'Bearer '+token },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if(!res.ok) return setErr(data.error || 'Failed');
      setForm({...form, notes:''});
      fetchEntries();
    }catch(err){ setErr('Server error') }
  }

  async function del(id){
    if(!confirm('Delete?')) return;
    try{
      const res = await fetch(API + '/api/entries/'+id, { method:'DELETE', headers:{ Authorization: 'Bearer '+token } });
      if(res.ok) fetchEntries();
    }catch(e){}
  }

  const maxE = Math.max(...entries.map(e=>e.energy), 10);
  const maxS = Math.max(...entries.map(e=>e.screenTime), 120);
  // Convert and sort data by date in ascending order
  const chartData = entries
  .map(e => ({
    ...e,
    date: e.date.slice(0, 10), // "YYYY-MM-DD"
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // <-- IMPORTANT

  return (
    <div className="dash">
      <section className="left card">
        <h3>New Entry</h3>
        {!token && <p className="muted">Please login or signup to save entries.</p>}
        <form onSubmit={submit}>
          <label>Date<input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required/></label>
          <label>Mood
            <select value={form.mood} onChange={e=>setForm({...form, mood:e.target.value})}>
              <option>Happy</option><option>Neutral</option><option>Sad</option><option>Stressed</option><option>Relaxed</option>
            </select>
          </label>
          <label>Energy<input type="number" min="0" max="10" value={form.energy} onChange={e=>setForm({...form, energy:Number(e.target.value)})} required/></label>
          <label>Screen time (mins)<input type="number" min="0" value={form.screenTime} onChange={e=>setForm({...form, screenTime:Number(e.target.value)})} required/></label>
          <label>Notes<textarea value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}></textarea></label>
          <div className="row"><button className="btn" disabled={!token}>Save</button></div>
          {err && <p className="error">{err}</p>}
        </form>
      </section>

      <section className="right">
        <div className="bg-white p-6 rounded-2xl shadow-sm flex-1">
  <h2 className="text-lg font-semibold mb-4">Trends</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Energy Trend */}
    <div className="p-4 rounded-xl border">
      <h3 className="text-md font-medium mb-2 text-blue-600">Energy Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Screen Time Trend */}
    <div className="p-4 rounded-xl border">
      <h3 className="text-md font-medium mb-2 text-red-500">Screen Time Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="screenTime" stroke="#ef4444" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>


        <div className="card list">
          <h3>History</h3>
          <ul className="entries">
            {entries.map(e=> (
              <li key={e._id}>
                <div className="top"><strong>{e.date}</strong><span className="mood">{e.mood}</span></div>
                <div className="meta">Energy: {e.energy} • Screen: {e.screenTime} mins</div>
                {e.notes && <div className="notes">{e.notes}</div>}
                <div className="actions"><button className="btn small" onClick={()=>del(e._id)}>Delete</button></div>
              </li>
            ))}
            {entries.length===0 && <li className="muted">No entries yet</li>}
          </ul>
        </div>
      </section>
    </div>
  )
}
