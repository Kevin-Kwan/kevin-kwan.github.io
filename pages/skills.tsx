import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/RootLayout';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | Skills</title>
      </Head>
      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-2xl font-bold mb-4">Welcome to my portfolio!</p>
          <p className="text-lg">
            Here&apos;s some sample text since my website is still under
            development.
          </p>
        </div>
      </main>
    </Layout>
  );
}
