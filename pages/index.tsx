import { use, useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Container } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';
import Head from 'next/head';
import Layout from '../components/RootLayout';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [init, setInit] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container: Container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#ffffff',
        },
        links: {
          color: '#ffffff',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | Home</title>
      </Head>
      <div id="container">
        <main className="flex-1 p-4">
          <div id="tsparticles" className="w-full h-screen relative">
            {init && (
              <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
              />
            )}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 max-w-2xl mx-auto">
              <p className="text-2xl font-bold mb-4">
                Welcome to my portfolio!
              </p>
              <p className="text-lg">
                Here&apos;s some sample text since my website is still under
                development. This site is built with Next.js and Tailwind CSS by
                me with love.
              </p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto h-screen">
            <p className="text-2xl font-bold mb-4">About Me</p>
            <p className="text-lg">
              This is the about me section. You can put more information about
              yourself here.
            </p>
          </div>
        </main>
      </div>
    </Layout>
  );
}
