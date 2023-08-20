'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import NavbarMenu from './components/NavbarMenu';
import Footer from './components/Footer';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavbarMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-2xl font-bold mb-4">Welcome to my portfolio!</p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt, lorem vel bibendum bibendum, elit sapien bibendum sapien,
            vel bibendum sapien sapien vel sapien.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
