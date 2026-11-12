import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import ExperienceCard from '../components/ExperienceCard';
import Reveal from '../components/Reveal';
import { experience } from '../content/experience';

function Experience() {
  return (
    <>
      <Seo
        title="Experience | Kevin Kwan"
        description="Kevin Kwan's work experience: Software Engineer II (Conversational AI & IVR) at GEICO, Software Engineer Intern at Publicis Sapient, Georgia Tech EcoCAR EV Challenge, and NCR Voyix."
        path="/experience"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Career"
          title="Work Experience"
          description="Software engineering positions I've held, the companies I've worked for, the projects I worked on, and what I learned — with outcomes first."
        />
        <div className="mt-12 space-y-6">
          {experience.map((entry, i) => (
            <Reveal key={entry.id} delay={Math.min(i, 2) * 60}>
              <ExperienceCard entry={entry} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

export default Experience;
