// Pixel-art SVG icons recreated to evoke the original Windows 3.1 icon set.
// All icons use shapeRendering="crispEdges" for a sharp pixel look.

interface IconProps {
  size?: number
}

export function MainGroupIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Computer monitor */}
      <rect x="3" y="5" width="26" height="18" fill="#cfcfcf" stroke="#000" strokeWidth="1" />
      <rect x="5" y="7" width="22" height="13" fill="#0070C0" />
      {/* tiny C: prompt */}
      <rect x="7" y="9" width="2" height="1" fill="#fff" />
      <rect x="9" y="10" width="1" height="1" fill="#fff" />
      <rect x="11" y="22" width="10" height="2" fill="#cfcfcf" stroke="#000" strokeWidth="1" />
      <rect x="6" y="25" width="20" height="3" fill="#cfcfcf" stroke="#000" strokeWidth="1" />
    </svg>
  )
}

export function AccessoriesIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* tool box */}
      <rect x="5" y="11" width="22" height="14" fill="#FFC000" stroke="#000" />
      <rect x="11" y="6" width="10" height="5" fill="#FFC000" stroke="#000" />
      {/* tools */}
      <rect x="9" y="16" width="3" height="6" fill="#7f7f7f" />
      <polygon points="9,15 12,15 12,16 9,16" fill="#aaa" stroke="#000" />
      <rect x="14" y="14" width="4" height="9" fill="#7f7f7f" />
      <rect x="20" y="13" width="2" height="11" fill="#7f7f7f" />
    </svg>
  )
}

export function GamesIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* card faces fanned */}
      <g transform="translate(4,8) rotate(-15)">
        <rect width="11" height="16" fill="#fff" stroke="#000" />
        <text x="2" y="6" fontSize="4" fontWeight="bold" fill="#FF0000">A</text>
        <text x="2" y="11" fontSize="6" fill="#FF0000">♥</text>
      </g>
      <g transform="translate(11,7)">
        <rect width="11" height="16" fill="#fff" stroke="#000" />
        <text x="2" y="6" fontSize="4" fontWeight="bold" fill="#000">K</text>
        <text x="2" y="11" fontSize="6" fill="#000">♠</text>
      </g>
      <g transform="translate(18,8) rotate(15)">
        <rect width="11" height="16" fill="#fff" stroke="#000" />
        <text x="2" y="6" fontSize="4" fontWeight="bold" fill="#FF0000">Q</text>
        <text x="2" y="11" fontSize="6" fill="#FF0000">♦</text>
      </g>
    </svg>
  )
}

export function StartupIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="6" y="6" width="20" height="20" fill="#cfcfcf" stroke="#000" />
      <rect x="9" y="9" width="14" height="3" fill="#0000a0" />
      <rect x="9" y="14" width="14" height="9" fill="#fff" />
      {/* arrow */}
      <polygon points="13,16 19,16 19,18 22,18 16,22 10,18 13,18" fill="#22B14C" />
    </svg>
  )
}

export function FileManagerIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* file cabinet */}
      <rect x="5" y="4" width="22" height="24" fill="#aaa" stroke="#000" />
      <rect x="7" y="6" width="18" height="6" fill="#cfcfcf" stroke="#000" />
      <rect x="7" y="14" width="18" height="6" fill="#cfcfcf" stroke="#000" />
      <rect x="7" y="22" width="18" height="4" fill="#cfcfcf" stroke="#000" />
      <rect x="14" y="9" width="4" height="1" fill="#000" />
      <rect x="14" y="17" width="4" height="1" fill="#000" />
    </svg>
  )
}

export function ControlPanelIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="3" y="5" width="26" height="18" fill="#cfcfcf" stroke="#000" />
      <rect x="5" y="7" width="22" height="3" fill="#0000a0" />
      {/* sliders */}
      {[12, 17].map((y) => (
        <g key={y}>
          <rect x="6" y={y} width="20" height="2" fill="#7f7f7f" />
          <rect x={y === 12 ? 14 : 8} y={y - 1} width="3" height="4" fill="#fff" stroke="#000" />
        </g>
      ))}
      <rect x="11" y="25" width="10" height="2" fill="#cfcfcf" stroke="#000" />
    </svg>
  )
}

