type NavigateOptions = {
  replace?: boolean;
};

/**
 * Minimal client-side navigation without adding a router dependency.
 * Works with history.pushState / popstate and reads window.location.pathname.
 */
export function navigate(to: string, options: NavigateOptions = {}) {
  if (typeof window === 'undefined') return;
  const { replace = false } = options;

  const current = window.location.pathname + window.location.search + window.location.hash;
  if (to === current) return;

  if (replace) window.history.replaceState({}, '', to);
  else window.history.pushState({}, '', to);

  // Notify listeners (our app uses popstate to re-render).
  try {
    window.dispatchEvent(new PopStateEvent('popstate'));
  } catch {
    // Older browsers / restricted environments
    window.dispatchEvent(new Event('popstate'));
  }
}

