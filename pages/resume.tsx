import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/RootLayout';
import { useMediaQuery } from 'react-responsive';

declare global {
  interface Window {
    AdobeDC: any;
    adobe_dc_sdk: any;
    adobe_dc_view_sdk: any;
  }
}
interface ResumeProps {
  adobeClientId: string;
}

export default function Resume({ adobeClientId }: ResumeProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 846px)' });
  useEffect(() => {
    function initializeAdobeDCView() {
      var adobeDCView = new window.AdobeDC.View({
        clientId: adobeClientId,
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
          showFullScreen: true,
          showAnnotationTools: false,
          showZoomControl: true,
          focusOnRendering: true,
          showDownloadPDF: true,
        }
      );
    }

    function loadViewerScript() {
      if (window.AdobeDC?.View) {
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
  }, [adobeClientId]);

  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | Résumé</title>
      </Head>
      <main
        className="flex-1 p-4 flex flex-col items-center justify-center"
        style={{ height: '100vh' }}
      >
        <p className="text-white text-2xl font-bold mb-4 text-center">
          {isMobile
            ? 'It seems like you are on a mobile device! For a better experience, we recommend that you please '
            : 'If you have troubles viewing the PDF, you can '}
          <a
            href={process.env.NEXT_PUBLIC_RESUME_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            click here to view/download it
          </a>
          .
        </p>
        {!isMobile && <div id="adobe-dc-view" className="max-w-5xl mx-auto" />}
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const adobeClientId = process.env.ADOBE_CLIENT_ID;

  return {
    props: {
      adobeClientId,
    },
  };
}
export const runtime = 'experimental-edge';
