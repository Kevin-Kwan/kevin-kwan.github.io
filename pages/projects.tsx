import { Suspense } from 'react';
import Head from 'next/head';
import Layout from '../components/RootLayout';
import ProjectCard from '../components/ProjectCard';

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
  'eduNFT',
  'gsmst-TriggeringInsanityGame',
  'gsmst-Noneuclidean-World',
  'gsmst-ArkanoidGame',
  'WindowsXPWebsite',
  'gsmst-EvadeAndDeceive',
  'fixed_pytorch_mpiigaze_demo',
  'Dark-Ascent',
];

const loadingMessage =
  'Fetching GitHub Repository Description... Please wait...';
// const projectsWithDescriptions = [''];

function LoadingCard() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
    </div>
  );
}
interface ProjectsProps {
  descriptions: { [key: string]: string };
}
export default function Projects({ descriptions }: ProjectsProps) {
  // const isLoading = Object.values(descriptions).includes(loadingMessage);
  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | My Projects</title>
      </Head>
      <main className="flex-1 p-4">
        <p className="text-3xl font-bold mb-2 text-center text-green-200 underline">
          Ongoing Projects
        </p>
        <div className="flex flex-wrap -mx-2">
          <Suspense fallback={<LoadingCard />}>
            <ProjectCard
              name="Dark Cloud 2 Fishing Implementation"
              description={`${
                descriptions['DarkCloud2Fishing'] || loadingMessage
              } Written in C#.`}
              githubLink="https://github.com/Kevin-Kwan/DarkCloud2Fishing"
            />
            <ProjectCard
              name="CutieBot (Discord Bot Application)"
              description={`${
                descriptions['CutieBot'] || loadingMessage
              } Written in JavaScript.`}
              githubLink="https://github.com/Kevin-Kwan/CutieBot"
            />
            <ProjectCard
              name="Software Engineer Portfolio Website"
              description={`This website I made with TypeScript! ${
                descriptions['portfolio-nextjs'] || loadingMessage
              } Made with Next.js and TailwindCSS.`}
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
          </Suspense>
        </div>
        <p className="text-3xl font-bold mb-2 text-center text-blue-200 underline">
          Completed Projects
        </p>
        <div className="flex flex-wrap -mx-2">
          <Suspense fallback={<LoadingCard />}>
            <ProjectCard
              name="Dark Ascent (3D Platformer Game)"
              description={`${
                descriptions['Dark-Ascent'] || loadingMessage
              } Written in C#.`}
              githubLink="https://github.com/Kevin-Kwan/Dark-Ascent/"
              demoLink="https://github.com/Kevin-Kwan/Dark-Ascent/releases"
              demoText="Releases"
            />
            <ProjectCard
              name='"Eyetracking-Driven Human Computer Interaction" Software'
              description={`${
                descriptions['fixed_pytorch_mpiigaze_demo'] || loadingMessage
              } Used Python, PyTorch, numpy, and OpenCV.`}
              githubLink="https://github.com/Kevin-Kwan/fixed_pytorch_mpiigaze_demo/"
              demoLink="https://colab.research.google.com/github/Kevin-Kwan/pytorch_mpiigaze_demo/blob/master/demo.ipynb"
              demoText="Colab Demo"
            />

            <ProjectCard
              name="Project Blu (2D Unity Game Suite)"
              description={
                'A game suite made for Objects & Design class (CS 2340) during the Summer of 2022 featuring Blackjack, Chess with AI, and a Rouge-like Georgia Tech-themed game. We learned and applied principles of Software Engineering and the best design principles by putting them into practice with this project. Written in C#.'
              }
              githubLink="https://github.com/majesityreal/CS2340-Team-7"
              demoLink="https://github.com/majesityreal/CS2340-Team-7/releases"
              demoText="Releases"
            />
            <ProjectCard
              name="Windows XP-themed Website"
              description={descriptions['WindowsXPWebsite'] || loadingMessage}
              githubLink="https://github.com/Kevin-Kwan/WindowsXPWebsite/"
              demoLink="https://kevin-kwan.github.io/WindowsXPWebsite/"
              demoText="Demo"
            />
            <ProjectCard
              name="eduNFT (HackGT 8 2021)"
              description={descriptions['eduNFT'] || loadingMessage}
              githubLink="https://github.com/Kevin-Kwan/eduNFT/"
              demoLink="https://kevin-kwan.github.io/eduNFT/"
              demoText="Demo"
            />
            <ProjectCard
              name="Evade and Deceive (Unity 3D Online Multiplayer Racing Game)"
              description={`${
                descriptions['gsmst-EvadeAndDeceive'] || loadingMessage
              } Written in C#.`}
              githubLink="https://github.com/Kevin-Kwan/gsmst-EvadeAndDeceive/"
              demoLink="https://github.com/Kevin-Kwan/gsmst-EvadeAndDeceive/releases"
              demoText="Releases"
            />
            <ProjectCard
              name="Let's Surf (Unity 3D Movement Game)"
              description={`${
                descriptions['gsmst-LetsSurf'] || loadingMessage
              } Written in C#.`}
              githubLink="https://github.com/Kevin-Kwan/gsmst-LetsSurf/"
              demoLink="https://github.com/Kevin-Kwan/gsmst-LetsSurf/releases"
              demoText="Releases"
            />
            <ProjectCard
              name="Non-Euclidean Geometry Implementation (Unity 3D)"
              description={`${
                descriptions['gsmst-Noneuclidean-World'] || loadingMessage
              } Written in C#.`}
              githubLink="https://github.com/Kevin-Kwan/gsmst-Noneuclidean-World"
              demoLink="https://github.com/Kevin-Kwan/gsmst-Noneuclidean-World/releases"
              demoText="Releases"
            />
            <ProjectCard
              name="Arkanoid Game (Unity 2D)"
              description={`${
                descriptions['gsmst-ArkanoidGame'] || loadingMessage
              } Written in C#.`}
              githubLink="https://github.com/Kevin-Kwan/gsmst-ArkanoidGame"
              demoLink="https://github.com/Kevin-Kwan/gsmst-ArkanoidGame/releases"
              demoText="Releases"
            />
            <ProjectCard
              name="Triggering Insanity (2D Platformer)"
              description={`${
                descriptions['gsmst-TriggeringInsanityGame'] || loadingMessage
              } Written in Java.`}
              githubLink="https://github.com/Kevin-Kwan/gsmst-TriggeringInsanityGame"
              demoLink="https://github.com/Kevin-Kwan/gsmst-TriggeringInsanityGame/releases"
              demoText="Releases"
            />
          </Suspense>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const descriptions: { [key: string]: string } = {};

  try {
    // Fetch all descriptions in parallel
    const descriptionPromises = projectsWithDescriptions.map((project) =>
      getRepoDescription(`https://github.com/Kevin-Kwan/${project}`)
        .then((description) => {
          descriptions[project] = description;
        })
        .catch((error) => {
          console.error(`Error fetching description for ${project}: ${error}`);
          descriptions[project] =
            'Error: Could not fetch GitHub Repository description. Please try again later.';
        })
    );

    await Promise.all(descriptionPromises);
  } catch (error) {
    console.error(`Error fetching descriptions: ${error}`);
  }

  return {
    props: {
      descriptions,
    },
  };
}
// Comment out this line if you are doing npm run dev
export const runtime = 'experimental-edge';
