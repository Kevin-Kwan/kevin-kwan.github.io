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
            Here, you&apos;ll find a list of software engineering positions
            I&apos;ve held, the companies I&apos;ve worked for, the projects
            that I worked on, some of the responsibilities I had, and what I
            learned.
          </p>
          <ExperienceCard
            companyName="Publicis Sapient"
            subCompanyDescription="Digital Business Transformation & Consulting"
            dateRange="June 2023 - August 2023"
            jobTitle="Software Engineer Intern"
            logoUrl="https://careers.publicissapient.com/content/dam/careers/events/Sapient_Event_green.png"
            jobDescription="Job Description"
            links={[
              {
                url: 'https://www.publicissapient.com/',
                displayText: 'Company Website',
              },
            ]}
          />
          <ExperienceCard
            companyName="Georgia Tech EcoCAR EV Challenge"
            subCompanyDescription="VIP Program"
            dateRange="January 2022 - May 2023"
            jobTitle="Software Engineer (Connected and Automated Vehicles Team)"
            logoUrl="https://media.licdn.com/dms/image/C560BAQH6vov8-U6y8g/company-logo_200_200/0/1661008559177?e=2147483647&v=beta&t=9bFW6vwhYP7GaORz81Ti2ZYcrY94yyrmZUW4rftU_jo"
            jobDescription="Job Description"
            links={[
              {
                url: 'https://www.vip.gatech.edu/teams/vpu',
                displayText: 'Program Website',
              },
              {
                url: 'https://sites.gatech.edu/ecocar/',
                displayText: 'Team Website',
              },
              {
                url: 'https://avtcseries.org/about-the-ecocar-ev-challenge/',
                displayText: 'Competition Website',
              },
            ]}
          />
          <ExperienceCard
            companyName="NCR Voyix"
            subCompanyDescription='Formerly "NCR Corporation"'
            dateRange="July 2019 - August 2019"
            jobTitle="Software Engineer Intern"
            logoUrl="https://media.licdn.com/dms/image/D560BAQEHLtG-f8uOUQ/company-logo_200_200/0/1697490837284/ncrvoyix_logo?e=1710979200&v=beta&t=XhgUKoF_-1w4tBihIcFRqZ8xkCOWu5X1zBM3OuAn2Xg"
            jobDescription="Job Description"
            links={[
              {
                url: 'https://www.ncr.com/',
                displayText: 'Company Website',
              },
            ]}
          />
        </div>
      </main>
    </Layout>
  );
}
