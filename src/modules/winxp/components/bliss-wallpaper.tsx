"use client"

/**
 * SVG Bliss-style wallpaper — sky gradient + soft clouds + rolling green hill.
 * Recreates the iconic Charles O'Rear photo using only vectors.
 */
export function BlissWallpaper() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e76b8" />
            <stop offset="55%" stopColor="#7cc7e6" />
            <stop offset="100%" stopColor="#cfeefa" />
          </linearGradient>
          <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5BB047" />
            <stop offset="60%" stopColor="#3D9E1B" />
            <stop offset="100%" stopColor="#236E12" />
          </linearGradient>
          <radialGradient id="glow" cx="0.5" cy="0.5" r="0.7">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#sky)" />
        <ellipse cx="400" cy="180" rx="500" ry="140" fill="url(#glow)" />
        {/* Clouds */}
        <ellipse cx="180" cy="120" rx="60" ry="14" fill="white" opacity="0.7" />
        <ellipse cx="160" cy="115" rx="40" ry="10" fill="white" opacity="0.6" />
        <ellipse cx="600" cy="90" rx="80" ry="16" fill="white" opacity="0.7" />
        <ellipse cx="630" cy="100" rx="50" ry="12" fill="white" opacity="0.5" />
        {/* Hill */}
        <path d="M -50 500 Q 200 280 500 320 Q 750 350 850 290 L 850 500 Z" fill="url(#hill)" />
        <path
          d="M -50 500 Q 200 290 500 320 Q 750 350 850 290 L 850 500 Z"
          fill="#3D9E1B"
          opacity="0.4"
        />
        <path
          d="M -50 500 L -50 360 Q 100 310 240 340 Q 380 360 500 340 L 500 500 Z"
          fill="#2E7B14"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}
