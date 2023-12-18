import { motion } from "framer-motion";
import Link from "next/link";

type MenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const NavbarMenu = ({ isMenuOpen, toggleMenu }: MenuProps) => {
  return (
    <motion.div
      style={{ zIndex: 5, backgroundColor: "#171F29" }}
      className={`${
        isMenuOpen ? "block" : "hidden"
      } fixed text-white w-full flex justify-center text-center md:hidden mt-16`}
      initial={{ y: "-100vh" }}
      animate={{ y: isMenuOpen ? "0" : "-100vh" }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-xl">
        <Link legacyBehavior href="/about">
          <a
            className="block py-2 px-4 hover:bg-gray-700 duration-200 hover:text-blue-500"
            onClick={toggleMenu}
          >
            About Me
          </a>
        </Link>
        <Link legacyBehavior href="/skills">
          <a
            className="block py-2 px-4 hover:bg-gray-700 duration-200 hover:text-blue-500"
            onClick={toggleMenu}
          >
            My Skills
          </a>
        </Link>
        <Link legacyBehavior href="/experience">
          <a
            className="block py-2 px-4 hover:bg-gray-700 duration-200 hover:text-blue-500"
            onClick={toggleMenu}
          >
            My Experience
          </a>
        </Link>
        <Link legacyBehavior href="/projects">
          <a
            className="block py-2 px-4 hover:bg-gray-700 duration-200 hover:text-blue-500"
            onClick={toggleMenu}
          >
            My Projects
          </a>
        </Link>
        <Link legacyBehavior href="/contact">
          <div className="pb-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-200">
              Contact Me
            </button>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default NavbarMenu;
