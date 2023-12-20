import Head from 'next/head';
import Layout from '../components/RootLayout';
import Link from 'next/link';

export default function Skills() {
  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | My Skills</title>
      </Head>
      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto ">
          <p className="text-2xl font-bold mb-4 text-white">
            Placeholder title!
          </p>
          <p className="text-lg text-white ">
            Sorry! My website is still under active development.
            <br />
            In the meantime, please feel free to check out{' '}
            <Link href="/resume" className="text-blue-400 underline font-bold">
              my Résumé
            </Link>
            .
          </p>
        </div>
      </main>
    </Layout>
  );
}
