import { useSyncExternalStore } from 'react';

function subscribe() {
  return () => {};
}

/**
 * True once the component has hydrated on the client; false during SSR and
 * the first (server-matched) render. Used to gate client-only enhancements
 * (e.g. motion entrance animations) so statically exported HTML is never
 * rendered in a hidden initial state.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export default useMounted;
