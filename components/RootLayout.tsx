import React from 'react';
import { Inter } from 'next/font/google';
import Navbar from './Navbar';
import NavbarMenu from './NavbarMenu';
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <NavbarMenu />
        {children}
        <Footer />
      </div>
    </div>
  );
}
