import Head from 'next/head';
import Layout from '../components/RootLayout';
import Link from 'next/link';
import Image from 'next/image';
import TechLogo from '../components/TechLogo';

export default function Skills() {
  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | My Skills</title>
      </Head>
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto ">
          <p className="text-3xl font-bold mb-4 text-white text-center">
            My Skills
          </p>
          <p className="text-1xl text-white ">
            Here, you'll find a comprehensive and ever-growing list of the
            technologies I've worked with. Each logo represents a different
            technology that I've used in my projects and my professional work.
            My experience spans across various domains, whether it's front-end
            or back-end development, databases, or deployment.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8 bg-blue-100 rounded-lg p-4">
            <TechLogo
              href="https://git-scm.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1280px-Git-logo.svg.png"
              alt="Git"
            />
            <TechLogo
              href="https://python.org"
              src="https://seeklogo.com/images/P/python-logo-C50EED1930-seeklogo.com.png"
              alt="Python"
            />
            <TechLogo
              href="https://www.java.com"
              src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo.png"
              alt="Java"
            />
            <TechLogo
              href="https://dotnet.microsoft.com/en-us/languages/csharp"
              src="https://www.cdnlogo.com/logos/c/27/c.svg"
              alt="C#"
            />
            <TechLogo
              href="https://unity.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Unity_2021.svg/1200px-Unity_2021.svg.png"
              alt="Unity"
            />
            <TechLogo
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png"
              alt="JavaScript"
            />
            <TechLogo
              href="https://www.typescriptlang.org/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png"
              alt="TypeScript"
            />
            <TechLogo
              href="https://nodejs.org/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png"
              alt="Node.js"
            />
            <TechLogo
              href="https://www.mongodb.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/1280px-MongoDB_Logo.svg.png"
              alt="MongoDB"
            />
            <TechLogo
              href="https://www.cloudflare.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cloudflare_Logo.svg/2560px-Cloudflare_Logo.svg.png"
              alt="Cloudflare"
            />
            <TechLogo
              href="https://react.dev/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"
              alt="React"
            />
            <TechLogo
              href="https://nextjs.org/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/394px-Nextjs-logo.svg.png"
              alt="Next.js"
            />
            <TechLogo
              href="https://tailwindcss.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tailwind_CSS_logo.svg/2560px-Tailwind_CSS_logo.svg.png"
              alt="Tailwind CSS"
            />
            <TechLogo
              href="https://heroku.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Heroku_logo.svg/2560px-Heroku_logo.svg.png"
              alt="Heroku"
            />
            <TechLogo
              href="https://www.google.com/cloud/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/1280px-Google_Cloud_logo.svg.png"
              alt="Google Cloud Platform"
            />
            <TechLogo
              href="https://azure.microsoft.com/en-us/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/2560px-Microsoft_Azure_Logo.svg.png"
              alt="Microsoft Azure"
            />
            <TechLogo
              href="https://matlab.mathworks.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/800px-Matlab_Logo.png"
              alt="MATLAB"
            />
            <TechLogo
              href="https://www.lua.org/"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Lua-Logo.svg"
              alt="Lua"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
