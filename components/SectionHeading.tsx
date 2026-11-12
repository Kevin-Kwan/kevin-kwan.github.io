interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  /** Heading level: secondary pages pass 'h1' for their page title. */
  as?: 'h1' | 'h2';
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as = 'h2',
}: SectionHeadingProps) {
  const centered = align === 'center';
  const Heading = as;
  return (
    <div className={centered ? 'text-center' : ''}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-cyan-300">
        {eyebrow}
      </p>
      <Heading className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-4 max-w-2xl leading-relaxed text-zinc-400 ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
