import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/RootLayout';
declare global {
  interface Window {
    AdobeDC: any;
    adobe_dc_sdk: any;
    adobe_dc_view_sdk: any;
  }
}

export default function Resume() {
  useEffect(() => {
    function initializeAdobeDCView() {
      var adobeDCView = new window.AdobeDC.View({
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
          defaultViewMode: 'FIT_WIDTH',
          showFullScreen: true,
          showAnnotationTools: false,
          showZoomControl: true,
          focusOnRendering: true,
          showDownloadPDF: true,
        }
      );
    }

    function loadViewerScript() {
      if (window.AdobeDC && window.AdobeDC.View) {
        setTimeout(initializeAdobeDCView, 100); // Delay the call to ensure the SDK is loaded
      } else {
        var viewerScript = document.createElement('script');
        viewerScript.src =
          'https://acrobatservices.adobe.com/view-sdk/viewer.js';
        viewerScript.onload = function () {
          setTimeout(initializeAdobeDCView, 100); // Delay the call to ensure the SDK is loaded
        };
        document.body.appendChild(viewerScript);
      }
    }

    loadViewerScript();

    return () => {
      window.AdobeDC = undefined;
      window.adobe_dc_sdk = undefined;
      window.adobe_dc_view_sdk = undefined;
    };
  }, []);

  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | Résumé</title>
      </Head>
      <main className="flex-1 p-4" style={{ height: '100vh' }}>
        <p className="text-white text-lg font-bold mb-4 text-center">
          If you have troubles viewing the PDF, you can{' '}
          <a
            href={process.env.NEXT_PUBLIC_RESUME_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            click here to download it
          </a>
          .
        </p>
        <div id="adobe-dc-view"></div>
      </main>
    </Layout>
  );
}
