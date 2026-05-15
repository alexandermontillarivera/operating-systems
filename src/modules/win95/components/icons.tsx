// Pixel-art SVG icons recreated to evoke the original Windows 95 icon set.
// All icons use shapeRendering="crispEdges" for a sharp pixel look.

interface IconProps {
  size?: number
  className?: string
}

const wrap = (size = 32, children: React.ReactNode, className?: string) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    shapeRendering="crispEdges"
    className={className}
  >
    {children}
  </svg>
)

export const StartLogoIcon = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
    {/* Tilted flag — 4 squares */}
    <g transform="translate(0,0)">
      {/* Red */}
      <polygon points="2,2 7,1 7,6 2,7" fill="#E40000" />
      <polygon points="7,1 14,2 14,7 7,6" fill="#22B14C" />
      <polygon points="2,7 7,6 7,12 2,13" fill="#0094FF" />
      <polygon points="7,6 14,7 14,13 7,12" fill="#FFD800" />
      {/* highlights */}
      <polyline points="2,2 7,1 14,2" fill="none" stroke="#fff" strokeOpacity="0.4" />
    </g>
  </svg>
)

export const MyComputerIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      {/* Monitor body */}
      <rect x="3" y="5" width="26" height="18" fill="#cfcfcf" />
      <rect x="3" y="5" width="26" height="1" fill="#fff" />
      <rect x="3" y="5" width="1" height="18" fill="#fff" />
      <rect x="3" y="22" width="26" height="1" fill="#404040" />
      <rect x="28" y="5" width="1" height="18" fill="#404040" />
      {/* Screen */}
      <rect x="5" y="7" width="22" height="13" fill="#0a3a64" />
      <rect x="6" y="8" width="20" height="11" fill="#3a78c0" />
      {/* tiny "C:\>" inside */}
      <rect x="7" y="9" width="1" height="1" fill="#fff" />
      <rect x="8" y="9" width="1" height="1" fill="#fff" />
      <rect x="9" y="10" width="1" height="1" fill="#fff" />
      {/* Stand */}
      <rect x="11" y="23" width="10" height="2" fill="#cfcfcf" />
      <rect x="11" y="23" width="10" height="1" fill="#fff" />
      <rect x="11" y="24" width="10" height="1" fill="#404040" />
      {/* Keyboard */}
      <rect x="6" y="26" width="20" height="3" fill="#cfcfcf" />
      <rect x="6" y="26" width="20" height="1" fill="#fff" />
      <rect x="6" y="28" width="20" height="1" fill="#404040" />
      {[8, 11, 14, 17, 20, 23].map((x) => (
        <rect key={x} x={x} y="27" width="1" height="1" fill="#909090" />
      ))}
      {/* Floppy stack on right */}
      <rect x="24" y="20" width="5" height="5" fill="#cfcfcf" />
      <rect x="24" y="20" width="5" height="1" fill="#fff" />
      <rect x="24" y="20" width="1" height="5" fill="#fff" />
      <rect x="28" y="20" width="1" height="5" fill="#404040" />
      <rect x="24" y="24" width="5" height="1" fill="#404040" />
    </g>,
    className,
  )

export const RecycleBinIcon = ({ size = 32, className, full = false }: IconProps & { full?: boolean }) =>
  wrap(
    size,
    <g>
      {/* Lid */}
      <rect x="6" y="7" width="20" height="2" fill="#cfcfcf" />
      <rect x="6" y="7" width="20" height="1" fill="#fff" />
      <rect x="6" y="8" width="20" height="1" fill="#404040" />
      <rect x="13" y="5" width="6" height="2" fill="#909090" />
      {/* Body trapezoid */}
      <polygon points="7,9 25,9 23,28 9,28" fill="#cfcfcf" />
      <polyline points="7,9 9,28" fill="none" stroke="#fff" />
      <polyline points="25,9 23,28" fill="none" stroke="#404040" />
      <polyline points="9,28 23,28" fill="none" stroke="#404040" />
      {/* Vertical lines */}
      {[12, 16, 20].map((x) => (
        <line key={x} x1={x} y1="11" x2={x} y2="27" stroke="#909090" />
      ))}
      {/* Recycle arrows */}
      {full && (
        <g>
          <polygon points="11,12 14,12 13,15" fill="#0c8" opacity="0.7" />
          <polygon points="20,14 23,14 21,17" fill="#0c8" opacity="0.7" />
        </g>
      )}
    </g>,
    className,
  )

