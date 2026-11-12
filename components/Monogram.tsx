interface MonogramProps {
  text: string;
  className?: string;
}

/** Local monogram tile used in place of hotlinked company/school logos. */
function Monogram({ text, className = '' }: MonogramProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 select-none items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/25 via-surface-raised to-cyan-500/20 font-mono text-sm font-bold tracking-wide text-zinc-100 ${className}`}
    >
      {text}
    </div>
  );
}

export default Monogram;
