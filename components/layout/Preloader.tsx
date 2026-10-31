/**
 * First visit of a session only: a lotus draws itself in brass, then two wood
 * panels part. 1.3 seconds, start to finish.
 *
 * There is no React in it. A four-line script in the document head decides
 * whether to run it and flags `<html>` before the first paint, and the rest is
 * CSS. Gating it on an effect instead would mean the page painted, *then* got
 * covered a second later — worse to look at, and it pushes Largest Contentful
 * Paint a second and a half late on a phone.
 *
 * If the script does not run (JavaScript off, blocked storage), nothing shows
 * and the page is simply there — which is the right failure.
 */

/** Runs before paint, in the head. Kept tiny because it is render-blocking. */
export const preloaderScript = `(function(){try{if(sessionStorage.getItem('sarala:seen')==='1')return;sessionStorage.setItem('sarala:seen','1')}catch(e){return}
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var r=document.documentElement;r.classList.add('preloading');
setTimeout(function(){r.classList.remove('preloading');r.classList.add('preloaded')},1300)})()`

const PETALS = [
  'M48 66C34.5 54 34.5 26 48 8c13.5 18 13.5 46 0 58Z',
  'M48 66C37 62 25 50 22.5 34.5 33.5 38 43 50 48 66Z',
  'M48 66C59 62 71 50 73.5 34.5 62.5 38 53 50 48 66Z',
  'M48 66C34 65.5 17 58 8 45.5c13 0.5 29 8.5 40 20.5Z',
  'M48 66c14-0.5 31-8 40-20.5-13 0.5-29 8.5-40 20.5Z',
]

export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <span className="preloader__panel preloader__panel--left" />
      <span className="preloader__panel preloader__panel--right" />

      <div className="preloader__mark">
        <svg viewBox="0 0 96 72" className="h-16 w-20" aria-hidden="true">
          <g
            fill="none"
            stroke="#c9a35f"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {PETALS.map((d, i) => (
              <path key={d} d={d} pathLength={1} style={{ animationDelay: `${i * 0.085}s` }} />
            ))}
          </g>
        </svg>
        <span className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.42em] text-brass/80">
          Sarala · 1986
        </span>
      </div>
    </div>
  )
}
