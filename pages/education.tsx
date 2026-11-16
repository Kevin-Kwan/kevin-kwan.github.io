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
        title="Education | Kevin Kwan"
        description="Kevin Kwan's education: B.S. Computer Science with Highest Honors (3.9 GPA, summa cum laude) from the Georgia Institute of Technology, plus Gwinnett Technical College."
        path="/education"
      />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Background"
          title="Education"
          description="Degrees, certificates, and honors — a Georgia Tech B.S. in Computer Science and dual-enrollment coursework."
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

        {/* Selected upper-level coursework, grouped by Georgia Tech CS
            thread — the courses behind several projects on this site. */}
        <section aria-labelledby="education-coursework" className="mt-14">
          <h2
            id="education-coursework"
            className="text-2xl font-semibold tracking-tight text-zinc-50"
          >
            Selected upper-level coursework
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Grouped by Georgia Tech CS thread — the courses behind several
            of the projects on this site.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {selectedCoursework.map((group) => (
              <div
                key={group.thread}
                className="rounded-2xl border border-white/10 bg-surface p-6"
              >
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  {group.thread}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.courses.map((course) => (
                    <li key={course.code} className="text-sm">
                      <span className="font-mono text-xs text-zinc-400">
                        {course.code}
                      </span>
                      <span className="mt-0.5 block font-medium text-zinc-100">
                        {course.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Education;
