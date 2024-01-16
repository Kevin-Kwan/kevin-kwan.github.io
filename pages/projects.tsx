import Head from 'next/head';
import ProjectCard from '../components/ProjectCard';
import { FaHackerrank } from 'react-icons/fa';

// const github_pat = process.env.GITHUB_PAT;

const loadingMessage =
  'Failed to fetch GitHub Repository description. Please try again later.';
// const projectsWithDescriptions = [''];

async function getRepoDescription(githubRepoUrl: string) {
  const [, owner, repo] = new URL(githubRepoUrl).pathname.split('/');
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${github_pat}`,
      //   },
      // }
    );
    const data = await response.json();
    return data.description || loadingMessage;
  } catch (error) {
    console.error(`Error: ${error}`);
    return 'Error: Could not fetch GitHub Repository description. Please try again later.';
  }
}

// Add your GitHub Repository names here to fetch descriptions from GitHub API
const projectsWithDescriptions = [
  'CutieBot',
  'portfolio',
  'leetcode',
  'Lets-Surf',
  'eduNFT',
  'Triggering-Insanity',
  'Noneuclidean-World',
  'WindowsXPWebsite',
  'Evade-And-Deceive',
  'fixed_pytorch_mpiigaze_demo',
  'Dark-Ascent',
  'hackerrank',
  'Arkanoid',
  'Unity3D-FishingRodMotion',
];

// function LoadingCard() {
//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
//     </div>
//   );
// }
interface ProjectsProps {
  descriptions: { [key: string]: string };
}
function Projects({ descriptions }: ProjectsProps) {
  // const isLoading = Object.values(descriptions).includes(loadingMessage);
  return (
    <div>
      <Head>
        <title>Kevin Kwan | My Projects</title>
      </Head>
      <main className="flex-1 p-4" style={{ paddingTop: '5rem' }}>
        <p className="text-3xl font-bold mb-2 text-center text-green-200 underline">
          Ongoing Projects
        </p>
        <div className="flex flex-wrap justify-center -mx-2">
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
              descriptions['portfolio'] || loadingMessage
            } Made with Next.js and TailwindCSS.`}
            githubLink="https://github.com/Kevin-Kwan/portfolio"
            demoLink="/"
          />
        </div>
        <p className="text-3xl font-bold mb-2 text-center text-blue-200 underline">
          Completed Projects
        </p>
        <div className="flex flex-wrap justify-center -mx-2">
          <ProjectCard
            name="Fishing Line Physics Implementation (Unity 3D)"
            description={`${
              descriptions['Unity3D-FishingRodMotion'] || loadingMessage
            } Written in C#.`}
            githubLink="https://github.com/Kevin-Kwan/Unity3D-FishingRodMotion"
          />
          <ProjectCard
            name='"Dark Ascent" (3D Platformer Game)'
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
            name='"Project Blu" (2D Unity Game Suite)'
            description={
              'A game suite made for Objects & Design class (CS 2340) during the Summer of 2022 featuring Blackjack, Chess with AI, and a Rouge-like Georgia Tech-themed game. We learned and applied principles of Software Engineering and the best design principles by putting them into practice with this project. Written in C#.'
            }
            githubLink="https://github.com/majesityreal/CS2340-Team-7"
            demoLink="https://github.com/majesityreal/CS2340-Team-7/releases"
            demoText="Releases"
          />
          <ProjectCard
            name="Windows XP-themed Website/Socials Page"
            description={descriptions['WindowsXPWebsite'] || loadingMessage}
            githubLink="https://github.com/Kevin-Kwan/WindowsXPWebsite/"
            demoLink="https://kevin-kwan.github.io/WindowsXPWebsite/"
            demoText="Demo"
          />
          <ProjectCard
            name='"eduNFT" (HackGT 8 2021)'
            description={descriptions['eduNFT'] || loadingMessage}
            githubLink="https://github.com/Kevin-Kwan/eduNFT/"
            demoLink="https://kevin-kwan.github.io/eduNFT/"
            demoText="Demo"
          />
          <ProjectCard
            name='"Evade and Deceive" (Unity 3D Online Multiplayer Racing Game)'
            description={`${
              descriptions['Evade-And-Deceive'] || loadingMessage
            } Written in C#.`}
            githubLink="https://github.com/Kevin-Kwan/Evade-And-Deceive/"
            demoLink="https://github.com/Kevin-Kwan/Evade-And-Deceive/releases"
            demoText="Releases"
          />
          <ProjectCard
            name='"Let&apos;s Surf" (Unity 3D Movement Game)'
            description={`${
              descriptions['Lets-Surf'] || loadingMessage
            } Written in C#.`}
            githubLink="https://github.com/Kevin-Kwan/Lets-Surf/"
            demoLink="https://github.com/Kevin-Kwan/Lets-Surf/releases"
            demoText="Releases"
          />
          <ProjectCard
            name="Non-Euclidean Geometry Implementation (Unity 3D)"
            description={`${
              descriptions['Noneuclidean-World'] || loadingMessage
            } Written in C#.`}
            githubLink="https://github.com/Kevin-Kwan/Noneuclidean-World"
            demoLink="https://github.com/Kevin-Kwan/Noneuclidean-World/releases"
            demoText="Releases"
          />
          <ProjectCard
            name="Arkanoid Game (Unity 2D)"
            description={`${
              descriptions['Arkanoid'] || loadingMessage
            } Written in C#.`}
            githubLink="https://github.com/Kevin-Kwan/Arkanoid"
            demoLink="https://github.com/Kevin-Kwan/Arkanoid/releases"
            demoText="Releases"
          />
          <ProjectCard
            name='"Triggering Insanity" (2D Platformer)'
            description={descriptions['Triggering-Insanity'] || loadingMessage}
            githubLink="https://github.com/Kevin-Kwan/Triggering-Insanity"
            demoLink="https://github.com/Kevin-Kwan/Triggering-Insanity/releases"
            demoText="Releases"
          />
        </div>
        <p className="text-3xl font-bold mb-2 text-center text-purple-200 underline">
          Coding Challenge Solutions
        </p>
        <div className="flex flex-wrap justify-center -mx-2">
          <ProjectCard
            name="My Personal LeetCode Solutions"
            description={descriptions['leetcode'] || loadingMessage}
            githubLink="https://github.com/Kevin-Kwan/leetcode"
            demoLink="https://leetcode.com/kevinkwan/"
            demoText="Profile"
            // There is no LeetCode Icon from FontAwesome yet
          />
          <ProjectCard
            name="My Personal HackerRank Solutions"
            description={descriptions['hackerrank'] || loadingMessage}
            githubLink="https://github.com/Kevin-Kwan/hackerrank"
            demoLink="https://www.hackerrank.com/profile/kevinkwan"
            demoText="Profile"
            Icon={FaHackerrank}
          />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const descriptions: { [key: string]: string } = {};
  console.log('Fetching descriptions...');

  // if length of descriptions is 0, then we need to fetch descriptions
  if (Object.keys(descriptions).length === 0) {
    try {
      console.log('Attempting to fetch descriptions...');
      // Fetch all descriptions in parallel
      const descriptionPromises = projectsWithDescriptions.map((project) =>
        getRepoDescription(`https://github.com/Kevin-Kwan/${project}`)
          .then((description) => {
            descriptions[project] = description;
          })
          .catch((error) => {
            console.error(
              `Error fetching description for ${project}: ${error}`
            );
            descriptions[project] =
              'Error: Could not fetch GitHub Repository description. Please try again later.';
          })
      );

      await Promise.all(descriptionPromises);
      console.log('Finished fetching descriptions!');
    } catch (error) {
      console.error(`Error fetching descriptions: ${error}`);
    }
  }

  return {
    props: {
      descriptions,
    },
    revalidate: 900,
    // 15 minutes because GitHub API has a rate limit of 60 requests per hour for unauthenticated requests, so we can only fetch descriptions every 15 minutes
    // 14 (about 15) * 4 = 56-60 requests per hour
  };
}

export default Projects;
// Comment out this line if you are doing npm run dev
// export const runtime = 'experimental-edge';
