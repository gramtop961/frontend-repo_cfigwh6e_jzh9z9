import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Landing from './components/Landing'
import Student from './pages/Student'
import Parent from './pages/Parent'
import Warden from './pages/Warden'
import Security from './pages/Security'
import Admin from './pages/Admin'
import './index.css'

function App() {
  useEffect(() => {
    document.title = 'Hostel GatePass System'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#141a33] to-[#1a1030] text-white">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-wide text-white/90">
            Hostel GatePass System
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20" to="/student">Student</Link>
            <Link className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20" to="/parent">Parent</Link>
            <Link className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20" to="/warden">Warden</Link>
            <Link className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20" to="/security">Security</Link>
            <Link className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20" to="/admin">Admin</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student" element={<Student />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/warden" element={<Warden />} />
        <Route path="/security" element={<Security />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <footer className="border-t border-white/10 text-white/50 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <p>Smart, Secure & Seamless</p>
          <a className="hover:text-white/80" href="/test">System Check</a>
        </div>
      </footer>
    </div>
  )
}

export default App
