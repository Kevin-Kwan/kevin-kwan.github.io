import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { navLinks, site, socials } from '../content/site';
import Waveform from './Waveform';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-base">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-base font-semibold tracking-tight text-zinc-50">
              Kevin Kwan
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Software Engineer II at GEICO — conversational AI &amp; IVR.
              Georgia Tech B.S. Computer Science, summa cum laude.
            </p>
            <Waveform className="mt-5 h-6 w-44 opacity-70" />
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Explore
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Connect
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-md border border-white/10 bg-white/[0.04] p-2.5 text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
              >
                <FaGithub className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-md border border-white/10 bg-white/[0.04] p-2.5 text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
              >
                <FaLinkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/5 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kevin Kwan. All rights reserved.</p>
          <p>
            Built with Next.js, TypeScript &amp; Tailwind CSS ·{' '}
            <a
              href={site.sourceRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-200"
            >
              View source on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
