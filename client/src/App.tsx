import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'

import Navbar from './layout/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import Dashboard from './admin/Dashboard'
import ManageProjects from './pages/projects/ManageProjects'
import ManageServices from './pages/services/ManageServices'
import SignIn from './pages/sign in/SignIn'
import SignUp from './pages/sign up/SignUp'

const App = () => {
  return (
    <ThemeProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Nested routes for dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="manage-projects" element={<ManageProjects />} />
          <Route path="manage-services" element={<ManageServices />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
