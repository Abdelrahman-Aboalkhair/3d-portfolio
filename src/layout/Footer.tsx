import { BsGithub, BsLinkedin, BsMailbox } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 md:px-20 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-lg font-semibold text-white">
          © 2025 Abdelrahman. All rights reserved.
        </div>

        {/* Navigation */}
        <div className="flex gap-6 text-sm">
          <a href="#about" className="hover:text-white transition">
            About
          </a>
          <a href="#projects" className="hover:text-white transition">
            Projects
          </a>
          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub className="w-5 h-5 hover:text-white transition" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin className="w-5 h-5 hover:text-white transition" />
          </a>
          <a href="mailto:youremail@example.com">
            <BsMailbox className="w-5 h-5 hover:text-white transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
