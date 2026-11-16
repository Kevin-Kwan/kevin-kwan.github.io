export interface OrgLogoSpec {
  /** Local path under /logos/ — never hotlink brand assets. */
  src: string;
  /** Meaningful alt text, e.g. 'Company logo'. */
  alt: string;
  /** Tile background override for marks that need a brand-colored field. */
  tileClassName?: string;
  /** Per-logo padding tuning so wide/portrait marks sit evenly in the tile. */
  imgClassName?: string;
}

interface OrgLogoProps {
  logo: OrgLogoSpec;
  className?: string;
}

/**
 * Real organization logo in a fixed h-14 w-14 square tile, replacing the
 * old letter monograms. Every logo is contained inside the square tile
 * (object-contain with padding) and must never bleed out of it — wide
 * horizontal lockups render as a smaller strip inside the square, which
 * is the required fit. Most brand marks are dark-on-transparent, so the
 * default tile is a light neutral field; individual logos can override
 * the tile background (e.g. Gwinnett Tech's white wordmark sits on its
 * brand navy).
 */
function OrgLogo({ logo, className = '' }: OrgLogoProps) {
  return (
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 ${
        logo.tileClassName ?? 'bg-white/95'
      } ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export; plain img keeps local SVG/PNG logos unprocessed */}
      <img
        src={logo.src}
        alt={logo.alt}
        width={56}
        height={56}
        loading="lazy"
        className={`max-h-full max-w-full object-contain ${
          logo.imgClassName ?? 'p-2'
        }`}
      />
    </div>
  );
}

export default OrgLogo;
