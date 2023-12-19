import React, { useState } from 'react';
import Navbar from './Navbar';
import NavbarMenu from './NavbarMenu';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
        }}
        transition={{ duration: 1 }}
      >
        <StarBackground />
      </motion.div> */}
      <div className="flex flex-col min-h-screen">
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <NavbarMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: {
                opacity: 0,
              },
              pageAnimate: {
                opacity: 1,
              },
            }}
            transition={{ duration: 1 }}
            className="flex-grow"
          >
            {children}
          </motion.div>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}
