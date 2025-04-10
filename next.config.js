/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'i.redd.it' },
      { hostname: 'github.com' },
      { hostname: 'careers.publicissapient.com' },
      { hostname: 'media.licdn.com' },
      { hostname: 'encrypted-tbn0.gstatic.com' },
      { hostname: '1000logos.net' },
      { hostname: 'upload.wikimedia.org' },
      { hostname: 'www.cdnlogo.com' },
      { hostname: 'cdn4.iconfinder.com' },
      { hostname: 'brand.gatech.edu' },
      { hostname: 'gwinnetttech.edu' },
      { hostname: '1526789230-files.gitbook.io' },
      { hostname: 'asset.brandfetch.io' },
    ],
  },
};

module.exports = nextConfig;
