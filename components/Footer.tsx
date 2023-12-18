import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <p className="text-center">
          &copy; 2023 -{' '}
          <Link legacyBehavior href="/">
            <a className="text-blue-500 hover:underline">Kevin Kwan</a>
          </Link>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
