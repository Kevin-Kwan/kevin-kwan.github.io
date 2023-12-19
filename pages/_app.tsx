import './globals.scss';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { AnimatePresence } from 'framer-motion';
import { useRouter, NextRouter } from 'next/router';
import Head from 'next/head';
import StarBackground from '../components/StarBackground';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();

  return (
    <main className={inter.className}>
      <StarBackground />
      <AnimatePresence mode="wait">
        <div key={router.pathname} className="font-inter">
          <Head>
            <meta
              name="keywords"
              content="Kevin Kwan, Software Engineering, Portfolio, Software Engineering Portfolio, Kevin, Georgia Tech, Georgia Institute of Technology, Georgia, Tech, Institute, Technology, Computer Science, Computer, Science, Computer Engineering, Computer, Engineering, Software, Engineering, Software Engineer, Software, Engineer, Software Developer, Software, Developer, Developer, Software Development, Software, Development, Development, Full Stack, Full, Stack, Full Stack Developer, Full, Stack, Developer, Full Stack Development, Full, Stack, Development, Front End, Front, End, Front End Developer, Front, End, Developer, Front End Development, Front, End, Development, Back End, Back, End, Back End Developer, Back, End, Developer, Back End Development, Back, End, Development, Web, Web Developer, Web, Developer, Web Development, Web, Development, Web Engineer, Web, Engineer, Web Engineering, Web, Engineering, Web Developer, Web, Developer, Web Development, Web, Development, Web Development Engineer, Web, Development, Engineer, Web Development Engineering, Web, Development, Engineering, Software Engineer, Software, Engineer, Software Engineering, Software, Engineering, Software Development, Software, Development, Software Development Engineer, Software, Development, Engineer, Software Development Engineering, Software, Development, Engineering, Software Engineering, Software, Engineering, Software Engineering Portfolio, Software, Engineering, Portfolio, Software Engineering Portfolio, Software, Engineering, Portfolio, Kevin Kwan, Kevin, Kwan, Kevin Kwan Portfolio, Kevin, Kwan, Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software, Engineering, Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software Engineering Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software, Engineering, Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software Engineering Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software, Engineering, Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software Engineering Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software, Engineering, Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software Engineering Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software, Engineering, Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software Engineering Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software, Engineering, Portfolio, Kevin Kwan Software Engineering Portfolio, Kevin, Kwan, Software Engineering Portfolio, Kevin Kwan Software"
            />
            <meta name="author" content="Kevin Kwan" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              property="og:title"
              content="Kevin Kwan | Software Engineering Portfolio"
            />
            <meta
              property="og:description"
              content="A custom-made portfolio website made by Kevin Kwan, a talented, entry-level software engineer based in Atlanta, Georgia, to showcase his skills, experience, projects, and more."
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://kevin-kwan.tech" />
            <meta property="og:image" content="/logo.png" />
            <meta property="og:image:width" content="448" />
            <meta property="og:image:height" content="448" />
          </Head>
          <Component {...pageProps} />
        </div>
      </AnimatePresence>
    </main>
  );
}
export default App;
