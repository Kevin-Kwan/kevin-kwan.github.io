import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/RootLayout';
declare const AdobeDC: any;

export default function Resume() {
  useEffect(() => {
    // Check if the script has already been loaded
    if (
      document.querySelector(
        'script[src="https://acrobatservices.adobe.com/view-sdk/viewer.js"]'
      )
    ) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://acrobatservices.adobe.com/view-sdk/viewer.js';
    script.onload = () => {
      document.addEventListener('adobe_dc_view_sdk.ready', function () {
        var adobeDCView = new AdobeDC.View({
          clientId: process.env.NEXT_PUBLIC_ADOBE_CLIENT_ID,
          divId: 'adobe-dc-view',
        });
        adobeDCView.previewFile(
          {
            content: {
              location: {
                url: process.env.NEXT_PUBLIC_RESUME_LINK,
              },
            },
            metaData: { fileName: 'Kevin_Kwan_Resume_2024.pdf' },
          },
          {
            embedMode: 'FULL_WINDOW',
            defaultViewMode: 'FIT_PAGE',
            showAnnotationTools: true,
            showDownloadPDF: true,
          }
        );
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | Résumé</title>
      </Head>
      <main className="flex-1 p-4" style={{ height: '100vh' }}>
        <div id="adobe-dc-view"></div>
      </main>
    </Layout>
  );
}
