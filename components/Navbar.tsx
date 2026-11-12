import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { navLinks, resumeUrl, site, socials } from '../content/site';
import ScrollProgress from './ScrollProgress';

function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes (React's endorsed
  // "adjust state during render" pattern instead of an effect).
  const [lastPathname, setLastPathname] = useState(router.pathname);
  if (router.pathname !== lastPathname) {
    setLastPathname(router.pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-base/80 backdrop-blur-md">
      <ScrollProgress />
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md"
          aria-label="Kevin Kwan — home"
        >
          <Image
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            className="rounded-md"
            priority
          />
          <span className="text-[15px] font-semibold tracking-tight text-zinc-50">
            Kevin Kwan
          </span>
        </Link>

        <ul className="ml-6 hidden items-center gap-1 md:flex">
          {navLinks.slice(1, -1).map((link) => {
            const active = router.pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                    active
                      ? 'font-medium text-zinc-50'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-1.5">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden rounded-md p-2.5 text-zinc-400 transition-colors duration-200 hover:text-zinc-50 md:block"
          >
            <FaGithub className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden rounded-md p-2.5 text-zinc-400 transition-colors duration-200 hover:text-zinc-50 md:block"
          >
            <FaLinkedin className="h-5 w-5" aria-hidden="true" />
          </a>
          <Link
            href="/contact"
            aria-current={router.pathname === '/contact' ? 'page' : undefined}
            className="ml-1 hidden rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 md:inline-flex"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="rounded-md p-3 text-zinc-200 transition-colors hover:text-white md:hidden"
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-white/10 bg-base/95 px-4 pb-5 pt-2 backdrop-blur-md md:hidden"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const active = router.pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-lg px-3 py-2.5 text-base transition-colors ${
                      active
                        ? 'bg-white/[0.06] font-medium text-zinc-50'
                        : 'text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={resumeUrl}
            download={site.resumeFileName}
            className="mt-3 block rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-base font-medium text-zinc-100"
          >
            Download Résumé (PDF)
          </a>
          <div className="mt-2 flex items-center gap-2 px-1 pt-1">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-50"
            >
              <FaGithub className="h-5 w-5" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-50"
            >
              <FaLinkedin className="h-5 w-5" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