export const FolderIcon = ({ size = 32, className, open = false }: IconProps & { open?: boolean }) =>
  wrap(
    size,
    open ? (
      <g>
        {/* Open folder */}
        <polygon points="3,11 11,11 13,8 19,8 19,11 29,11 29,26 3,26" fill="#fcd34d" />
        <polyline points="3,11 11,11 13,8 19,8 19,11 29,11" fill="none" stroke="#fff" />
        <polyline points="29,11 29,26 3,26 3,11" fill="none" stroke="#a0760a" />
        <polygon points="6,15 30,15 27,28 3,28" fill="#fde68a" />
      </g>
    ) : (
      <g>
        {/* Closed folder */}
        <polygon points="3,9 11,9 14,12 29,12 29,26 3,26" fill="#fcd34d" />
        <polyline points="3,9 11,9 14,12 29,12" fill="none" stroke="#fff" />
        <polyline points="29,12 29,26 3,26 3,9" fill="none" stroke="#a0760a" />
        {/* Front lighter */}
        <rect x="4" y="14" width="24" height="11" fill="#ffe066" />
      </g>
    ),
    className,
  )

export const FileIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      <polygon points="7,4 21,4 26,9 26,28 7,28" fill="#fff" />
      <polyline points="7,4 21,4 26,9 26,28 7,28 7,4" fill="none" stroke="#404040" />
      {/* corner fold */}
      <polygon points="21,4 26,9 21,9" fill="#cfcfcf" />
      <polyline points="21,4 21,9 26,9" fill="none" stroke="#404040" />
      {/* lines */}
      {[12, 14, 16, 18, 20, 22, 24].map((y) => (
        <rect key={y} x="9" y={y} width={y === 24 ? 8 : 14} height="1" fill="#808080" />
      ))}
    </g>,
    className,
  )

export const TextFileIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      <polygon points="7,4 21,4 26,9 26,28 7,28" fill="#fff" />
      <polyline points="7,4 21,4 26,9 26,28 7,28 7,4" fill="none" stroke="#404040" />
      <polygon points="21,4 26,9 21,9" fill="#cfcfcf" />
      <polyline points="21,4 21,9 26,9" fill="none" stroke="#404040" />
      {/* "TXT" looking lines */}
      {[12, 15, 18, 21].map((y) => (
        <rect key={y} x="9" y={y} width="14" height="1" fill="#000" />
      ))}
      {[13, 16, 19].map((y) => (
        <rect key={y} x="9" y={y} width="10" height="1" fill="#a0a0a0" />
      ))}
    </g>,
    className,
  )

export const ExeFileIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      {/* Window-shaped exe icon */}
      <rect x="5" y="6" width="22" height="20" fill="#fff" />
      <rect x="5" y="6" width="22" height="3" fill="#000080" />
      <rect x="5" y="6" width="22" height="3" fill="url(#exegrad)" />
      <defs>
        <linearGradient id="exegrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000080" />
          <stop offset="1" stopColor="#1084d0" />
        </linearGradient>
      </defs>
      <polyline points="5,6 27,6 27,26 5,26 5,6" fill="none" stroke="#404040" />
      {/* tiny flag inside */}
      <g transform="translate(11,12)">
        <polygon points="0,0 4,-1 4,3 0,4" fill="#E40000" />
        <polygon points="4,-1 8,0 8,4 4,3" fill="#22B14C" />
        <polygon points="0,4 4,3 4,7 0,8" fill="#0094FF" />
        <polygon points="4,3 8,4 8,8 4,7" fill="#FFD800" />
      </g>
    </g>,
    className,
  )

export const FloppyIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      <rect x="5" y="5" width="22" height="22" fill="#1a1a1a" />
      <polyline points="5,5 27,5 27,27 5,27 5,5" fill="none" stroke="#fff" strokeOpacity="0.3" />
      <rect x="9" y="5" width="14" height="9" fill="#404040" />
      {/* Metal slider */}
      <rect x="11" y="5" width="4" height="6" fill="#808080" />
      {/* Label */}
      <rect x="8" y="16" width="16" height="9" fill="#cfcfcf" />
      <rect x="8" y="16" width="16" height="2" fill="#909090" />
    </g>,
    className,
  )

