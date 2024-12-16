import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { IoSunnySharp } from 'react-icons/io5'
import { BsFillMoonStarsFill } from 'react-icons/bs'

const Navbar = () => {
  const { toggleTheme, theme } = useTheme()
  return (
    <header
      className={`fixed left-[7rem] right-[7rem] top-0 whitespace-nowrap z-[100]`}
    >
      <nav className="flex items-center justify-between mt-3 pb-8 px-10">
        <div className="flex items-center">
          <NavLink to={'/'} className="flex items-center font-bold text-2xl">
            Logo
          </NavLink>
        </div>

        <ul className="hidden lg:flex items-center justify-center gap-[50px] text-[14px] flex-1">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link opacity-100' : 'link opacity-50'
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link opacity-100' : 'link opacity-50'
            }
            to="/services"
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link opacity-100' : 'link opacity-50'
            }
            to="/projects"
          >
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link opacity-100' : 'link opacity-50'
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link opacity-100' : 'link opacity-50'
            }
            to="/contact"
          >
            Contact
          </NavLink>
        </ul>

        {/* Button Section */}
        <div className="hidden lg:flex items-center justify-center">
          <button
            onClick={toggleTheme}
            style={{ background: 'none', border: 'none' }}
          >
            {theme === 'light' && (
              <BsFillMoonStarsFill color="#000" size={22} />
            )}

            {theme === 'dark' && <IoSunnySharp color="#fff" size={24} />}
          </button>

          <NavLink className="btn-primary ml-6" to="/contact">
            Let's talk!
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
