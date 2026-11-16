import { describe, expect, it } from 'vitest';
import { site } from '../content/site';

describe('Meta descriptions', () => {
  it('uses "with Highest Honors" as the honours claim everywhere', () => {
    // Site-wide default description (used as the fallback everywhere).
    expect(site.defaultDescription).toContain('with Highest Honors');
    expect(site.defaultDescription).not.toContain('summa cum laude');
    // The per-page descriptions in pages/index.tsx, pages/resume.tsx,
    // and pages/education.tsx carry the same wording; they are inline
    // props, not exported data, so they are covered by the compliance
    // grep over source (which must stay at 0 hits for "summa cum
    // laude") rather than by a render assertion — next/head does not
    // write to document.head in this jsdom setup.
  });
});
