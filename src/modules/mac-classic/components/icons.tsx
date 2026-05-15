// Pixel-art SVG icons recreated to evoke the original Mac System 6/7 icon set.
// Pure black & white as on the 1984 Mac (color came in 1987 with Mac II).

interface IconProps {
  size?: number
  className?: string
}

const wrap = (size: number, viewBox: string, children: React.ReactNode, className?: string) => (
  <svg width={size} height={size} viewBox={viewBox} shapeRendering="crispEdges" className={className}>
    {children}
  </svg>
)

/** Solid black apple — the original Mac System 1.0 menu mark. */
export const AppleMarkIcon = ({ size = 14, className }: IconProps) =>
  wrap(
    size,
    "0 0 24 24",
    <path
      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
      fill="black"
    />,
    className,
  )

/** Macintosh hard disk — small monitor + base. */
export const HardDiskIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    "0 0 32 32",
    <g fill="none" stroke="black" strokeWidth="1">
      <rect x="4" y="4" width="24" height="20" fill="white" />
      <rect x="6" y="6" width="20" height="13" fill="white" />
      {/* tiny pixel hatching to evoke screen */}
      <line x1="6" y1="9" x2="26" y2="9" />
      <rect x="9" y="22" width="14" height="2" fill="white" />
      <rect x="11" y="24" width="10" height="3" fill="white" />
      <rect x="9" y="27" width="14" height="1" fill="white" />
    </g>,
    className,
  )

/** Trash can — original was an empty rectangular trash can with vertical lines. */
export const TrashIcon = ({ size = 32, className, full = false }: IconProps & { full?: boolean }) =>
  wrap(
    size,
    "0 0 32 32",
    <g fill="none" stroke="black" strokeWidth="1">
      {/* lid */}
      <rect x="6" y="7" width="20" height="2" fill="white" />
      <rect x="13" y="5" width="6" height="2" fill="white" />
      {/* body */}
      <polygon points="7,9 25,9 23,28 9,28" fill="white" />
      <line x1="11" y1="11" x2="11" y2="27" />
      <line x1="14" y1="11" x2="14" y2="27" />
      <line x1="17" y1="11" x2="17" y2="27" />
      <line x1="20" y1="11" x2="20" y2="27" />
      {full && <rect x="11" y="14" width="10" height="6" fill="black" opacity="0.2" />}
    </g>,
    className,
  )

/** Folder — manilla outline. */
export const FolderIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    "0 0 32 32",
    <g fill="white" stroke="black" strokeWidth="1">
      <polygon points="3,9 11,9 14,12 29,12 29,26 3,26" />
      <line x1="3" y1="14" x2="29" y2="14" />
    </g>,
    className,
  )

/** Document — page with corner fold and Mac-style writing lines. */
export const DocumentIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    "0 0 32 32",
    <g fill="white" stroke="black" strokeWidth="1">
      <polygon points="7,4 21,4 26,9 26,28 7,28 7,4" />
      <polyline points="21,4 21,9 26,9" />
      {/* writing lines */}
      <line x1="9" y1="13" x2="23" y2="13" />
      <line x1="9" y1="16" x2="23" y2="16" />
      <line x1="9" y1="19" x2="23" y2="19" />
      <line x1="9" y1="22" x2="20" y2="22" />
      <line x1="9" y1="25" x2="23" y2="25" />
    </g>,
    className,
  )

/** MacPaint document — page with a brush corner. */
export const PaintDocIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    "0 0 32 32",
    <g fill="white" stroke="black" strokeWidth="1">
      <polygon points="7,4 21,4 26,9 26,28 7,28 7,4" />
      <polyline points="21,4 21,9 26,9" />
      {/* paint brush silhouette */}
      <rect x="11" y="14" width="2" height="8" fill="black" stroke="none" />
      <polygon points="11,11 13,11 14,15 10,15" fill="black" stroke="none" />
      <circle cx="18" cy="20" r="2" fill="black" stroke="none" />
    </g>,
    className,
  )

/** Happy Mac — the classic boot-time mascot. */
export const HappyMacIcon = ({ size = 64, className }: IconProps) =>
  wrap(
    size,
    "0 0 64 64",
    <g fill="white" stroke="black" strokeWidth="2">
      <rect x="6" y="6" width="52" height="52" rx="3" />
      {/* screen */}
      <rect x="12" y="12" width="40" height="32" fill="white" />
      {/* face */}
      <circle cx="22" cy="24" r="2.4" fill="black" stroke="none" />
      <circle cx="42" cy="24" r="2.4" fill="black" stroke="none" />
      <path d="M 18 32 Q 32 42 46 32" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      {/* base */}
      <rect x="22" y="48" width="20" height="4" fill="white" />
      <rect x="20" y="52" width="24" height="3" fill="white" />
      <line x1="14" y1="55" x2="50" y2="55" />
    </g>,
    className,
  )

/** Close box — small empty square with white interior. */
export const CloseBoxIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" shapeRendering="crispEdges">
    <rect x="0" y="0" width="11" height="11" fill="white" stroke="black" />
  </svg>
)

/** Zoom box (no-op visually distinct) — square with inner square. */
export const ZoomBoxIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" shapeRendering="crispEdges">
    <rect x="0" y="0" width="11" height="11" fill="white" stroke="black" />
    <rect x="2" y="2" width="7" height="7" fill="white" stroke="black" />
  </svg>
)