export function PrintIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="6" y="11" width="20" height="11" fill="#cfcfcf" stroke="#000" />
      <rect x="8" y="6" width="16" height="6" fill="#fff" stroke="#000" />
      <rect x="9" y="22" width="14" height="5" fill="#fff" stroke="#000" />
      {[10, 12].map((y) => (
        <line key={y} x1="11" y1={y} x2="21" y2={y} stroke="#000" />
      ))}
      <rect x="22" y="14" width="2" height="2" fill="#22B14C" />
    </svg>
  )
}

export function NotepadIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="6" y="4" width="20" height="24" fill="#fff" stroke="#000" />
      <rect x="6" y="4" width="20" height="2" fill="#0000a0" />
      {[8, 11, 14, 17, 20, 23].map((y) => (
        <line key={y} x1="9" y1={y} x2={y === 23 ? 19 : 23} y2={y} stroke="#000" />
      ))}
    </svg>
  )
}

export function WriteIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="5" y="4" width="22" height="22" fill="#fff" stroke="#000" />
      <rect x="5" y="4" width="22" height="2" fill="#0000a0" />
      {[8, 12, 16, 20].map((y) => (
        <line key={y} x1="7" y1={y} x2="25" y2={y} stroke="#888" />
      ))}
      {/* fountain pen */}
      <line x1="22" y1="4" x2="29" y2="11" stroke="#0000a0" strokeWidth="2" />
      <polygon points="20,4 23,4 28,9 25,12" fill="#0000a0" stroke="#000" />
    </svg>
  )
}

export function PaintbrushIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* canvas */}
      <rect x="3" y="11" width="20" height="14" fill="#fff" stroke="#000" />
      <rect x="5" y="13" width="6" height="3" fill="#FF0000" />
      <rect x="12" y="13" width="6" height="3" fill="#FFC000" />
      <rect x="5" y="17" width="6" height="3" fill="#22B14C" />
      <rect x="12" y="17" width="6" height="3" fill="#0094FF" />
      {/* brush */}
      <line x1="22" y1="9" x2="29" y2="2" stroke="#5d4126" strokeWidth="2" />
      <polygon points="19,9 23,5 27,9 23,13" fill="#aaa" stroke="#000" />
    </svg>
  )
}

export function CalcIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="5" y="3" width="22" height="26" fill="#cfcfcf" stroke="#000" />
      <rect x="8" y="6" width="16" height="4" fill="#abad7d" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={8 + col * 4}
            y={12 + row * 4}
            width="3"
            height="3"
            fill="#7f7f7f"
            stroke="#000"
          />
        )),
      )}
    </svg>
  )
}

export function ClockIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <circle cx="16" cy="16" r="13" fill="#fff" stroke="#000" />
      {[0, 3, 6, 9].map((n) => {
        const angle = (n / 12) * Math.PI * 2
        const x = 16 + 11 * Math.sin(angle)
        const y = 16 - 11 * Math.cos(angle)
        return <circle key={n} cx={x} cy={y} r="0.7" fill="#000" />
      })}
      <line x1="16" y1="16" x2="16" y2="9" stroke="#000" strokeWidth="1.5" />
      <line x1="16" y1="16" x2="22" y2="18" stroke="#000" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="1.2" fill="#000" />
    </svg>
  )
}

export function SolitaireIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      {[5, 8, 11].map((x, i) => (
        <g key={x} transform={`translate(${x},${6 + i * 2})`}>
          <rect width="14" height="20" fill="#fff" stroke="#000" />
          <text x="2" y="6" fontSize="4" fontWeight="bold" fill="#FF0000">A</text>
          <text x="2" y="10" fontSize="5" fill="#FF0000">♥</text>
        </g>
      ))}
    </svg>
  )
}

export function MinesIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="4" y="4" width="24" height="24" fill="#cfcfcf" stroke="#000" />
      <circle cx="16" cy="17" r="6" fill="#000" />
      <rect x="14" y="9" width="4" height="2" fill="#000" />
      <rect x="13" y="14" width="2" height="2" fill="#fff" />
      <line x1="16" y1="9" x2="16" y2="6" stroke="#FFD800" strokeWidth="1.2" />
    </svg>
  )
}

