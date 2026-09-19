import { useState, useEffect } from 'react';

/**
 * Minimal client-side router using the History API.
 * Returns the current pathname and a navigate() function.
 */
export function useRouter() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to) => {
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to);
      setPathname(to);
    }
  };

  return { pathname, navigate };
}
