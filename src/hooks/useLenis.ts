// lib/lenis.ts
import Lenis from '@studio-freight/lenis';

let lenisInstance: Lenis | null = null;

/**
 * Initialize Lenis (singleton).
 */
export function initLenis() {
  if (typeof window === 'undefined') return null;

  if (!lenisInstance) {
    lenisInstance = new Lenis({
      duration: 1.8,                                 // easing duration
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      orientation: 'vertical',                       // scroll axis
      gestureOrientation: 'vertical',                // touch axis
      smoothWheel: true,                             // wheel smoothing
      wheelMultiplier: 1.5,                          // amplify wheel scroll
      touchMultiplier: 2,                            // amplify touch scroll
      infinite: false,
    });

    // disable native CSS smooth scroll
    document.documentElement.style.scrollBehavior = 'auto';

    // start the RAF loop
    const frame = (time: number) => {
      lenisInstance!.raf(time);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  return lenisInstance;
}

/**
 * Destroy Lenis instance (cleanup).
 */
export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
