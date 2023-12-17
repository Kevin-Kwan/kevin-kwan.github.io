import '../globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useRouter, NextRouter } from 'next/router'; // Import the NextRouter type

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter(); // Specify the type for the router object

  return (
    <div key={router.pathname} className="font-inter">
      <Component {...pageProps} />
    </div>
  );
}
export default App;
