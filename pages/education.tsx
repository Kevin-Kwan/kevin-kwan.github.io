import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import EducationCard from '../components/EducationCard';
import Reveal from '../components/Reveal';
import {
  academicHighlights,
  education,
  selectedCoursework,
} from '../content/education';

function Education() {
  return (
    <>
      <Seo
        title="Education — Georgia Tech Computer Science | Kevin Kwan"
        description="Kevin Kwan's education: B.S. Computer Science with Highest Honors (3.9 GPA) from the Georgia Institute of Technology, plus Gwinnett Technical College and the Gwinnett School of Mathematics, Science, and Technology."
        path="/education"
      />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Background"
          title="Education"
          description="Degrees, certificates, and honors — a Georgia Tech B.S. in Computer Science, dual-enrollment coursework, and a STEM magnet high school."
        />
        <div className="mt-12 space-y-6">
          {education.map((entry, i) => (
            <Reveal key={entry.id} delay={Math.min(i, 2) * 60}>
              <EducationCard entry={entry} />
            </Reveal>
          ))}
        </div>

        {/* Academic highlights — scholarships and honors from the résumé,
            plus the EcoCAR result already on this site. */}
        <section aria-labelledby="education-highlights" className="mt-14">
          <h2
            id="education-highlights"
            className="text-2xl font-semibold tracking-tight text-zinc-50"
          >
            Academic highlights
          </h2>
          <ul className="mt-6 space-y-2.5">
            {academicHighlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-sm leading-relaxed text-zinc-300"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Selected upper-level coursework — the courses behind several
            projects on this site. */}
        <section aria-labelledby="education-coursework" className="mt-14">
          <h2
            id="education-coursework"
            className="text-2xl font-semibold tracking-tight text-zinc-50"
          >
            Selected upper-level coursework
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            The courses behind several of the projects on this site.
          </p>
          <ul className="mt-6 space-y-3">
            {selectedCoursework.map((course) => (
              <li key={course.code} className="text-sm">
                <span className="font-mono text-xs text-zinc-400">
                  {course.code}
                </span>
                <span className="ml-3 font-medium text-zinc-100">
                  {course.name}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Education;
