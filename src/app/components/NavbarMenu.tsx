import Link from 'next/link';

type MenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const NavbarMenu = ({ isMenuOpen, toggleMenu }: MenuProps) => {
  return (
    <div
      className={`${
        isMenuOpen ? 'block' : 'hidden'
      } fixed bg-gray-800 text-white w-full flex justify-center text-center md:hidden mt-16`}
    >
      <div className="max-w-2xl mx-auto p-4">
        <Link legacyBehavior href="/">
          <a className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>
            Home
          </a>
        </Link>
        <Link legacyBehavior href="/about">
          <a className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>
            About Me
          </a>
        </Link>
        <Link legacyBehavior href="/skills">
          <a className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>
            My Skills
          </a>
        </Link>
        <Link legacyBehavior href="/experience">
          <a className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>
            My Experience
          </a>
        </Link>
        <Link legacyBehavior href="/projects">
          <a className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>
            My Projects
          </a>
        </Link>
        <Link legacyBehavior href="/contact">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Contact Me
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarMenu;
