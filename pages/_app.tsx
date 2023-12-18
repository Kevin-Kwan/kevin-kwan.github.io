import './globals.scss';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { AnimatePresence } from 'framer-motion';
import { useRouter, NextRouter } from 'next/router';

function App({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();

  return (
    <AnimatePresence mode="wait">
      <div key={router.pathname} className="font-inter">
        <Component {...pageProps} />
      </div>
    </AnimatePresence>
  );
}
export default App;
