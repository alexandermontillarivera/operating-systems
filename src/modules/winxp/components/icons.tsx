// XP-style icons (Luna theme): rounded, glossy, color-rich.

interface IconProps {
  size?: number
}

export function MyComputerIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="xp-mon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5f5f5" />
          <stop offset="1" stopColor="#909090" />
        </linearGradient>
        <linearGradient id="xp-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5fb7ff" />
          <stop offset="1" stopColor="#0e4a8e" />
        </linearGradient>
      </defs>
      <rect x="3" y="4" width="26" height="18" rx="1" fill="url(#xp-mon)" stroke="#404858" strokeWidth="0.6" />
      <rect x="5" y="6" width="22" height="13" fill="url(#xp-screen)" />
      <ellipse cx="22" cy="13" rx="3" ry="2" fill="#fff" opacity="0.5" />
      <rect x="13" y="22" width="6" height="2" fill="#7d818c" />
      <rect x="9" y="24" width="14" height="2" fill="#7d818c" />
    </svg>
  )
}

export function FolderIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="xp-folder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe98e" />
          <stop offset="1" stopColor="#d49328" />
        </linearGradient>
      </defs>
      <path d="M 3 9 H 11 L 14 12 H 29 V 26 H 3 Z" fill="url(#xp-folder)" stroke="#7a4f06" strokeWidth="0.5" />
      <rect x="3" y="13" width="26" height="13" fill="#fff2c0" />
    </svg>
  )
}

export function TrashIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="xp-trash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dadbdf" />
          <stop offset="1" stopColor="#7d818c" />
        </linearGradient>
      </defs>
      <rect x="6" y="7" width="20" height="2" rx="1" fill="url(#xp-trash)" />
      <rect x="13" y="5" width="6" height="2" fill="url(#xp-trash)" />
      <path d="M 7 9 L 9 28 H 23 L 25 9 Z" fill="url(#xp-trash)" stroke="#404858" strokeWidth="0.5" />
      {[12, 16, 20].map((x) => (
        <line key={x} x1={x} y1="11" x2={x} y2="27" stroke="#404858" strokeWidth="0.6" />
      ))}
    </svg>
  )
}

export function IEIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" shapeRendering="geometricPrecision">
      <defs>
        <radialGradient id="xp-ie" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#5fb1ff" />
          <stop offset="1" stopColor="#0e4a8e" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="15" fill="url(#xp-ie)" />
      <ellipse cx="20" cy="20" rx="16" ry="6" fill="#fbcb22" opacity="0.85" />
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fontSize="17"
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

export function BookIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="xp-book" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe98e" />
          <stop offset="1" stopColor="#d49328" />
        </linearGradient>
      </defs>
      <rect x="5" y="3" width="22" height="26" rx="0.5" fill="url(#xp-book)" stroke="#7a4f06" strokeWidth="0.6" />
      <rect x="5" y="3" width="22" height="3" fill="#1565b8" />
      {[10, 13, 16, 19, 22, 25].map((y) => (
        <line key={y} x1="8" y1={y} x2={y === 25 ? 22 : 24} y2={y} stroke="#888" strokeWidth="0.6" />
      ))}
    </svg>
  )
}

export function MediaPlayerIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <radialGradient id="xp-wmp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#5fb1ff" />
          <stop offset="1" stopColor="#0e4a8e" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill="url(#xp-wmp)" />
      <polygon points="13,10 24,16 13,22" fill="#fff" />
    </svg>
  )
}

export function PaintIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="xp-paint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff8e1" />
          <stop offset="1" stopColor="#caa66a" />
        </linearGradient>
      </defs>
      <ellipse cx="14" cy="16" rx="11" ry="11" fill="url(#xp-paint)" stroke="#7a4f06" strokeWidth="0.5" />
      <circle cx="11" cy="11" r="2" fill="#dc3545" />
      <circle cx="17" cy="10" r="2" fill="#fbcb22" />
      <circle cx="20" cy="14" r="2" fill="#34c759" />
      <circle cx="20" cy="20" r="2" fill="#1565b8" />
      <circle cx="14" cy="22" r="2" fill="#9141ac" />
    </svg>
  )
}

