import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import ExperienceCard from '../components/ExperienceCard';
import Reveal from '../components/Reveal';
import { experience } from '../content/experience';

function Experience() {
  return (
    <>
      <Seo
        title="Conversational AI & Amazon Connect Experience | Kevin Kwan"
        description="Explore Kevin Kwan's work building voice AI and Amazon Connect IVR systems at GEICO, including AWS Lambda, Amazon Lex, DynamoDB, and production engineering."
        path="/experience"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Career"
          title="Conversational AI & Software Engineering Experience"
          description="I'm a Software Engineer II at GEICO specializing in conversational AI, voice-agent development, and Amazon Connect IVR engineering — designing customer-service automation, building AWS serverless integrations, migrating legacy contact-center systems, and maintaining reliable production services."
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
