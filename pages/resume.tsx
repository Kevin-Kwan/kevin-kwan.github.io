import React from 'react';
import Head from 'next/head';
import Layout from '../components/RootLayout';

export default function Resume() {
  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | Résumé</title>
      </Head>
      <main className="flex-1 p-4" style={{ height: '100vh' }}>
        <embed
          src={process.env.NEXT_PUBLIC_RESUME_LINK}
          type="application/pdf"
          style={{ width: '100%', height: '100%' }}
        />
      </main>
    </Layout>
  );
}
