import Link from 'next/link';

function Footer() {
  return (
    <footer
      className="text-white p-2 sm:p-3"
      style={{
        background: 'linear-gradient(to right, #171F29, #3F4C6B, #171F29)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-sm sm:text-base">
          <Link
            legacyBehavior
            href="https://github.com/Kevin-Kwan/portfolio-nextjs"
          >
            <a className="text-blue-300 hover:underline transition-colors ease-in-out hover:text-blue-500">
              Custom Made by Kevin Kwan
            </a>
          </Link>{' '}
          using{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline transition-colors ease-in-out hover:text-blue-500"
          >
            Next.js
          </a>{' '}
          &{' '}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline transition-colors ease-in-out hover:text-blue-500"
          >
            Tailwind CSS
          </a>{' '}
          with love ❤️
        </p>
      </div>
    </footer>
  );
}

export default Footer;
