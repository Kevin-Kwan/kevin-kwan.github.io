import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      className="text-white p-4"
      style={{
        background: 'linear-gradient(to right, #171F29, #3F4C6B, #171F29)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        <p className="text-center ">
          Custom Made by{' '}
          <Link legacyBehavior href="/">
            <a className="text-blue-500 hover:underline">Kevin Kwan</a>
          </Link>{' '}
          using{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Next.js
          </a>{' '}
          &{' '}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Tailwind CSS
          </a>{' '}
          with love ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
