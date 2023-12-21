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
            jobDescription={
              <>
                <p style={{ marginBottom: '0.5rem' }}>
                  As part of a team, our project was to engineer an AI chatbot
                  application for the Travel & Hospitality Industry,
                  specifically designed for WhatsApp. The application was built
                  using Google VertexAI’s PaLM LLM, LangChain, MongoDB, and
                  APIs, with the aim of enhancing tourists’ experiences by
                  providing engaging conversations, accurate and up-to-date
                  answers, live data, and recommendations for Atlanta’s
                  attractions (World of Coca-Cola, Zoo Atlanta, Georgia
                  Aquarium), hotels (like Marriott®), and restaurants.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                  To bridge the gap between our frontend team and backend
                  resources, such as our MongoDB databases and AI chatbot
                  program, I architected RESTful APIs using Flask and Python.
                  This architecture enabled the team to generate and retrieve
                  responses effectively. In addition, I automated the CI/CD
                  (DevOps) pipeline through GitLab and Docker, and deployed our
                  frontend applications on Google Firebase Hosting and backend
                  applications on Google App Engine. This not only streamlined
                  the development process but also ensured seamless deployment
                  of our applications. I was able to improve the accuracy of the
                  bot’s responses up to 91% through rigorous testing and
                  validation.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                  As a final touch, I assembled an interactive map website to
                  serve chatbot options and venue information to users,
                  providing them with a comprehensive and interactive tool to
                  enhance their travel experience.
                </p>

                <p>
                  Our efforts were met with great satisfaction from our client
                  and coaches. We even outperformed the team in Boston, as well
                  as all the other teams in the Atlanta office.{' '}
                  <strong>
                    This experience was a testament to the power of my
                    leadership, teamwork, rapid learning, and innovative
                    thinking and their potential to create impactful solutions.
                  </strong>
                </p>
              </>
            }
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
            jobDescription={
              <>
                <p style={{ marginBottom: '0.5rem' }}>
                  My primary task was to develop a machine learning program
                  using MATLAB, a language and environment that was completely
                  new to me. The project involved training and fine-tuning a
                  neural network using an architecture like AlexNet on a dataset
                  of images where each image was associated with a person’s
                  name. The goal was to use live footage from a computer webcam
                  to correctly identify people's faces. This task was
                  essentially a classification problem, and it involved elements
                  of facial recognition.
                </p>

                <p>
                  Despite the complexity of the task and my unfamiliarity with
                  MATLAB, I was able to learn the basics of the language in just
                  a week. I heavily relied on documentation to aid in the
                  development of the program. My efforts paid off when my
                  supervisor expressed great admiration for the work I had
                  accomplished in such a short period of time and even offered
                  me position at the company. However, as I was still in high
                  school and wanted to prioritize my studies, I had to
                  respectfully decline the offer.{' '}
                  <strong>
                    {' '}
                    This experience was a testament to my ability to quickly
                    adapt to new technologies and deliver impressive results.
                  </strong>
                </p>
              </>
            }
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