export function NotepadIcon({ size = 24 }: IconProps) {
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

export function CalcIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <rect x="4" y="3" width="24" height="26" rx="1.5" fill="#dadbdf" stroke="#404858" strokeWidth="0.5" />
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

export function MinesIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <rect x="4" y="4" width="24" height="24" rx="1" fill="#dadbdf" stroke="#404858" strokeWidth="0.5" />
      <circle cx="16" cy="17" r="6" fill="#000" />
      <rect x="14" y="9" width="4" height="2" fill="#000" />
      <rect x="13" y="14" width="2" height="2" fill="#fff" />
      <line x1="16" y1="9" x2="16" y2="6" stroke="#fbcb22" strokeWidth="1.2" />
    </svg>
  )
}

export function SolitaireIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      {[5, 8, 11].map((x, i) => (
        <g key={x} transform={`translate(${x},${6 + i * 2})`}>
          <rect width="14" height="20" fill="#fff" stroke="#000" strokeWidth="0.5" />
          <text x="3" y="6" fontSize="5" fontWeight="bold" fill="#dc3545">A</text>
          <text x="3" y="11" fontSize="5" fill="#dc3545">♥</text>
        </g>
      ))}
    </svg>
  )
}

export function OutlookIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="xp-out" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#e0e6ee" />
        </linearGradient>
      </defs>
      <rect x="3" y="6" width="26" height="20" rx="1" fill="url(#xp-out)" stroke="#404858" strokeWidth="0.5" />
      <polyline points="3,6 16,18 29,6" fill="none" stroke="#1565b8" strokeWidth="1.5" strokeLinejoin="round" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontSize="9"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontWeight="bold"
        fill="#1565b8"
      >
        O
      </text>
    </svg>
  )
}

export function MessengerIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <radialGradient id="xp-msn" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#90ee70" />
          <stop offset="1" stopColor="#1a8a1a" />
        </radialGradient>
      </defs>
      <ellipse cx="16" cy="11" rx="9" ry="6" fill="url(#xp-msn)" />
      <ellipse cx="16" cy="11" rx="6" ry="3" fill="#fff" opacity="0.4" />
      <line x1="13" y1="17" x2="13" y2="22" stroke="#1a8a1a" strokeWidth="1.5" />
      <line x1="19" y1="17" x2="19" y2="22" stroke="#1a8a1a" strokeWidth="1.5" />
      <ellipse cx="16" cy="24" rx="6" ry="2" fill="#1a8a1a" />
    </svg>
  )
}

export function MovieMakerIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <rect x="4" y="6" width="24" height="20" rx="1" fill="#1c1c1e" stroke="#404858" strokeWidth="0.5" />
      <polygon points="13,12 22,16 13,20" fill="#fbcb22" />
      {[8, 12, 16, 20, 24].map((x) => (
        <rect key={x} x={x - 1} y="7" width="2" height="2" fill="#3a3a3c" />
      ))}
      {[8, 12, 16, 20, 24].map((x) => (
        <rect key={x} x={x - 1} y="23" width="2" height="2" fill="#3a3a3c" />
      ))}
    </svg>
  )
}

export function ControlPanelIcon({ size = 24 }: IconProps) {
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

import type { AppId } from "@/modules/winxp/types"

const ICON_FOR_APP: Record<AppId, React.ComponentType<{ size?: number }>> = {
  mycomputer: MyComputerIcon,
  mydocs: FolderIcon,
  ie: IEIcon,
  mediaplayer: MediaPlayerIcon,
  paint: PaintIcon,
  notepad: NotepadIcon,
  calc: CalcIcon,
  minesweeper: MinesIcon,
  solitaire: SolitaireIcon,
  history: BookIcon,
  outlook: OutlookIcon,
  messenger: MessengerIcon,
  moviemaker: MovieMakerIcon,
  controlpanel: ControlPanelIcon,
}

/** Resolve any AppId to its icon component (for taskbar / menus). */
export function appIcon(app: AppId, size = 16): React.ReactNode {
  const Comp = ICON_FOR_APP[app]
  return <Comp size={size} />
}
