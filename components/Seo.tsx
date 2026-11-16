import Head from 'next/head';
import { site } from '../content/site';

interface SeoProps {
  title: string;
  description: string;
  /** Route path beginning with '/', e.g. '/experience'. */
  path: string;
}

function Seo({ title, description, path }: SeoProps) {
  const canonical = `${site.siteUrl}${path === '/' ? '/' : `${path}/`}`;
  const ogImage = `${site.siteUrl}${site.ogImage}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}

export default Seo;
