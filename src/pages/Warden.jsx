import { useEffect, useState } from 'react'

const api = () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Warden() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [requests, setRequests] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => { document.title = 'Warden | GatePass' }, [])

  const login = async () => {
    setStatus('Logging in...')
    const res = await fetch(`${api()}/api/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, role: 'warden' }) })
    const data = await res.json()
    if (res.ok) { setToken(data.token); setStatus('Logged in'); fetchRequests(data.token) }
    else setStatus(data.detail || 'Failed')
  }

  const fetchRequests = async (tk = token) => {
    const res = await fetch(`${api()}/test`) // placeholder probe
    // since we don't have a dedicated list endpoint, fetch from logs not available; omit
    setStatus('Fetch requests via DB viewer or extend API for listing.')
  }

  const act = async (request_id, action) => {
    const res = await fetch(`${api()}/api/warden/approve`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, request_id, action }) })
    const data = await res.json()
    setStatus(res.ok ? `Request ${action}d` : (data.detail || 'Failed'))
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Warden Dashboard</h1>
      <p className="text-white/60 mb-6">Approve or reject parent-verified requests.</p>

      {!token && (
        <div className="p-5 rounded-xl bg-white/5 border border-white/10 mb-6">
          <h2 className="font-semibold mb-3">Login</h2>
          <input className="w-full mb-2 px-3 py-2 rounded bg-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full mb-3 px-3 py-2 rounded bg-white/10" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button onClick={login} className="px-4 py-2 rounded bg-indigo-600/80">Login</button>
        </div>
      )}

      {token && (
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h2 className="font-semibold mb-3">Action</h2>
          <p className="text-white/60 text-sm mb-3">Enter a request ID to approve/reject. (List endpoint can be added on request.)</p>
          <WardenAction onAction={act} />
          {status && <div className="mt-3 text-sm text-fuchsia-300">{status}</div>}
        </div>
      )}
    </div>
  )
}

function WardenAction({ onAction }) {
  const [id, setId] = useState('')
  return (
    <div className="flex gap-2">
      <input className="flex-1 px-3 py-2 rounded bg-white/10" placeholder="Request ID" value={id} onChange={e=>setId(e.target.value)} />
      <button onClick={() => onAction(id, 'approve')} className="px-3 py-2 rounded bg-green-600/80">Approve</button>
      <button onClick={() => onAction(id, 'reject')} className="px-3 py-2 rounded bg-red-600/80">Reject</button>
    </div>
  )
}
