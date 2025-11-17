import { useEffect, useState } from 'react'

const api = () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Admin() {
  const [logs, setLogs] = useState([])

  useEffect(() => { document.title = 'Admin | GatePass'; fetchLogs() }, [])

  const fetchLogs = async () => {
    const res = await fetch(`${api()}/api/logs`)
    const data = await res.json()
    setLogs(data.logs || [])
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-white/60 mb-6">Review recent security scans.</p>

      <div className="rounded-xl overflow-hidden border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/10">
            <tr>
              <th className="text-left p-3">Time</th>
              <th className="text-left p-3">Request</th>
              <th className="text-left p-3">Student</th>
              <th className="text-left p-3">Action</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l._id} className="border-t border-white/10">
                <td className="p-3">{new Date(l.created_at).toLocaleString()}</td>
                <td className="p-3">{l.request_id}</td>
                <td className="p-3">{l.student_id}</td>
                <td className="p-3">{l.action}</td>
                <td className="p-3">{l.status_at_scan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
