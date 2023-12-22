import Head from 'next/head';
import Layout from '../components/RootLayout';
import ProjectCard from '../components/ProjectCard';
import Link from 'next/link';

const github_pat = process.env.GITHUB_PAT;

async function getRepoDescription(githubRepoUrl: string) {
  const [, owner, repo] = new URL(githubRepoUrl).pathname.split('/');
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${github_pat}`,
        },
      }
    );
    const data = await response.json();
    return data.description;
  } catch (error) {
    console.error(`Error: ${error}`);
    return 'Error: Could not fetch GitHub Repository description. Please try again later.';
  }
}

const projectsWithDescriptions = [
  'CutieBot',
  'DarkCloud2Fishing',
  'portfolio-nextjs',
  'leetcode',
  'gsmst-LetsSurf',
];

const loadingMessage =
  'Fetching GitHub Repository Description... Please wait...';
// const projectsWithDescriptions = [''];
interface ProjectsProps {
  descriptions: { [key: string]: string };
}
export default function Projects({ descriptions }: ProjectsProps) {
  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | My Projects</title>
      </Head>
      <main className="flex-1 p-4">
        <p className="text-3xl font-bold mb-2 text-center ">Ongoing Projects</p>
        <div className="flex flex-wrap -mx-2">
          <ProjectCard
            name="Dark Cloud 2 Fishing Implementation"
            description={
              (descriptions['DarkCloud2Fishing'] || loadingMessage) +
              ' ' +
              'Written in C#.'
            }
            githubLink="https://github.com/Kevin-Kwan/DarkCloud2Fishing"
          />
          <ProjectCard
            name="CutieBot (Discord Bot Application)"
            description={descriptions['CutieBot'] || loadingMessage}
            githubLink="https://github.com/Kevin-Kwan/CutieBot"
          />
          <ProjectCard
            name="Software Engineer Portfolio Website"
            description={
              'This website I made with TypeScript! ' +
              (descriptions['portfolio-nextjs'] || loadingMessage)
            }
            githubLink="https://github.com/Kevin-Kwan/portfolio-nextjs"
            demoLink="/"
          />
          <ProjectCard
            name="My Personal LeetCode Solutions"
            description={descriptions['leetcode'] || loadingMessage}
            githubLink="https://github.com/Kevin-Kwan/leetcode"
            demoLink="https://leetcode.com/kevinkwan/"
            demoText="LeetCode Profile"
          />
        </div>
        <p className="text-3xl font-bold mb-2 text-center ">
          Completed Projects
        </p>
        <div className="flex flex-wrap -mx-2">
          <ProjectCard
            name="Dark Ascent (3D Platformer Game)"
            description={
              (descriptions['gsmst-LetsSurf'] || loadingMessage) +
              ' ' +
              'Written in C#.'
            }
            githubLink="https://github.com/Kevin-Kwan/Dark-Ascent/"
            demoLink="https://github.com/Kevin-Kwan/Dark-Ascent/releases"
            demoText="Releases"
          />
          <ProjectCard
            name="Let's Surf (3D Movement Game)"
            description={
              (descriptions['gsmst-LetsSurf'] || loadingMessage) +
              ' ' +
              'Written in C#.'
            }
            githubLink="https://github.com/Kevin-Kwan/gsmst-LetsSurf/"
            demoLink="https://github.com/Kevin-Kwan/gsmst-LetsSurf/releases"
            demoText="Releases"
          />
        </div>
        <p className="text-lg text-white text-center">
          Sorry! My website is still under active development.
          <br />
          In the meantime, please feel free to check out{' '}
          <Link href="/resume" className="text-blue-400 underline font-bold">
            my Résumé
          </Link>
          .
        </p>
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const descriptions: { [key: string]: string } = {};

  try {
    for (const project of projectsWithDescriptions) {
      const description = await getRepoDescription(
        `https://github.com/Kevin-Kwan/${project}`
      );
      descriptions[project] = description;
    }
  } catch (error) {
    console.error(`Error fetching descriptions: ${error}`);
  }

  return {
    props: {
      descriptions,
    },
  };
}
export const runtime = 'experimental-edge';
