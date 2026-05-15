// Win 7 / Aero-style SVG icons. Glossy, slightly rounded, blue accents.

type Kind =
  | "computer"
  | "documents"
  | "ie"
  | "notepad"
  | "calc"
  | "paint"
  | "history"
  | "controlpanel"
  | "wmplayer"
  | "explorer"

interface IconProps {
  kind: Kind
  size?: number
}

function Computer({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="w7-mon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dadbdf" />
          <stop offset="1" stopColor="#7d818c" />
        </linearGradient>
        <linearGradient id="w7-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5fb7ff" />
          <stop offset="1" stopColor="#1a4d8a" />
        </linearGradient>
      </defs>
      <rect x="3" y="4" width="26" height="18" rx="1.5" fill="url(#w7-mon)" stroke="#404858" strokeWidth="0.5" />
      <rect x="5" y="6" width="22" height="13" rx="0.5" fill="url(#w7-screen)" />
      {/* Win 7 flag inside screen */}
      <g transform="translate(14,11) skewY(-8) scale(0.9)">
        <rect x="0" y="0" width="3" height="3" fill="#ff8a3a" />
        <rect x="3.5" y="0" width="3" height="3" fill="#69d04a" />
        <rect x="0" y="3.5" width="3" height="3" fill="#5cb8ff" />
        <rect x="3.5" y="3.5" width="3" height="3" fill="#ffd84a" />
      </g>
      {/* stand */}
      <rect x="13" y="22" width="6" height="2" fill="#7d818c" />
      <rect x="9" y="24" width="14" height="2" rx="0.5" fill="#7d818c" />
    </svg>
  )
}

function Documents({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="w7-folder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe98e" />
          <stop offset="1" stopColor="#d49328" />
        </linearGradient>
      </defs>
      <path d="M 3 9 H 11 L 14 12 H 29 V 26 H 3 Z" fill="url(#w7-folder)" stroke="#7a4f06" strokeWidth="0.5" />
      <rect x="3" y="13" width="26" height="13" fill="#fff2c0" />
    </svg>
  )
}

function IE({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <radialGradient id="w7-ie" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#5fb1ff" />
          <stop offset="1" stopColor="#0e4a8e" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="12" fill="url(#w7-ie)" />
      {/* the ribbon */}
      <ellipse cx="16" cy="16" rx="13" ry="5" fill="#fbcb22" opacity="0.9" />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fontSize="14"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fill="white"
        fontWeight="bold"
      >
        e
      </text>
    </svg>
  )
}

function Notepad({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <rect x="6" y="3" width="20" height="26" rx="1" fill="white" stroke="#404040" strokeWidth="0.5" />
      <rect x="6" y="3" width="20" height="3" fill="#1565b8" />
      {[10, 13, 16, 19, 22, 25].map((y) => (
        <line key={y} x1="9" y1={y} x2={y === 25 ? 19 : 23} y2={y} stroke="#909090" strokeWidth="0.7" />
      ))}
    </svg>
  )
}

function Calc({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <rect x="4" y="3" width="24" height="26" rx="2" fill="#dadbdf" stroke="#404858" strokeWidth="0.5" />
      <rect x="6" y="5" width="20" height="6" rx="0.5" fill="#fff" />
      <text x="24" y="10" textAnchor="end" fontSize="6" fill="#1a4d8a" fontFamily="monospace">
        0
      </text>
      {[14, 19, 24].map((y) =>
        [6, 11, 16, 21].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="0.5" fill="#fff" stroke="#404858" strokeWidth="0.4" />
        )),
      )}
    </svg>
  )
}

function Paint({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="w7-paint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff8e1" />
          <stop offset="1" stopColor="#caa66a" />
        </linearGradient>
      </defs>
      <ellipse cx="14" cy="16" rx="11" ry="11" fill="url(#w7-paint)" stroke="#7a4f06" strokeWidth="0.5" />
      <circle cx="11" cy="11" r="2" fill="#dc3545" />
      <circle cx="17" cy="10" r="2" fill="#fbcb22" />
      <circle cx="20" cy="14" r="2" fill="#34c759" />
      <circle cx="20" cy="20" r="2" fill="#1565b8" />
      <circle cx="14" cy="22" r="2" fill="#9141ac" />
      <line x1="22" y1="3" x2="29" y2="10" stroke="#5d4126" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="20" y="4" width="3" height="2" fill="#3a3a3c" transform="rotate(45 21.5 5)" />
    </svg>
  )
}

function History({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <rect x="5" y="4" width="22" height="24" rx="1" fill="#fff" stroke="#5d4126" strokeWidth="0.7" />
      <rect x="5" y="4" width="22" height="4" fill="#1565b8" />
      {[12, 15, 18, 21, 24].map((y) => (
        <line key={y} x1="8" y1={y} x2={y === 24 ? 21 : 24} y2={y} stroke="#888" strokeWidth="0.6" />
      ))}
    </svg>
  )
}

function ControlPanel({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <g transform="translate(16,16)">
        <g fill="#dadbdf" stroke="#404858" strokeWidth="0.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x="-1.8" y="-12" width="3.6" height="5" rx="0.6" transform={`rotate(${i * 45})`} />
          ))}
          <circle r="7" />
        </g>
        <circle r="2.5" fill="#1565b8" />
      </g>
    </svg>
  )
}

function MediaPlayer({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <radialGradient id="w7-wmp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#5fb1ff" />
          <stop offset="1" stopColor="#0e4a8e" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill="url(#w7-wmp)" />
      <polygon points="13,10 24,16 13,22" fill="#fff" />
    </svg>
  )
}

function Explorer({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="w7-explorer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe98e" />
          <stop offset="1" stopColor="#d49328" />
        </linearGradient>
      </defs>
      <path d="M 3 9 H 11 L 14 12 H 29 V 26 H 3 Z" fill="url(#w7-explorer)" stroke="#7a4f06" strokeWidth="0.5" />
      <rect x="6" y="14" width="20" height="11" fill="#fff" stroke="#aaa" strokeWidth="0.4" />
      {[16, 19, 22].map((y) => (
        <line key={y} x1="8" y1={y} x2="24" y2={y} stroke="#bbb" strokeWidth="0.5" />
      ))}
    </svg>
  )
}

export function Win7Icon({ kind, size = 32 }: IconProps) {
  switch (kind) {
    case "computer":
      return <Computer size={size} />
    case "documents":
      return <Documents size={size} />
    case "ie":
      return <IE size={size} />
    case "notepad":
      return <Notepad size={size} />
    case "calc":
      return <Calc size={size} />
    case "paint":
      return <Paint size={size} />
    case "history":
      return <History size={size} />
    case "controlpanel":
      return <ControlPanel size={size} />
    case "wmplayer":
      return <MediaPlayer size={size} />
    case "explorer":
      return <Explorer size={size} />
  }
}
