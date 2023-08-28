'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import NavbarMenu from '../components/NavbarMenu';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavbarMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main className="flex-1 p-4">
        <p className="text-2xl font-bold mb-4 text-center">My Projects</p>
        <div className="flex flex-wrap -mx-2">
          <ProjectCard
            name="Project 1"
            date="2021-01-01"
            imageSrc="https://picsum.photos/seed/picsum/200/300"
            onClick={() => {}}
          />
          <ProjectCard
            name="Project 1"
            date="2021-01-01"
            imageSrc="https://picsum.photos/seed/picsum/200/300"
            onClick={() => {}}
          />
          <ProjectCard
            name="Project 1"
            date="2021-01-01"
            imageSrc="https://picsum.photos/seed/picsum/200/300"
            onClick={() => {}}
          />
          <ProjectCard
            name="Project 1"
            date="2021-01-01"
            imageSrc="https://picsum.photos/seed/picsum/200/300"
            onClick={() => {}}
          />
        </div>
        <p className="text-lg">
          Here&apos;s some sample text since my website is still under
          development.
        </p>
      </main>
      <Footer />
    </div>
  );
}
