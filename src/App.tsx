import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Services from "./pages/services/Services";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Navbar from "./layout/Navbar";
import Dashboard from "./admin/Dashboard";
import ManageProjects from "./admin/ManageProjects";
import ManageServices from "./admin/ManageServices";
import SignIn from "./pages/sign in/SignIn";
import SignUp from "./pages/sign up/SignUp";
import Footer from "./layout/Footer";

import { ThemeProvider } from "./context/ThemeContext";


const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Nested routes for dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="manage-projects" element={<ManageProjects />} />
          <Route path="manage-services" element={<ManageServices />} />
        </Route>
      </Routes>
      <Footer />
    </ThemeProvider>
=======
    </>

  );
};

export default App;
