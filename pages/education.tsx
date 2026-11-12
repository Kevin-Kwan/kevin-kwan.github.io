import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import EducationCard from '../components/EducationCard';
import Reveal from '../components/Reveal';
import { education } from '../content/education';

function Education() {
  return (
    <>
      <Seo
        title="Education | Kevin Kwan"
        description="Kevin Kwan's education: B.S. Computer Science with Highest Honors (3.9 GPA, summa cum laude) from the Georgia Institute of Technology, plus Gwinnett Technical College and GSMST."
        path="/education"
      />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Background"
          title="Education"
          description="My educational experiences, associations, activities and societies, and awards and achievements."
        />
        <div className="mt-12 space-y-6">
          {education.map((entry, i) => (
            <Reveal key={entry.id} delay={Math.min(i, 2) * 60}>
              <EducationCard entry={entry} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

export default Education;
