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
        <p className="text-2xl font-bold mb-4 text-center ">My Projects</p>
        <div className="flex flex-wrap -mx-2">
          <ProjectCard
            name="Project 1"
            date="2022-Present"
            imageSrc="https://i.redd.it/vo9vm1fcqrp71.jpg"
            onClick={() => {}}
          />
          <ProjectCard
            name="Project 2"
            date="2022-2023"
            imageSrc="https://i.redd.it/vo9vm1fcqrp71.jpg"
            onClick={() => {}}
          />
          <ProjectCard
            name="Project 3"
            date="June 2023 - August 2023"
            imageSrc="https://i.redd.it/vo9vm1fcqrp71.jpg"
            onClick={() => {}}
          />
          <ProjectCard
            name="Project 4"
            date="August 2023 - December 2023"
            imageSrc="https://i.redd.it/vo9vm1fcqrp71.jpg"
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