export function HelpIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="3" y="3" width="26" height="26" fill="#FFC000" stroke="#000" />
      <text
        x="16"
        y="24"
        fontSize="22"
        fontWeight="bold"
        textAnchor="middle"
        fill="#0000a0"
      >
        ?
      </text>
    </svg>
  )
}

export function MsDosIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="3" y="5" width="26" height="18" fill="#cfcfcf" stroke="#000" />
      <rect x="5" y="7" width="22" height="13" fill="#000" />
      <text x="6" y="16" fontSize="6" fontFamily="monospace" fill="#22B14C">
        C:\&gt;
      </text>
      <rect x="11" y="22" width="10" height="2" fill="#cfcfcf" stroke="#000" />
      <rect x="6" y="25" width="20" height="3" fill="#cfcfcf" stroke="#000" />
    </svg>
  )
}

export function TerminalIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="3" y="5" width="26" height="22" fill="#cfcfcf" stroke="#000" />
      <rect x="5" y="7" width="22" height="3" fill="#0000a0" />
      <text x="6" y="20" fontSize="8" fontFamily="monospace" fill="#000">
        AT
      </text>
    </svg>
  )
}

export function CardfileIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="4" y="6" width="24" height="22" fill="#cfcfcf" stroke="#000" />
      {[10, 14, 18, 22].map((y) => (
        <line key={y} x1="6" y1={y} x2="26" y2={y} stroke="#000" />
      ))}
    </svg>
  )
}

export function CalendarIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="4" y="4" width="24" height="24" fill="#fff" stroke="#000" />
      <rect x="4" y="4" width="24" height="6" fill="#FF0000" />
      <text x="16" y="22" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#000">
        15
      </text>
    </svg>
  )
}

export function MediaIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="3" y="5" width="26" height="22" fill="#cfcfcf" stroke="#000" />
      <rect x="5" y="7" width="22" height="13" fill="#000" />
      <polygon points="13,11 21,16 13,21" fill="#fff" />
      {[22, 24].map((y) => (
        <rect key={y} x="5" y={y} width="22" height="1" fill="#7f7f7f" />
      ))}
    </svg>
  )
}

export function SoundIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <polygon points="6,12 10,12 16,7 16,25 10,20 6,20" fill="#cfcfcf" stroke="#000" />
      <path d="M 18 13 Q 21 16 18 19" stroke="#000" fill="none" />
      <path d="M 20 11 Q 25 16 20 21" stroke="#000" fill="none" />
    </svg>
  )
}

export function CharacterMapIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="4" y="4" width="24" height="24" fill="#fff" stroke="#000" />
      <text x="16" y="23" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="serif" fill="#000">
        A
      </text>
    </svg>
  )
}

export function ObjectPackagerIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <polygon points="4,12 16,5 28,12 28,26 16,30 4,26" fill="#cfcfcf" stroke="#000" />
      <line x1="4" y1="12" x2="28" y2="12" stroke="#000" />
      <line x1="16" y1="5" x2="16" y2="30" stroke="#000" />
    </svg>
  )
}

export function RecorderIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="4" y="8" width="24" height="16" fill="#cfcfcf" stroke="#000" />
      <circle cx="11" cy="16" r="3" fill="#000" />
      <circle cx="21" cy="16" r="3" fill="#000" />
      <rect x="13" y="14" width="6" height="4" fill="#000" />
    </svg>
  )
}

export function PifEditorIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="6" y="3" width="20" height="26" fill="#fff" stroke="#000" />
      <rect x="6" y="3" width="20" height="3" fill="#000" />
      <text x="16" y="20" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace" fill="#000">
        PIF
      </text>
    </svg>
  )
}

export function ClipboardIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
      <rect x="6" y="5" width="20" height="24" fill="#cfcfcf" stroke="#000" />
      <rect x="11" y="3" width="10" height="4" fill="#aaa" stroke="#000" />
      {[12, 16, 20].map((y) => (
        <line key={y} x1="9" y1={y} x2="22" y2={y} stroke="#000" />
      ))}
    </svg>
  )
}
