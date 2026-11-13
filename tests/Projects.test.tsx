import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Projects from '../pages/projects';
import {
  allProjects,
  featuredProjects,
  projectCategoryLabels,
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
