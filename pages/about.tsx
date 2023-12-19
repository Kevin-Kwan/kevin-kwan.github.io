import Head from 'next/head';
import Layout from '../components/RootLayout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | About Me</title>
      </Head>
      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-2xl font-bold mb-4">A Little About Me!</p>
          <p className="text-lg">
            Here&apos;s some sample text since my website is still under
            development.
            {/* talk about education, hobbies, etc. */}
          </p>
        </div>
      </main>
    </Layout>
  );
}