export const HardDiskIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      <rect x="3" y="10" width="26" height="14" fill="#cfcfcf" />
      <rect x="3" y="10" width="26" height="1" fill="#fff" />
      <rect x="3" y="10" width="1" height="14" fill="#fff" />
      <rect x="3" y="23" width="26" height="1" fill="#404040" />
      <rect x="28" y="10" width="1" height="14" fill="#404040" />
      <rect x="6" y="13" width="20" height="2" fill="#808080" />
      <rect x="6" y="16" width="20" height="2" fill="#808080" />
      <rect x="6" y="19" width="20" height="2" fill="#808080" />
      {/* status light */}
      <rect x="24" y="20" width="2" height="2" fill="#22B14C" />
    </g>,
    className,
  )

export const CDRomIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      <rect x="3" y="11" width="26" height="12" fill="#cfcfcf" />
      <rect x="3" y="11" width="26" height="1" fill="#fff" />
      <rect x="3" y="22" width="26" height="1" fill="#404040" />
      <rect x="28" y="11" width="1" height="12" fill="#404040" />
      {/* Tray slot */}
      <rect x="7" y="15" width="18" height="1" fill="#404040" />
      {/* Eject button */}
      <rect x="24" y="18" width="3" height="2" fill="#808080" />
      {/* CD on top */}
      <circle cx="16" cy="9" r="6" fill="#e0e0e0" />
      <circle cx="16" cy="9" r="2" fill="#404040" />
      <path d="M 12 6 A 5 5 0 0 1 16 5" stroke="#fff" strokeOpacity="0.6" fill="none" />
    </g>,
    className,
  )

export const NotepadIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      <rect x="6" y="4" width="20" height="24" fill="#fff" />
      <polyline points="6,4 26,4 26,28 6,28 6,4" fill="none" stroke="#000" />
      <rect x="6" y="4" width="20" height="2" fill="#1084d0" />
      {[10, 12, 14, 16, 18, 20, 22, 24].map((y) => (
        <rect key={y} x="9" y={y} width={y === 24 ? 10 : 14} height="1" fill="#a0a0a0" />
      ))}
    </g>,
    className,
  )

export const PaintIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      {/* Palette circle */}
      <circle cx="14" cy="16" r="11" fill="#f4e0c8" />
      <circle cx="14" cy="16" r="11" fill="none" stroke="#404040" />
      <circle cx="11" cy="11" r="2" fill="#E40000" />
      <circle cx="17" cy="10" r="2" fill="#FFD800" />
      <circle cx="20" cy="14" r="2" fill="#22B14C" />
      <circle cx="20" cy="20" r="2" fill="#0094FF" />
      <circle cx="14" cy="22" r="2" fill="#9333ea" />
      {/* Brush */}
      <rect x="22" y="4" width="6" height="2" fill="#808080" transform="rotate(35 24 5)" />
      <rect x="20" y="6" width="3" height="2" fill="#404040" transform="rotate(35 21 7)" />
    </g>,
    className,
  )

export const CalcIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      <rect x="5" y="3" width="22" height="26" fill="#cfcfcf" />
      <rect x="5" y="3" width="22" height="1" fill="#fff" />
      <rect x="5" y="3" width="1" height="26" fill="#fff" />
      <rect x="5" y="28" width="22" height="1" fill="#404040" />
      <rect x="26" y="3" width="1" height="26" fill="#404040" />
      {/* Display */}
      <rect x="8" y="6" width="16" height="4" fill="#abad7d" />
      {/* Buttons */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect key={`${row}-${col}`} x={8 + col * 4} y={12 + row * 4} width="3" height="3" fill="#909090" />
        )),
      )}
    </g>,
    className,
  )

