import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import { gsap } from 'gsap'

const images = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
]

function Landing() {
  const mountRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const sizes = { width: mountRef.current.clientWidth, height: 520 }
    const scene = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0, 0, 10)
    scene.add(camera)

    const geometry = new THREE.PlaneGeometry(3.2, 2.0, 32, 32)

    const loader = new THREE.TextureLoader()
    const meshes = images.map((url, i) => {
      const mat = new THREE.MeshStandardMaterial({ map: loader.load(url), transparent: true })
      const mesh = new THREE.Mesh(geometry, mat)
      mesh.position.x = (i - 1.5) * 3.6
      mesh.position.y = (Math.random() - 0.5) * 0.8
      mesh.rotation.z = (Math.random() - 0.5) * 0.3
      mesh.userData.index = i
      scene.add(mesh)
      return mesh
    })

    const light1 = new THREE.PointLight('#7c3aed', 6, 30)
    light1.position.set(5, 5, 5)
    scene.add(light1)
    const light2 = new THREE.PointLight('#60a5fa', 6, 30)
    light2.position.set(-5, -4, 5)
    scene.add(light2)

    const bgGeo = new THREE.SphereGeometry(40, 64, 64)
    const bgMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#0b1020'), side: THREE.BackSide })
    const bg = new THREE.Mesh(bgGeo, bgMat)
    scene.add(bg)

    const clock = new THREE.Clock()
    const animate = () => {
      const t = clock.getElapsedTime()
      meshes.forEach((m, idx) => {
        m.position.y += Math.sin(t + idx) * 0.001
        m.rotation.y = Math.sin(t * 0.2 + idx) * 0.2
      })
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      sizes.width = mountRef.current.clientWidth
      renderer.setSize(sizes.width, sizes.height)
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.7
      const y = (e.clientY / window.innerHeight - 0.5) * 0.4
      gsap.to(camera.position, { x, y: -y, duration: 0.6, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div>
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-purple-900/60 to-fuchsia-900/60" />
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-10 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hostel GatePass System — <span className="text-fuchsia-300">Smart</span>, <span className="text-indigo-300">Secure</span> & <span className="text-purple-300">Seamless</span>
          </h1>
          <p className="mt-5 text-white/70 max-w-2xl">
            Apply, approve, and validate gate passes with OTP verification, QR-based security, and real-time logs.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link to="/student" className="px-5 py-2.5 rounded-lg bg-fuchsia-600/80 hover:bg-fuchsia-600 shadow-lg shadow-fuchsia-600/25">Apply for Pass</Link>
            <a href="#preview" className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20">Try Demo</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4" id="preview">
          <div ref={mountRef} className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md" />
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-4 gap-6">
        {[
          { title: 'OTP-based parent approval', desc: 'Auto email OTP, hashed storage, expiry & attempt limits.' },
          { title: 'Warden dashboard', desc: 'Approve or reject with one click and instant QR generation.' },
          { title: 'QR validation at gate', desc: 'Security scans QR and sees live status from the server.' },
          { title: 'Real-time logs', desc: 'Track scans and actions with timestamps for audit.' },
        ].map((f, i) => (
          <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-white/70 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Landing
