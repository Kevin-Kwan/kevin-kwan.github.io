import Head from 'next/head';
import Layout from '../components/RootLayout';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | Projects</title>
      </Head>
      <main className="flex-1 p-4">
        <p className="text-2xl font-bold mb-4 text-center">My Projects</p>
        <div className="flex flex-wrap -mx-2">
          <ProjectCard
            name="Project 1"
            date="2021-01-01"
            imageSrc="https://picsum.photos/seed/picsum/200/300"
            onClick={() => {}}
          />
          <ProjectCard
            name="Project 1"
            date="2021-01-01"
            imageSrc="https://picsum.photos/seed/picsum/200/300"
            onClick={() => {}}
          />
          <ProjectCard
            name="Project 1"
            date="2021-01-01"
            imageSrc="https://picsum.photos/seed/picsum/200/300"
            onClick={() => {}}
          />
          <ProjectCard
            name="Project 1"
            date="2021-01-01"
            imageSrc="https://picsum.photos/seed/picsum/200/300"
            onClick={() => {}}
          />
        </div>
        <p className="text-lg">
          Here&apos;s some sample text since my website is still under
          development.
        </p>
      </main>
    </Layout>
  );
}
