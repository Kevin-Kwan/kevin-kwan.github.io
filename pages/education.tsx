import Head from 'next/head';
import EducationCard from '../components/EducationCard';

function Education() {
  return (
    <div>
      <Head>
        <title>Kevin Kwan | My Education</title>
      </Head>
      <main className="flex-1 p-4" style={{ paddingTop: '5rem' }}>
        <div className="max-w-4xl mx-auto">
          <p className="sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 text-white text-center">
            My Education
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-1xl text-white mb-2 text-center">
            Here, you&apos;ll find a list of my educational experiences,
            associations, activities/societies, and awards/achievements.
          </p>
          <EducationCard
            schoolName="Georgia Institute of Technology"
            subschoolDescription="College of Computing"
            dateRange="August 2021 - Expected May 2024"
            credential="Bachelor of Science in Computer Science"
            logoUrl="https://brand.gatech.edu/sites/default/files/inline-images/GTVertical_RGB.png"
            links={[
              {
                url: 'https://www.gatech.edu/',
                displayText: 'University Website',
              },
              {
                url: 'https://www.cc.gatech.edu/',
                displayText: 'College Website',
              },
            ]}
            eduDescription={
              <p>
                <b>Threads:</b> Intelligence and Media
              </p>
            }
            gpa="3.9"
          />
          <EducationCard
            schoolName="Gwinnett Technical College"
            subschoolDescription="Dual Enrollment Program"
            dateRange="May 2020 - June 2021"
            credential="PC Repair and Network Technician Certificate"
            location="Lawrenceville, GA"
            logoUrl="https://gwinnetttech.edu/wp-content/uploads/2023/10/gtclogo_studentservices.jpg"
            links={[
              {
                url: 'https://gwinnetttech.edu',
                displayText: 'College Website',
              },
            ]}
            gpa="4.0"
          />
          <EducationCard
            schoolName="Gwinnett School of Mathematics, Science, and Technology"
            subschoolDescription="High School"
            dateRange="August 2017 - May 2021"
            credential="High School Diploma with Honors"
            location="Lawrenceville, GA"
            logoUrl="https://upload.wikimedia.org/wikipedia/en/6/6f/Seal_of_GSMST.png"
            links={[
              {
                url: 'https://www.gcpsk12.org/GSMST',
                displayText: 'School Website',
              },
            ]}
            gpa="4.211"
          />
        </div>
      </main>
    </div>
  );
}

export default Education;
