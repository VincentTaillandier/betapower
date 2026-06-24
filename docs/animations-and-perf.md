# Animations & Performance

> **Trigger:** Read this before any change to a visual component, animation, or entry reveal.

## Two Animation Patterns

### 1. CSS-only at mount — for above-the-fold / hero content

Use a CSS class that animates automatically when the element is rendered. No JS state, no `useEffect`.

```css
/* globals.css */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 1.1s cubic-bezier(0.33, 1, 0.68, 1) both;
}
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up { animation: none; opacity: 1; transform: none; filter: none; }
}
```

Usage: `<div className="animate-fade-in-up">…</div>`

For staggered reveals, add `style={{ animationDelay: '120ms' }}` (increments of ~110–180 ms per item depending on context — see README for the tuning table).

Hero sections, `<h1>` blocks, and anything above the fold **must** use this pattern. The element starts visible in the HTML paint — the animation is purely cosmetic.

### 2. IntersectionObserver + CSS transitions — for below-the-fold content

Reserved for large lists where cards are genuinely off-screen at page load (typically 6+ items). If a list is short enough that all cards are visible in the initial viewport (e.g. 2–3 items), use pattern 1 with stagger instead — the IO fires once at mount and never re-triggers, so cards stay stuck at `opacity-0`.

```tsx
const [visible, setVisible] = useState(false)
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setVisible(true) },
    { threshold: 0.15 }
  )
  observer.observe(ref.current!)
  return () => observer.disconnect()
}, [])

// Class applied:
// visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
// + transition-all duration-700 ease-out
```

Use `transitionDelay: \`${index * 150}ms\`` for staggered reveals.

**This pattern is fine for genuinely off-screen cards and sections.** It is FORBIDDEN for anything that is visible on first paint.

> **Note:** `components/ProjetsContent.tsx` previously used this pattern for `ProjectCard`. It was replaced with pattern 1 + stagger because with only 2 projects the cards are always in the initial viewport and the IO never re-triggered after hydration, leaving cards permanently invisible.

## The LCP Rule — Details

**Bug history:** Using `opacity-0` + JS-toggled `opacity-100` on the hero `<h1>` pushed LCP to ~6 s because the browser considered the element invisible until JS ran.

**The invariant:** The LCP candidate (largest visible element on initial viewport) must be painted by the browser without waiting for JavaScript. CSS animations are fine — the browser paints the frame and the animation runs. JS state that gates visibility is not fine.

**How to check:** If you add `opacity-0` to any element that could be above the fold, ask: "Is this toggled by a `useState` / `useEffect`?" If yes, switch to `animate-fade-in-up`.

## prefers-reduced-motion

Wrap motion in `@media (prefers-reduced-motion: reduce)` overrides in `globals.css` when adding new animations:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up { animation: none; }
}
```

## Measuring LCP

```bash
# Lighthouse CLI (requires Chrome)
npx lighthouse http://localhost:3000 --only-categories=performance --output=json | jq '.categories.performance.score, .audits["largest-contentful-paint"].displayValue'
```

Target: LCP < 2.5 s on a simulated 4G throttled connection.

## Bundle Analysis

```bash
ANALYZE=true npm run build
```

Opens a treemap in the browser. Use when:
- Adding a new dependency
- Code-splitting a heavy component (e.g. `react-markdown` is already split off non-content pages)
- Suspecting a large chunk is being pulled into the main bundle
