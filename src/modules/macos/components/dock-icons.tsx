"use client"

// macOS Sonoma-style dock icons recreated as SVG.
// Each is a 48x48 squircle with a glyph evoking the real Apple icon.

type IconKind =
  | "finder"
  | "safari"
  | "mail"
  | "notes"
  | "calendar"
  | "calc"
  | "music"
  | "terminal"
  | "book"
  | "settings"
  | "trash"
  | "photos"

interface IconProps {
  kind: IconKind
}

const SQUIRCLE = "M 18 0 H 30 Q 48 0 48 18 V 30 Q 48 48 30 48 H 18 Q 0 48 0 30 V 18 Q 0 0 18 0 Z"

function FinderIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <linearGradient id="finderBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9bd2ff" />
          <stop offset="0.5" stopColor="#1d6ec3" />
          <stop offset="1" stopColor="#0e4a8e" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill="#dceaf7" />
      <path d="M 24 0 H 30 Q 48 0 48 18 V 30 Q 48 48 30 48 H 24 Z" fill="url(#finderBg)" />
      <ellipse cx="18" cy="22" rx="2.4" ry="3.6" fill="#0a2f57" />
      <ellipse cx="30" cy="22" rx="2.4" ry="3.6" fill="#0a2f57" />
      <path d="M 23 28 Q 24 30 25 28" stroke="#0a2f57" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function SafariIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <radialGradient id="safariBg" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3aa6ff" />
          <stop offset="1" stopColor="#075cb0" />
        </radialGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#safariBg)" />
      <circle cx="24" cy="24" r="16" fill="#f3f7fb" />
      <circle cx="24" cy="24" r="14" fill="none" stroke="#1d6ec3" strokeWidth="0.6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 12
        const x1 = 24 + 13 * Math.sin(angle)
        const y1 = 24 - 13 * Math.cos(angle)
        const x2 = 24 + 15 * Math.sin(angle)
        const y2 = 24 - 15 * Math.cos(angle)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1d6ec3" strokeWidth="0.6" />
      })}
      <polygon points="24,12 26,24 24,36 22,24" fill="#dc3545" />
      <polygon points="24,36 26,24 22,24" fill="#dcdcdc" />
      <circle cx="24" cy="24" r="1.5" fill="#fff" stroke="#1d6ec3" strokeWidth="0.5" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <linearGradient id="mailBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#79c8ff" />
          <stop offset="1" stopColor="#157af3" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#mailBg)" />
      <rect x="9" y="16" width="30" height="18" rx="2" fill="white" stroke="#0e4a8e" strokeWidth="0.5" />
      <polyline points="9,18 24,28 39,18" fill="none" stroke="#1d6ec3" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

function NotesIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <linearGradient id="notesBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff5b3" />
          <stop offset="0.45" stopColor="#ffd84a" />
          <stop offset="1" stopColor="#e0a800" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#notesBg)" />
      <rect x="10" y="10" width="28" height="32" rx="2" fill="#fffdf6" stroke="#caa600" strokeWidth="0.5" />
      {[16, 20, 24, 28, 32, 36].map((y) => (
        <line key={y} x1="14" y1={y} x2="34" y2={y} stroke="#d9b54a" strokeWidth="0.7" />
      ))}
    </svg>
  )
}

function CalendarIcon() {
  const day = new Date().getDate()
  const wd = new Date().toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <path d={SQUIRCLE} fill="white" />
      <rect x="0" y="0" width="48" height="14" fill="#dc3545" />
      <text
        x="24"
        y="10"
        fontSize="6"
        fontWeight="700"
        textAnchor="middle"
        fill="white"
        fontFamily="Helvetica, Arial, sans-serif"
      >
        {wd}
      </text>
      <text
        x="24"
        y="38"
        fontSize="22"
        fontWeight="300"
        textAnchor="middle"
        fill="#222"
        fontFamily="Helvetica, Arial, sans-serif"
      >
        {day}
      </text>
    </svg>
  )
}

function CalcIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <path d={SQUIRCLE} fill="#1c1c1e" />
      <rect x="6" y="6" width="36" height="9" rx="1" fill="#0a0a0a" />
      <text
        x="40"
        y="13"
        fontSize="8"
        textAnchor="end"
        fill="#fff"
        fontFamily="Helvetica, Arial, sans-serif"
      >
        0
      </text>
      {[18, 26, 34].map((y) =>
        [7, 16, 25].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="7" height="7" rx="1.5" fill="#3a3a3c" />
        )),
      )}
      {[18, 26, 34].map((y) => (
        <rect key={y} x="34" y={y} width="7" height="7" rx="1.5" fill="#ff9f0a" />
      ))}
    </svg>
  )
}

function MusicIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <linearGradient id="musicBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff67aa" />
          <stop offset="1" stopColor="#ec1e63" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#musicBg)" />
      <ellipse cx="18" cy="32" rx="5" ry="4" fill="white" />
      <ellipse cx="30" cy="35" rx="5" ry="4" fill="white" />
      <line x1="23" y1="32" x2="35" y2="35" stroke="white" strokeWidth="1.6" />
      <rect x="22" y="13" width="2" height="20" fill="white" />
      <rect x="34" y="16" width="2" height="20" fill="white" />
    </svg>
  )
}

function TerminalIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <linearGradient id="termBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5c5c5e" />
          <stop offset="1" stopColor="#1c1c1e" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#termBg)" />
      <rect x="6" y="10" width="36" height="28" rx="1.5" fill="#0a0a0a" />
      <rect x="6" y="10" width="36" height="3" fill="#3a3a3c" />
      <circle cx="9" cy="11.5" r="0.8" fill="#ff5f56" />
      <circle cx="11.5" cy="11.5" r="0.8" fill="#ffbd2e" />
      <circle cx="14" cy="11.5" r="0.8" fill="#27ca40" />
      <text x="9" y="26" fontSize="9" fontFamily="'JetBrains Mono', monospace" fill="white">
        &gt;_
      </text>
    </svg>
  )
}

function BookIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <linearGradient id="bookBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd97a" />
          <stop offset="1" stopColor="#c98410" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#bookBg)" />
      <rect x="11" y="10" width="13" height="28" fill="#fff" stroke="#7a4f06" strokeWidth="0.5" />
      <rect x="24" y="10" width="13" height="28" fill="#fff" stroke="#7a4f06" strokeWidth="0.5" />
      {[14, 18, 22, 26, 30, 34].map((y) => (
        <line key={`l-${y}`} x1="13" y1={y} x2="22" y2={y} stroke="#bbb" strokeWidth="0.5" />
      ))}
      {[14, 18, 22, 26, 30, 34].map((y) => (
        <line key={`r-${y}`} x1="26" y1={y} x2="35" y2={y} stroke="#bbb" strokeWidth="0.5" />
      ))}
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <linearGradient id="settBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfcfd1" />
          <stop offset="1" stopColor="#7d7d80" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#settBg)" />
      <g transform="translate(24,24)">
        <g fill="#f5f5f7" stroke="#3c3c3e" strokeWidth="0.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x="-2.5"
              y="-15"
              width="5"
              height="6"
              rx="1"
              transform={`rotate(${i * 45})`}
            />
          ))}
          <circle r="9" />
        </g>
        <circle r="3.5" fill="#3c3c3e" />
      </g>
    </svg>
  )
}

function PhotosIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <path d={SQUIRCLE} fill="white" />
      {[
        { c: "#ff3b30", r: 0 },
        { c: "#ff9500", r: 45 },
        { c: "#ffcc00", r: 90 },
        { c: "#34c759", r: 135 },
        { c: "#5ac8fa", r: 180 },
        { c: "#007aff", r: 225 },
        { c: "#5856d6", r: 270 },
        { c: "#af52de", r: 315 },
      ].map(({ c, r }, i) => (
        <ellipse
          key={i}
          cx="24"
          cy="13"
          rx="5"
          ry="9"
          fill={c}
          opacity="0.85"
          transform={`rotate(${r} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="3" fill="white" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <linearGradient id="trashBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5f5f7" />
          <stop offset="1" stopColor="#bcbcc0" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#trashBg)" />
      <rect x="14" y="10" width="20" height="2" rx="1" fill="#3c3c3e" />
      <rect x="20" y="7" width="8" height="3" rx="1" fill="#3c3c3e" />
      <path d="M 16 14 L 18 39 H 30 L 32 14 Z" fill="none" stroke="#3c3c3e" strokeWidth="1.4" />
      {[18, 22, 26, 30].map((y) => (
        <line key={y} x1="17" y1={y} x2="31" y2={y} stroke="#3c3c3e" strokeWidth="0.5" />
      ))}
      {[20, 24, 28].map((x) => (
        <line key={x} x1={x} y1="14" x2={x} y2="38" stroke="#3c3c3e" strokeWidth="0.5" />
      ))}
    </svg>
  )
}

export function DockIcon({ kind }: IconProps) {
  switch (kind) {
    case "finder":
      return <FinderIcon />
    case "safari":
      return <SafariIcon />
    case "mail":
      return <MailIcon />
    case "notes":
      return <NotesIcon />
    case "calendar":
      return <CalendarIcon />
    case "calc":
      return <CalcIcon />
    case "music":
      return <MusicIcon />
    case "terminal":
      return <TerminalIcon />
    case "book":
      return <BookIcon />
    case "settings":
      return <SettingsIcon />
    case "photos":
      return <PhotosIcon />
    case "trash":
      return <TrashIcon />
  }
}

export const APPLE_PATH =
  "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
