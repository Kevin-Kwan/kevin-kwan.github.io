import Head from 'next/head';
import ExperienceCard from '../components/ExperienceCard';

function Experience() {
  return (
    <div>
      <Head>
        <title>Kevin Kwan | Work Experience</title>
      </Head>
      <main className="flex-1 p-4" style={{ paddingTop: '5rem' }}>
        <div className="max-w-6xl mx-auto">
          <p className="sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 text-white text-center">
            My Work Experience
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-1xl text-white mb-2">
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
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                  As part of a team, our project was to engineer an AI chatbot
                  application for the Travel & Hospitality Industry,
                  specifically designed for WhatsApp. The application was built
                  using Google VertexAI&apos;s PaLM LLM, LangChain, MongoDB, and
                  APIs, with the aim of enhancing tourists&apos; experiences by
                  providing engaging conversations, accurate and up-to-date
                  answers, live data, and recommendations for Atlanta&apos;s
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
                  bot&apos;s responses up to 91% through rigorous testing and
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
              </div>
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
            jobDescription={
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                  I served as a Connected Autonomous Vehicles (CAVs) Software
                  Engineer for the Georgia Tech EcoCAR EV Challenge at the
                  Georgia Institute of Technology. As part of the
                  Vehicle-to-Everything (V2X) subteam, I utilized multiple data
                  streams from cameras and sensors to develop a state machine.
                  This machine was designed to enable the car to make
                  intelligent decisions in various traffic light scenarios, with
                  a focus on efficiency and user experience. For example, based
                  on the distance to the traffic light, the state machine would
                  determine whether the car should stop or continue driving,
                  which in turn would improve the car&apos;s fuel efficiency and
                  the user&apos;s experience.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                  The EcoCAR Mobility Challenge is a prestigious 4-year
                  Collegiate Competition and a $1 million research program. It
                  is sponsored by esteemed organizations such as Argonne
                  National Labs, the U.S. Department of Energy, General Motors,
                  MathWorks, Intel, and more.
                </p>

                <p>
                  I am proud to have contributed to the{' '}
                  <a
                    href="https://coe.gatech.edu/news/2022/05/student-team-wins-department-energy-ecocar-mobility-challenge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Georgia Institute of Technology team&apos;s victory in the
                    2022 EcoCAR Mobility Challenge, where we secured 1st place
                  </a>
                  {'. '}
                  <strong>
                    This experience not only honed my technical skills but also
                    reinforced my passion for software engineering and its
                    potential to create impactful and innovate solutions in the
                    field of autonomous vehicles.
                  </strong>
                </p>
              </div>
            }
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
            logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ5UGKVEqd2rsXKBf9rxkHEiCKEn6fVVWVMQ&s"
            jobDescription={
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                  My primary task was to develop a machine learning program
                  using MATLAB, a language and environment that was completely
                  new to me. The project involved training and fine-tuning a
                  neural network using an architecture like AlexNet on a dataset
                  of images where each image was associated with a person&apos;s
                  name. The goal was to use live footage from a computer webcam
                  to correctly identify people&apos;s faces. This task was
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
              </div>
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
    </div>
  );
}

export default Experience;
