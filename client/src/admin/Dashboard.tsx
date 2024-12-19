import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Layout from '../layout/Layout'
import {
  FaBars,
  FaTachometerAlt,
  FaProjectDiagram,
  FaServicestack,
} from 'react-icons/fa'

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <Layout>
      <main className="min-h-screen w-full flex ">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'w-60' : 'w-16'
          } transition-width duration-300 h-screen relative flex flex-col items-start p-4`}
        >
          <button
            onClick={toggleSidebar}
            className="text-2xl mb-6 text-black dark:text-white focus:outline-none"
          >
            <FaBars />
          </button>
          <nav className="flex flex-col items-start gap-6 w-full ">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-4 text-[17px] hover:cursor-pointer bg-[#7127ba] font-medium w-full py-2 px-2 rounded-md text-white'
                  : 'flex items-center gap-4 text-[17px] hover:cursor-pointer w-full py-2 px-2 font-medium'
              }
              to={'manage-projects'}
            >
              <FaProjectDiagram />
              {isSidebarOpen && 'Manage Projects'}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-4 text-[17px] hover:cursor-pointer bg-[#7127ba] font-medium w-full py-2 px-2 rounded-md text-white'
                  : 'flex items-center gap-4 text-[17px] hover:cursor-pointer w-full py-2 px-2 font-medium'
              }
              to={'manage-services'}
            >
              <FaServicestack />
              {isSidebarOpen && 'Manage Services'}
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-6">
          <div>
            <Outlet />
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default Dashboard
