import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Projects from './pages/projects/Projects'
import Services from './pages/services/Services'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Navbar from './layout/Navbar'
import { ThemeProvider } from './context/ThemeContext'

const App = () => {
  return (
    <ThemeProvider>
      <Navbar />
      {/* 3D Experience */}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
