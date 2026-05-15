// Yaru-style squircle icons for the Ubuntu dock.

type Kind =
  | "files"
  | "firefox"
  | "terminal"
  | "gedit"
  | "calc"
  | "software"
  | "settings"
  | "book"
  | "trash"

interface DockIconProps {
  kind: Kind
}

const SQUIRCLE = "M 18 0 H 30 Q 48 0 48 18 V 30 Q 48 48 30 48 H 18 Q 0 48 0 30 V 18 Q 0 0 18 0 Z"

function FilesIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <linearGradient id="ufilesBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d5d5d" />
          <stop offset="1" stopColor="#3d3d3d" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#ufilesBg)" />
      {/* folder */}
      <path d="M 8 16 H 18 L 21 19 H 40 V 38 H 8 Z" fill="#E95420" />
      <path d="M 8 16 H 18 L 21 19 H 40 V 22 H 8 Z" fill="#ff6c2c" />
      <rect x="8" y="22" width="32" height="16" fill="#fcb88d" />
    </svg>
  )
}

function FirefoxIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <radialGradient id="ffBg" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#ffd23f" />
          <stop offset="0.4" stopColor="#ff7d00" />
          <stop offset="1" stopColor="#c0392b" />
        </radialGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#ffBg)" />
      {/* fox tail swirl */}
      <path
        d="M 24 9 Q 38 12 38 24 Q 38 38 24 39 Q 12 38 10 26 Q 14 14 24 9 Z"
        fill="none"
        stroke="#3a1f00"
        strokeWidth="2.5"
      />
      <path
        d="M 24 12 Q 34 15 34 24 Q 34 33 24 35 Q 15 33 14 25 Q 16 17 24 12 Z"
        fill="#1565a8"
      />
      <circle cx="24" cy="24" r="3" fill="#fff" />
    </svg>
  )
}

function TerminalIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <path d={SQUIRCLE} fill="#2d2d2d" />
      <rect x="6" y="10" width="36" height="28" rx="1.5" fill="#300a24" />
      <rect x="6" y="10" width="36" height="3" fill="#3a1532" />
      <text
        x="9"
        y="26"
        fontSize="8"
        fontFamily="'Ubuntu Mono', monospace"
        fill="#dddddd"
      >
        $ _
      </text>
    </svg>
  )
}

function GeditIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <path d={SQUIRCLE} fill="#3584E4" />
      <rect x="11" y="8" width="26" height="32" rx="1" fill="white" />
      {[14, 18, 22, 26, 30, 34].map((y) => (
        <line key={y} x1="14" y1={y} x2={y === 34 ? 28 : 33} y2={y} stroke="#666" strokeWidth="0.7" />
      ))}
      <circle cx="36" cy="14" r="3.5" fill="#E95420" />
    </svg>
  )
}

function CalcIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <path d={SQUIRCLE} fill="#33D17A" />
      <rect x="9" y="9" width="30" height="30" rx="2" fill="#fff" />
      <rect x="11" y="11" width="26" height="7" rx="0.5" fill="#1c1c1e" />
      <text
        x="35"
        y="17"
        fontSize="6"
        textAnchor="end"
        fill="#33D17A"
        fontFamily="'Ubuntu Mono', monospace"
      >
        0
      </text>
      {[20, 27, 34].map((y) =>
        [11, 18, 25, 32].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" rx="0.6" fill="#dcdcdc" />
        )),
      )}
    </svg>
  )
}

function SoftwareIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <linearGradient id="swBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9141ac" />
          <stop offset="1" stopColor="#613583" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#swBg)" />
      {/* gift box */}
      <rect x="11" y="20" width="26" height="20" rx="1.5" fill="#fff" />
      <rect x="11" y="20" width="26" height="5" fill="#E95420" />
      <rect x="22" y="14" width="4" height="26" fill="#E95420" />
      <path d="M 18 14 Q 24 9 24 14 Q 24 9 30 14 Z" fill="#E95420" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <defs>
        <linearGradient id="setBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#888" />
          <stop offset="1" stopColor="#555" />
        </linearGradient>
      </defs>
      <path d={SQUIRCLE} fill="url(#setBg)" />
      <g transform="translate(24,24)">
        <g fill="#fff" stroke="#333" strokeWidth="0.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x="-2.5" y="-15" width="5" height="6" rx="1" transform={`rotate(${i * 45})`} />
          ))}
          <circle r="9" />
        </g>
        <circle r="3.5" fill="#333" />
      </g>
    </svg>
  )
}

function BookIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <path d={SQUIRCLE} fill="#E95420" />
      <rect x="11" y="10" width="26" height="28" fill="#fff" stroke="#7a2d0a" strokeWidth="0.8" />
      <rect x="11" y="10" width="26" height="4" fill="#772953" />
      {[18, 22, 26, 30, 34].map((y) => (
        <line key={y} x1="14" y1={y} x2={y === 34 ? 28 : 33} y2={y} stroke="#888" strokeWidth="0.7" />
      ))}
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-lg">
      <path d={SQUIRCLE} fill="#666" />
      <rect x="14" y="10" width="20" height="2" rx="1" fill="#fff" />
      <rect x="20" y="7" width="8" height="3" rx="1" fill="#fff" />
      <path d="M 16 14 L 18 39 H 30 L 32 14 Z" fill="none" stroke="#fff" strokeWidth="1.4" />
      {[20, 24, 28].map((x) => (
        <line key={x} x1={x} y1="16" x2={x} y2="38" stroke="#fff" strokeWidth="0.6" />
      ))}
    </svg>
  )
}

export function UbuntuIcon({ kind }: DockIconProps) {
  switch (kind) {
    case "files":
      return <FilesIcon />
    case "firefox":
      return <FirefoxIcon />
    case "terminal":
      return <TerminalIcon />
    case "gedit":
      return <GeditIcon />
    case "calc":
      return <CalcIcon />
    case "software":
      return <SoftwareIcon />
    case "settings":
      return <SettingsIcon />
    case "book":
      return <BookIcon />
    case "trash":
      return <TrashIcon />
  }
}
