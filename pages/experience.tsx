import Head from 'next/head';
import Layout from '../components/RootLayout';
import Link from 'next/link';

export default function Experience() {
  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | Work Experience</title>
      </Head>
      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-white text-2xl font-bold mb-4">
            Placeholder title!
          </p>
          <p className="text-white text-lg">
            Sorry! My website is still under active development.
            <br />
            In the meantime, please feel free to check out{' '}
            <Link href="/resume" className="text-blue-400 underline font-bold">
              my Résumé
            </Link>
            .
          </p>
          {/* probably make sections for each experience, maybe flex? */}
        </div>
      </main>
    </Layout>
  );
}
