import Head from 'next/head';
import Layout from '../components/RootLayout';
import Link from 'next/link';
import ExperienceCard from '../components/ExperienceCard';

export default function Experience() {
  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | Work Experience</title>
      </Head>
      <main className="flex-1 p-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-white text-2xl font-bold mb-4 text-center">
            My Work Experience
          </p>
          <p className="text-white text-lg mb-4">
            Here, you'll find a list of positions I've held, the companies I've
            worked for, some of the responsibilities I had, and what I learned.
          </p>
          <ExperienceCard
            companyName="Company Name"
            dateRange="Month Year - Month Year"
            jobTitle="Job Title"
            logoUrl="https://via.placeholder.com/150"
            jobDescription="Job description goes here..."
          />
        </div>
      </main>
    </Layout>
  );
}
