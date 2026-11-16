import Link from 'next/link';
import Seo from '../components/Seo';
import Waveform from '../components/Waveform';

function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found | Kevin Kwan"
        description="The page you are looking for does not exist on Kevin Kwan's portfolio."
        path="/404"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-28 text-center sm:px-6">
        <Waveform className="h-8 w-52 opacity-80" />
        <p className="text-gradient mt-10 font-mono text-7xl font-bold tracking-tight sm:text-8xl">
          404
        </p>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-50">
          Page not found
        </h1>
        <p className="mt-3 max-w-md leading-relaxed text-zinc-400">
          Looks like you&apos;ve followed a broken link or entered a URL that
          doesn&apos;t exist on this site.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
        >
          Back to the home page
        </Link>
      </div>
    </>
  );
}

export default NotFoundPage;
