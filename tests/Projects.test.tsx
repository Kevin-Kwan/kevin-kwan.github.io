import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Projects from '../pages/projects';
import {
  allProjects,
  featuredProjects,
  projectCategoryLabels,
  projectTierLabels,
} from '../content/projects';

// Controllable stand-in for the Next router: tests set the query / ready
// state, and navigation calls land on spies instead of jsdom's history.
type RouterNavFn = (
  url: unknown,
  as?: unknown,
  opts?: unknown
) => Promise<boolean>;

const routerState = vi.hoisted(() => ({
  query: {} as Record<string, string | string[]>,
  isReady: true,
  push: vi.fn<RouterNavFn>(),
  replace: vi.fn<RouterNavFn>(),
}));

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/projects',
    query: routerState.query,
    isReady: routerState.isReady,
    push: routerState.push,
    replace: routerState.replace,
  }),
}));

function countInCategory(category: string): number {
  return allProjects.filter((project) => project.category === category)
    .length;
}

beforeEach(() => {
  routerState.query = {};
  routerState.isReady = true;
  routerState.push.mockClear();
  routerState.replace.mockClear();
  window.history.pushState({}, '', '/projects');
});

describe('Projects filter', () => {
  it('announces all projects and presses the All filter with no category param', () => {
    render(<Projects />);
    expect(screen.getByRole('status').textContent).toBe(
      `Showing all ${allProjects.length} projects`
    );
    expect(
      screen.getByRole('button', { name: /^All/ }).getAttribute('aria-pressed')
    ).toBe('true');
  });

  it('derives the active filter from ?category= and announces its count', () => {
    routerState.query = { category: 'games' };
    render(<Projects />);
    const count = countInCategory('games');
    expect(screen.getByRole('status').textContent).toBe(
      `Showing ${count} projects in ${projectCategoryLabels.games}`
    );
    expect(
      screen
        .getByRole('button', { name: new RegExp(projectCategoryLabels.games) })
        .getAttribute('aria-pressed')
    ).toBe('true');
  });

  it('pushes a history entry on filter click instead of replacing', () => {
    render(<Projects />);
    fireEvent.click(screen.getByRole('button', { name: /^Featured/ }));
    expect(routerState.replace).not.toHaveBeenCalled();
    expect(routerState.push).toHaveBeenCalledTimes(1);
    expect(routerState.push).toHaveBeenCalledWith(
      { pathname: '/projects', query: { category: 'featured' } },
      undefined,
      { shallow: true, scroll: false }
    );
  });

  it('removes the category param when switching back to All', () => {
    routerState.query = { category: 'web' };
    render(<Projects />);
    fireEvent.click(screen.getByRole('button', { name: /^All/ }));
    expect(routerState.push).toHaveBeenCalledTimes(1);
    const [url] = routerState.push.mock.calls[0];
    expect(url).toEqual({ pathname: '/projects', query: {} });
  });

  it('ignores clicks on the already-active filter', () => {
    routerState.query = { category: 'ai' };
    render(<Projects />);
    fireEvent.click(
      screen.getByRole('button', {
        name: new RegExp(projectCategoryLabels.ai),
      })
    );
    expect(routerState.push).not.toHaveBeenCalled();
    expect(routerState.replace).not.toHaveBeenCalled();
  });

  it('keeps the featured count badge and list in sync with the filter', () => {
    routerState.query = { category: 'featured' };
    render(<Projects />);
    expect(screen.getByRole('status').textContent).toBe(
      `Showing ${featuredProjects.length} projects in Featured`
    );
  });

  it('renders the unfiltered view before the router is ready, even with a category in the URL', () => {
    routerState.isReady = false;
    routerState.query = {};
    window.history.pushState({}, '', '/projects?category=coursework');
    render(<Projects />);
    // The server renders the unfiltered view, so the first client render
    // must match it — reading the category from the address bar pre-ready
    // caused React hydration error #418 on direct loads of filtered URLs.
    expect(screen.getByRole('status').textContent).toBe(
      `Showing all ${allProjects.length} projects`
    );
    expect(
      screen.getByRole('button', { name: /^All/ }).getAttribute('aria-pressed')
    ).toBe('true');
  });

  it('applies the URL category once the router becomes ready', () => {
    routerState.isReady = false;
    routerState.query = {};
    window.history.pushState({}, '', '/projects?category=coursework');
    const { rerender } = render(<Projects />);
    routerState.isReady = true;
    routerState.query = { category: 'coursework' };
    rerender(<Projects />);
    const count = countInCategory('coursework');
    expect(screen.getByRole('status').textContent).toBe(
      `Showing ${count} projects in ${projectCategoryLabels.coursework}`
    );
  });
});

describe('Projects tiers', () => {
  it('assigns every project to exactly one tier — 15 production, 8 archival', () => {
    expect(allProjects.length).toBe(23);
    const production = allProjects.filter((p) => p.tier === 'production');
    const archival = allProjects.filter((p) => p.tier === 'archival');
    expect(production.length).toBe(15);
    expect(archival.length).toBe(8);
    expect(production.length + archival.length).toBe(allProjects.length);
    // The featured cards are all production-tier work.
    expect(
      featuredProjects.every((p) => p.tier === 'production')
    ).toBe(true);
  });

  it('renders the default view as Featured, then Production, then Archival, covering all 23 projects once', () => {
    render(<Projects />);
    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((h) => h.textContent);
    expect(headings).toEqual([
      'Featured Projects',
      projectTierLabels.production,
      projectTierLabels.archival,
    ]);
    // One h3 per project card, no duplicates, no project missing.
    const cardTitles = screen
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent);
    expect(cardTitles.length).toBe(23);
    expect(new Set(cardTitles).size).toBe(23);
    for (const project of allProjects) {
      expect(cardTitles).toContain(project.name);
    }
  });

  it('keeps the early learning work in the archival group, not the production group', () => {
    render(<Projects />);
    // The section is identified by aria-labelledby; the id itself lives
    // on the heading inside it.
    const productionSection = document.querySelector(
      'section[aria-labelledby="group-production"]'
    );
    const archivalSection = document.querySelector(
      'section[aria-labelledby="group-archival"]'
    );
    expect(productionSection).not.toBeNull();
    expect(archivalSection).not.toBeNull();
    for (const name of [
      'Currency Converter (Learning React Project)',
      'Rock, Paper, Scissors (Learning React Project)',
      'Sales Tax Calculator (UCLA CS31 Project)',
      'My Personal LeetCode Solutions',
    ]) {
      expect(archivalSection!.textContent).toContain(name);
      expect(productionSection!.textContent).not.toContain(name);
    }
    for (const name of [
      'PreMiD Presence Open-Source Contribution',
      'Company Careers Portal (Paid Client Project)',
    ]) {
      expect(productionSection!.textContent).toContain(name);
      expect(archivalSection!.textContent).not.toContain(name);
    }
    // Featured work still leads the page in its own section.
    const featuredSection = document.querySelector(
      'section[aria-labelledby="group-featured"]'
    );
    expect(featuredSection).not.toBeNull();
    for (const name of [
      'CutieBot (Discord Bot Application)',
      'CompAnIon (Learning Platform POC)',
    ]) {
      expect(featuredSection!.textContent).toContain(name);
    }
  });
});