export const MinesIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      <rect x="4" y="4" width="24" height="24" fill="#c0c0c0" />
      <rect x="4" y="4" width="24" height="1" fill="#fff" />
      <rect x="4" y="4" width="1" height="24" fill="#fff" />
      <rect x="4" y="27" width="24" height="1" fill="#404040" />
      <rect x="27" y="4" width="1" height="24" fill="#404040" />
      {/* Bomb */}
      <circle cx="16" cy="17" r="6" fill="#000" />
      <rect x="14" y="9" width="4" height="2" fill="#000" />
      <rect x="13" y="14" width="2" height="2" fill="#fff" />
      {/* Spark */}
      <line x1="16" y1="9" x2="16" y2="6" stroke="#FFD800" strokeWidth="1" />
      <line x1="14" y1="8" x2="13" y2="6" stroke="#FFD800" strokeWidth="1" />
      <line x1="18" y1="8" x2="19" y2="6" stroke="#FFD800" strokeWidth="1" />
    </g>,
    className,
  )

export const SolitaireIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      {[5, 8, 11].map((x, i) => (
        <g key={x} transform={`translate(${x},${6 + i * 2})`}>
          <rect width="14" height="20" fill="#fff" />
          <rect width="14" height="20" fill="none" stroke="#000" />
          <rect x="1" y="1" width="12" height="18" fill="none" stroke="#0a3a64" strokeDasharray="2 1" />
          <text x="3" y="6" fontSize="4" fontWeight="bold" fill="#E40000">A</text>
          <text x="3" y="9" fontSize="4" fill="#E40000">♥</text>
        </g>
      ))}
    </g>,
    className,
  )

export const NetworkIcon = ({ size = 32, className }: IconProps) =>
  wrap(
    size,
    <g>
      {[5, 17].map((x) => (
        <g key={x}>
          <rect x={x} y="14" width="10" height="6" fill="#cfcfcf" />
          <rect x={x} y="14" width="10" height="1" fill="#fff" />
          <rect x={x} y="19" width="10" height="1" fill="#404040" />
          <rect x={x + 1} y="16" width="3" height="2" fill="#404040" />
        </g>
      ))}
      <line x1="10" y1="20" x2="10" y2="25" stroke="#404040" strokeWidth="1" />
      <line x1="22" y1="20" x2="22" y2="25" stroke="#404040" strokeWidth="1" />
      <line x1="6" y1="25" x2="26" y2="25" stroke="#404040" strokeWidth="1" />
      <rect x="13" y="6" width="6" height="6" fill="#22B14C" />
    </g>,
    className,
  )

export const HelpIcon = ({ size = 16 }: IconProps) =>
  wrap(
    size,
    <g>
      <rect x="2" y="2" width="28" height="28" fill="#fff" />
      <rect x="2" y="2" width="28" height="28" fill="none" stroke="#000" />
      <text x="16" y="24" fontSize="22" fontWeight="bold" textAnchor="middle" fill="#0066cc">
        ?
      </text>
    </g>,
  )

export const RunIcon = ({ size = 16 }: IconProps) =>
  wrap(
    size,
    <g>
      <rect x="3" y="6" width="26" height="20" fill="#cfcfcf" />
      <rect x="3" y="6" width="26" height="1" fill="#fff" />
      <rect x="3" y="6" width="1" height="20" fill="#fff" />
      <rect x="3" y="25" width="26" height="1" fill="#404040" />
      <rect x="28" y="6" width="1" height="20" fill="#404040" />
      <rect x="6" y="9" width="20" height="3" fill="#fff" />
      <text x="9" y="11" fontSize="3" fill="#000">{">"}</text>
      {/* Magic wand */}
      <line x1="20" y1="14" x2="26" y2="20" stroke="#FFD800" strokeWidth="2" />
      <circle cx="19" cy="13" r="2" fill="#FFD800" />
    </g>,
  )

export const FindIcon = ({ size = 16 }: IconProps) =>
  wrap(
    size,
    <g>
      <rect x="3" y="3" width="22" height="22" fill="#cfcfcf" />
      <polyline points="3,3 25,3 25,25 3,25 3,3" fill="none" stroke="#404040" />
      <rect x="6" y="6" width="16" height="3" fill="#fff" />
      {/* Magnifier */}
      <circle cx="20" cy="20" r="6" fill="none" stroke="#000" strokeWidth="2" />
      <line x1="24" y1="24" x2="29" y2="29" stroke="#000" strokeWidth="3" />
    </g>,
  )

