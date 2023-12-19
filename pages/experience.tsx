import Head from 'next/head';
import Layout from '../components/RootLayout';

export default function Experience() {
  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | Experience</title>
      </Head>
      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-2xl font-bold mb-4">Placeholder title!</p>
          <p className="text-lg">
            Here&apos;s some sample text since my website is still under
            development.
          </p>
          {/* probably make sections for each experience, maybe flex? */}
        </div>
      </main>
    </Layout>
  );
}
