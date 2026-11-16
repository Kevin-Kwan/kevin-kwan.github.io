import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MotionConfig, motion } from 'motion/react';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '../styles/globals.css';
import RootLayout from '../components/RootLayout';
import { useMounted } from '../components/useMounted';
import { site } from '../content/site';

function App({ Component, pageProps, router }: AppProps) {
  // Page transitions keyed by route. The server-rendered / first-paint page
  // uses initial={false} — fully visible, no inline hidden styles in the
  // static export. Only client-side navigations (after mount) animate, and
  // they start at 85% opacity so content is never invisible mid-transition.
  const hasMounted = useMounted();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#09090B" />
        <meta name="author" content={site.name} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <MotionConfig reducedMotion="user">
        <RootLayout>
          <motion.div
            key={router.pathname}
            initial={hasMounted ? { opacity: 0.85, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </RootLayout>
      </MotionConfig>
    </>
  );
}

export default App;
