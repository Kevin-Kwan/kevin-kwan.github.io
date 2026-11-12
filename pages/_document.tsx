import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Custom document — declares the page language for assistive technology
 * (the Pages Router default renders <html> with no lang attribute).
 */
function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
