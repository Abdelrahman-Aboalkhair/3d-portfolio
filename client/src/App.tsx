import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Projects from './pages/projects/Projects'
import Services from './pages/services/Services'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'

const App = () => {
  return (
    <>
      {/* 3D Experience */}
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [1, 2, 6],
        }}
      >
        <Experience />
      </Canvas>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
