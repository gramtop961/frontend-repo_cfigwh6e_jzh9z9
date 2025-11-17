import { useState } from 'react'

const api = () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Parent() {
  const [requestId, setRequestId] = useState('')
  const [otp, setOtp] = useState('')
  const [status, setStatus] = useState('')

  const verify = async () => {
    setStatus('Verifying...')
    const res = await fetch(`${api()}/api/verifyOTP`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ request_id: requestId, otp }) })
    const data = await res.json()
    setStatus(res.ok ? 'Verified. Warden can now approve.' : (data.detail || 'Failed'))
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold">Parent Approval</h1>
      <p className="text-white/60 mb-6">Enter the OTP you received to approve the request.</p>
      {status && <div className="mb-3 text-sm text-indigo-300">{status}</div>}
      <input className="w-full mb-2 px-3 py-2 rounded bg-white/10" placeholder="Request ID" value={requestId} onChange={e=>setRequestId(e.target.value)} />
      <input className="w-full mb-3 px-3 py-2 rounded bg-white/10 tracking-widest" placeholder="6-digit OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
      <button onClick={verify} className="w-full px-4 py-2 rounded bg-fuchsia-600/80">Verify OTP</button>
    </div>
  )
}
