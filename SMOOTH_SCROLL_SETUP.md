# Smooth Scroll Implementation Guide

This project uses **Lenis** (a smooth scroll library) for smooth scrolling. Here's the exact code and configuration you need to use in other projects.

## 📦 Installation

```bash
npm install @studio-freight/lenis
```

**Note:** The package `@studio-freight/lenis` has been deprecated and renamed to `lenis`. For new projects, use:
```bash
npm install lenis
```

## 🔧 Implementation

### 1. Create the Lenis Hook/Utility File

Create a file: `src/hooks/useLenis.ts` (or `.js` for JavaScript)

```typescript
// src/hooks/useLenis.ts
import Lenis from '@studio-freight/lenis'; // or 'lenis' for new projects

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
```

### 2. Initialize in Your Component

Initialize Lenis in your main component (e.g., Navbar, Layout, or App component):

```jsx
import { useEffect } from 'react';
import { initLenis, destroyLenis } from '@/hooks/useLenis';

export default function YourComponent() {
  useEffect(() => {
    initLenis();
    
    return () => {
      destroyLenis();
    };
  }, []);

  return (
    // Your component JSX
  );
}
```

## ⚙️ Configuration Properties

Here are all the Lenis configuration options used in this project:

| Property | Value | Description |
|----------|-------|-------------|
| `duration` | `1.8` | Easing duration in seconds |
| `easing` | `(t) => 1 - Math.pow(1 - t, 3)` | Easing function (easeOutCubic) |
| `orientation` | `'vertical'` | Scroll axis direction |
| `gestureOrientation` | `'vertical'` | Touch gesture axis |
| `smoothWheel` | `true` | Enable smooth wheel scrolling |
| `wheelMultiplier` | `1.5` | Amplify mouse wheel scroll speed |
| `touchMultiplier` | `2` | Amplify touch scroll speed |
| `infinite` | `false` | Disable infinite scrolling |

## 🎨 CSS Configuration

The code automatically disables native CSS smooth scroll:

```javascript
document.documentElement.style.scrollBehavior = 'auto';
```

This ensures Lenis handles all smooth scrolling instead of the browser's native implementation.

## 📝 Additional Smooth Scroll Methods

For programmatic smooth scrolling to elements, you can use:

```javascript
// Get the Lenis instance
const lenis = initLenis();

// Scroll to a specific element
const element = document.getElementById('my-element');
lenis.scrollTo(element, {
  offset: 0,
  duration: 1.8,
  easing: (t) => 1 - Math.pow(1 - t, 3),
});

// Or scroll to a specific position
lenis.scrollTo(1000, {
  duration: 1.8,
});
```

## 🔄 Alternative: Using Native CSS Smooth Scroll

If you prefer a simpler approach without a library, you can use native CSS:

```css
/* In your global CSS file */
html {
  scroll-behavior: smooth;
}
```

Then use JavaScript for programmatic scrolling:

```javascript
element.scrollIntoView({ 
  behavior: 'smooth', 
  block: 'start' 
});
```

## 📚 Additional Resources

- [Lenis Documentation](https://lenis.studiofreight.com/)
- [Lenis NPM Package](https://www.npmjs.com/package/lenis)

---

**Note:** The current project uses `@studio-freight/lenis` v1.0.42, but for new projects, use the newer `lenis` package as `@studio-freight/lenis` is deprecated.



