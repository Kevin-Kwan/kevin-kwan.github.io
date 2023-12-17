import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/RootLayout';
import Navbar from '../components/Navbar';
import NavbarMenu from '../components/NavbarMenu';
import Footer from '../components/Footer';

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <NavbarMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <main className="flex-1 p-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-2xl font-bold mb-4">My Skills</p>
            <p className="text-lg">
              Here&apos;s some sample text since my website is still under
              development.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </Layout>
  );
}
