import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

function NotFoundPage() {
  const router = useRouter();

  const handleBackClick = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="absolute inset-0 flex items-center justify-center text-center">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-2 text-lg">Page Not Found</p>
        <p className="mt-2">
          Looks like you&apos;ve followed a broken link or entered a URL that
          doesn&apos;t exist on this site.
        </p>
        <button
          onClick={handleBackClick}
          className="mt-4 w-64 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Back to our site
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
