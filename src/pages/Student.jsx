import { useEffect, useState } from 'react'

const api = () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Student() {
  const [view, setView] = useState('login')
  const [status, setStatus] = useState('')

  // Auth
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  // Register
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [roll, setRoll] = useState('')
  const [hostel, setHostel] = useState('')
  const [room, setRoom] = useState('')
  const [parentName, setParentName] = useState('')
  const [parentEmail, setParentEmail] = useState('')

  // Apply pass
  const [reason, setReason] = useState('')
  const [fromDt, setFromDt] = useState('')
  const [toDt, setToDt] = useState('')
  const [destination, setDestination] = useState('')
  const [requestId, setRequestId] = useState('')

  useEffect(() => { document.title = 'Student | GatePass' }, [])

  const register = async () => {
    setStatus('Registering...')
    const res = await fetch(`${api()}/api/registerStudent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: fullName, email, password, phone, roll_no: roll, hostel, room_no: room, parent_name: parentName, parent_email: parentEmail })
    })
    const data = await res.json()
    if (res.ok) {
      setToken(data.token); setView('apply'); setStatus('Registered successfully')
    } else setStatus(data.detail || 'Failed')
  }

  const login = async () => {
    setStatus('Logging in...')
    const res = await fetch(`${api()}/api/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'student' })
    })
    const data = await res.json()
    if (res.ok) { setToken(data.token); setView('apply'); setStatus('Logged in') }
    else setStatus(data.detail || 'Failed')
  }

  const apply = async () => {
    setStatus('Submitting request...')
    const res = await fetch(`${api()}/api/applyPass`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, reason, from_datetime: new Date(fromDt), to_datetime: new Date(toDt), destination })
    })
    const data = await res.json()
    if (res.ok) { setRequestId(data.request_id); setStatus('Request submitted'); setView('status') }
    else setStatus(data.detail || 'Failed')
  }

  const sendOtp = async () => {
    setStatus('Sending OTP to parent...')
    const res = await fetch(`${api()}/api/sendOTP`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ request_id: requestId }) })
    const data = await res.json()
    setStatus(data.message + (data.dev_otp ? ` | Dev OTP: ${data.dev_otp}` : ''))
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Student Portal</h1>
      <p className="text-white/60 mb-6">Apply for gate pass and track status.</p>

      {status && <div className="mb-4 text-sm text-fuchsia-300">{status}</div>}

      {view === 'login' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <h2 className="font-semibold mb-3">Login</h2>
            <input className="w-full mb-2 px-3 py-2 rounded bg-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input className="w-full mb-2 px-3 py-2 rounded bg-white/10" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button onClick={login} className="w-full px-4 py-2 rounded bg-fuchsia-600/80">Login</button>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <h2 className="font-semibold mb-3">Register</h2>
            <input className="w-full mb-2 px-3 py-2 rounded bg-white/10" placeholder="Full Name" value={fullName} onChange={e=>setFullName(e.target.value)} />
            <input className="w-full mb-2 px-3 py-2 rounded bg-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input className="w-full mb-2 px-3 py-2 rounded bg-white/10" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <input className="px-3 py-2 rounded bg-white/10" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
              <input className="px-3 py-2 rounded bg-white/10" placeholder="Roll No" value={roll} onChange={e=>setRoll(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input className="px-3 py-2 rounded bg-white/10" placeholder="Hostel" value={hostel} onChange={e=>setHostel(e.target.value)} />
              <input className="px-3 py-2 rounded bg-white/10" placeholder="Room No" value={room} onChange={e=>setRoom(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input className="px-3 py-2 rounded bg-white/10" placeholder="Parent Name" value={parentName} onChange={e=>setParentName(e.target.value)} />
              <input className="px-3 py-2 rounded bg-white/10" placeholder="Parent Email" value={parentEmail} onChange={e=>setParentEmail(e.target.value)} />
            </div>
            <button onClick={register} className="w-full mt-3 px-4 py-2 rounded bg-indigo-600/80">Create Account</button>
          </div>
        </div>
      )}

      {view === 'apply' && (
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h2 className="font-semibold mb-3">Apply Gate Pass</h2>
          <input className="w-full mb-2 px-3 py-2 rounded bg-white/10" placeholder="Reason" value={reason} onChange={e=>setReason(e.target.value)} />
          <div className="grid md:grid-cols-2 gap-2">
            <input className="px-3 py-2 rounded bg-white/10" type="datetime-local" value={fromDt} onChange={e=>setFromDt(e.target.value)} />
            <input className="px-3 py-2 rounded bg-white/10" type="datetime-local" value={toDt} onChange={e=>setToDt(e.target.value)} />
          </div>
          <input className="w-full mt-2 mb-3 px-3 py-2 rounded bg-white/10" placeholder="Destination" value={destination} onChange={e=>setDestination(e.target.value)} />
          <button onClick={apply} className="px-4 py-2 rounded bg-fuchsia-600/80">Submit Request</button>
        </div>
      )}

      {view === 'status' && (
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h2 className="font-semibold mb-3">Request Submitted</h2>
          <p className="text-white/70">Request ID: {requestId}</p>
          <div className="mt-4 flex gap-2">
            <button onClick={sendOtp} className="px-4 py-2 rounded bg-indigo-600/80">Send OTP to Parent</button>
            <a className="px-4 py-2 rounded bg-white/10" href={`/api/qr/generate/${requestId}`} target="_blank">QR (after approval)</a>
          </div>
        </div>
      )}
    </div>
  )
}
