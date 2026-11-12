import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Unmount rendered trees between tests (RTL's automatic cleanup only
// registers when framework globals are enabled; these tests import
// explicitly instead).
afterEach(() => {
  cleanup();
});

// jsdom gaps used by the components under test:
// - IntersectionObserver: motion's useInView and TechMarquee construct
//   one; jsdom ships none. The stub never fires, so nothing is ever
//   reported off-screen.
// - matchMedia: motion's useReducedMotion reads it. The stub answers
//   "no-preference" queries as matching and everything else as not, i.e.
//   reduced motion is OFF, so the interactive branches render.

class IntersectionObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverStub,
});
globalThis.IntersectionObserver =
  IntersectionObserverStub as unknown as typeof IntersectionObserver;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: query.includes('no-preference'),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
