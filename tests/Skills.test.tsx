import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skills from '../pages/skills';
import { coreSkills, skillTiers } from '../content/skills';

const allSkillNames = skillTiers.flatMap((tier) =>
  tier.skills.map((skill) => skill.name)
);

describe('Skills naming', () => {
  it('calls the Lambda service "AWS Lambda" everywhere, matching the home marquee and /resume', () => {
    expect(allSkillNames).toContain('AWS Lambda');
    expect(allSkillNames).not.toContain('Lambda');
    expect(coreSkills).toContain('AWS Lambda');
    render(<Skills />);
    expect(screen.getByText('AWS Lambda')).not.toBeNull();
  });

  it('calls the database "Cloud Firestore" everywhere, never bare "Firestore"', () => {
    expect(allSkillNames).toContain('Cloud Firestore');
    expect(allSkillNames).not.toContain('Firestore');
    render(<Skills />);
    expect(screen.getByText('Cloud Firestore')).not.toBeNull();
  });

  it('has no "Go" skill tile — the round-8 "icon-less Go tile" was a misread of another tile', () => {
    // No Go entry exists in the inventory, so there is no tile to fix;
    // every listed icon key resolves to a real icon in SkillIcon.
    expect(allSkillNames).not.toContain('Go');
    render(<Skills />);
    expect(screen.queryByText('Go')).toBeNull();
  });
});
