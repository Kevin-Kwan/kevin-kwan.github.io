interface TechTagProps {
  label: string;
}

function TechTag({ label }: TechTagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] leading-none text-zinc-300">
      {label}
    </span>
  );
}

export default TechTag;