export const SettingsIcon = ({ size = 16 }: IconProps) =>
  wrap(
    size,
    <g>
      <circle cx="16" cy="16" r="10" fill="#cfcfcf" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="#404040" />
      <circle cx="16" cy="16" r="3" fill="#404040" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <rect
          key={deg}
          x="14.5"
          y="3"
          width="3"
          height="5"
          fill="#cfcfcf"
          stroke="#404040"
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
    </g>,
  )

export const ProgramsIcon = ({ size = 16 }: IconProps) =>
  wrap(
    size,
    <g>
      <rect x="4" y="6" width="24" height="22" fill="#cfcfcf" />
      <rect x="4" y="6" width="24" height="1" fill="#fff" />
      <rect x="4" y="27" width="24" height="1" fill="#404040" />
      <rect x="27" y="6" width="1" height="22" fill="#404040" />
      {[0, 1].map((r) =>
        [0, 1, 2].map((c) => (
          <g key={`${r}-${c}`} transform={`translate(${7 + c * 7},${10 + r * 8})`}>
            <rect width="5" height="5" fill="#fff" />
            <rect width="5" height="2" fill="#000080" />
          </g>
        )),
      )}
    </g>,
  )

export const DocumentsIcon = ({ size = 16 }: IconProps) =>
  wrap(
    size,
    <g transform="scale(0.8) translate(4,4)">
      <FileGlyph />
    </g>,
  )

function FileGlyph() {
  return (
    <g>
      <polygon points="7,4 21,4 26,9 26,28 7,28" fill="#fff" />
      <polyline points="7,4 21,4 26,9 26,28 7,28 7,4" fill="none" stroke="#404040" />
      <polygon points="21,4 26,9 21,9" fill="#cfcfcf" />
      <polyline points="21,4 21,9 26,9" fill="none" stroke="#404040" />
      {[12, 15, 18, 21].map((y) => (
        <rect key={y} x="9" y={y} width="14" height="1" fill="#404040" />
      ))}
    </g>
  )
}

export const ShutdownIcon = ({ size = 16 }: IconProps) =>
  wrap(
    size,
    <g>
      <circle cx="16" cy="16" r="10" fill="#E40000" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="#000" />
      {/* Power symbol */}
      <line x1="16" y1="9" x2="16" y2="16" stroke="#fff" strokeWidth="3" />
      <path d="M 11 13 A 6 6 0 1 0 21 13" stroke="#fff" strokeWidth="3" fill="none" />
    </g>,
  )

export const CloseGlyph = () => (
  <svg width="8" height="7" viewBox="0 0 8 7" shapeRendering="crispEdges">
    <rect x="0" y="0" width="2" height="1" fill="black" />
    <rect x="6" y="0" width="2" height="1" fill="black" />
    <rect x="1" y="1" width="2" height="1" fill="black" />
    <rect x="5" y="1" width="2" height="1" fill="black" />
    <rect x="2" y="2" width="2" height="1" fill="black" />
    <rect x="4" y="2" width="2" height="1" fill="black" />
    <rect x="3" y="3" width="2" height="1" fill="black" />
    <rect x="2" y="4" width="2" height="1" fill="black" />
    <rect x="4" y="4" width="2" height="1" fill="black" />
    <rect x="1" y="5" width="2" height="1" fill="black" />
    <rect x="5" y="5" width="2" height="1" fill="black" />
    <rect x="0" y="6" width="2" height="1" fill="black" />
    <rect x="6" y="6" width="2" height="1" fill="black" />
  </svg>
)

export const MinimizeGlyph = () => (
  <svg width="8" height="7" viewBox="0 0 8 7" shapeRendering="crispEdges">
    <rect x="0" y="6" width="6" height="1" fill="black" />
  </svg>
)

export const MaximizeGlyph = () => (
  <svg width="8" height="7" viewBox="0 0 8 7" shapeRendering="crispEdges">
    <rect x="0" y="0" width="8" height="2" fill="black" />
    <rect x="0" y="2" width="1" height="5" fill="black" />
    <rect x="7" y="2" width="1" height="5" fill="black" />
    <rect x="0" y="6" width="8" height="1" fill="black" />
  </svg>
)
