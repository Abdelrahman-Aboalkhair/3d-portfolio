import { BsGithub, BsLinkedin, BsMailbox } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className=" text-gray-300 py-8 px-4 md:px-20 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-md text-white">
          © 2025 Abdelrahman. All rights reserved.
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
