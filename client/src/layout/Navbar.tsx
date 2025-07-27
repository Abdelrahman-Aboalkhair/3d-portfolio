import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { IoSunnySharp } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useAppSelector } from "../hooks/useAppSelector";

const Navbar = () => {
  const { toggleTheme, theme } = useTheme();
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  console.log("isAdmin: ", isAdmin);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn: ", isLoggedIn);
  return (
    <header className="px-[10.4%] py-5 flex items-center justify-center">
      <nav className="flex items-center justify-center gap-[5rem] text-[14px] flex-1 capitalize font-medium">
        <NavLink to="/" className="font-extrabold uppercase text-[27px]">
          A<span className="text-primary ml-[2px]">.</span>
        </NavLink>

        <ul className="flex items-center justify-center gap-[3.5rem] w-[30%] flex-1">
          <NavLink
            className={({ isActive }) =>
              isActive ? "link opacity-100" : "link opacity-50"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link opacity-100" : "link opacity-50"
            }
            to="/projects"
          >
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link opacity-100" : "link opacity-50"
            }
            to="/services"
          >
            Services
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "link opacity-100" : "link opacity-50"
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
            className="border-[1px] border-gray-300 dark:border-gray-700 rounded-full p-[10px]"
          >
            {theme === "light" && (
              <BsFillMoonStarsFill color="#000" size={18} />
            )}

            {theme === "dark" && <IoSunnySharp color="#fff" size={20} />}
          </button>

          {isLoggedIn && !isAdmin && (
            <NavLink className="btn-primary ml-6" to="/contact">
              Let's Talk!
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
