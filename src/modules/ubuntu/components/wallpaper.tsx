"use client"

/** Aubergine background with the Circle of Friends silhouette. */
export function Wallpaper() {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full z-0"
    >
      <defs>
        <radialGradient id="ubuntu-bg" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0%" stopColor="#5e2750" />
          <stop offset="60%" stopColor="#3a1230" />
          <stop offset="100%" stopColor="#2c001e" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#ubuntu-bg)" />
      <g transform="translate(400, 240)" opacity="0.18">
        <circle r="120" fill="none" stroke="#E95420" strokeWidth="6" />
        <circle r="90" fill="none" stroke="#E95420" strokeWidth="3" />
        <circle cx="90" cy="0" r="22" fill="#E95420" />
        <circle cx="-45" cy="-78" r="22" fill="#E95420" />
        <circle cx="-45" cy="78" r="22" fill="#E95420" />
      </g>
    </svg>
  )
}
