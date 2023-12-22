import Head from 'next/head';
import Layout from '../components/RootLayout';
import ProjectCard from '../components/ProjectCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

const github_pat = process.env.GITHUB_PAT;

async function getRepoDescription(githubRepoUrl) {
  const [, owner, repo] = new URL(githubRepoUrl).pathname.split('/');
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `token ${github_pat}`,
        },
      }
    );
    return response.data.description;
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

export default function Projects({ descriptions }) {
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
            githubLink="https://github.com"
            demoLink="https://github.com"
          />
          <ProjectCard
            name="My Personal LeetCode Solutions"
            description={descriptions['leetcode'] || loadingMessage}
            githubLink="https://github.com"
            demoLink="https://github.com"
          />
        </div>
        <p className="text-3xl font-bold mb-2 text-center ">
          Completed Projects
        </p>
        <div className="flex flex-wrap -mx-2">
          <ProjectCard
            name="Let's Surf (3D Movement Game)"
            description={
              (descriptions['gsmst-LetsSurf'] || loadingMessage) +
              ' ' +
              'Written in C#.'
            }
            githubLink="https://github.com/Kevin-Kwan/gsmst-LetsSurf/releases"
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
  const descriptions = {};

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
