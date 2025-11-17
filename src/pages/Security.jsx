import { useState } from 'react'

const api = () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Security() {
  const [requestId, setRequestId] = useState('')
  const [result, setResult] = useState(null)

  const scan = async (action) => {
    const res = await fetch(`${api()}/api/security/scan`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ request_id: requestId, action }) })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold">Security Scanner</h1>
      <p className="text-white/60 mb-6">Enter a request ID or scan a QR payload to verify.</p>

      <div className="p-5 rounded-xl bg-white/5 border border-white/10">
        <input className="w-full mb-2 px-3 py-2 rounded bg-white/10" placeholder="Request ID" value={requestId} onChange={e=>setRequestId(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={() => scan('scan_entry')} className="px-4 py-2 rounded bg-green-600/80">Scan Entry</button>
          <button onClick={() => scan('scan_exit')} className="px-4 py-2 rounded bg-red-600/80">Scan Exit</button>
          <button onClick={() => scan('scan_status')} className="px-4 py-2 rounded bg-indigo-600/80">Check Status</button>
        </div>
        {result && (
          <div className="mt-4 text-sm">
            <p>Status: <span className={result.valid ? 'text-green-300' : 'text-red-300'}>{String(result.valid)}</span></p>
            <p>Server says: <span className="text-white/80">{result.status}</span></p>
          </div>
        )}
      </div>
    </div>
  )
}
