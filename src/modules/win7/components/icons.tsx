// Win 7 icons: uses authentic high-resolution PNGs from public/win7-icons/.
// Falls back to small SVGs only for items that don't have a PNG counterpart.

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
  | "recyclebin"
  | "firefox"
  | "gettingstarted"
  | "mediacenter"
  | "stickynotes"
  | "snipping"
  | "remotedesktop"
  | "magnifier"
  | "livewriter"

interface IconProps {
  kind: Kind
  size?: number
}

function Png({ src, size, alt }: { src: string; size: number; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      draggable={false}
      style={{ width: size, height: size }}
    />
  )
}

// Authentic Win7 flag logo for the Start orb (4 panes, waving)
export function Win7Logo({ size = 32, mono = false }: { size?: number; mono?: boolean }) {
  const uid = `${size}-${mono ? "m" : "c"}`
  const stops = mono
    ? { tl: ["#a8d4ff", "#4a9ff0", "#1c5fb8"], tr: ["#a8d4ff", "#4a9ff0", "#1c5fb8"], bl: ["#a8d4ff", "#4a9ff0", "#1c5fb8"], br: ["#a8d4ff", "#4a9ff0", "#1c5fb8"] }
    : {
        tl: ["#ff9c5e", "#e84a18", "#a8240a"],
        tr: ["#9ae053", "#3aab1c", "#176d10"],
        bl: ["#82caff", "#1d7adc", "#093e83"],
        br: ["#ffe170", "#f0a91a", "#9a6608"],
      }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id={`w7-tl-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stops.tl[0]} />
          <stop offset="0.5" stopColor={stops.tl[1]} />
          <stop offset="1" stopColor={stops.tl[2]} />
        </linearGradient>
        <linearGradient id={`w7-tr-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stops.tr[0]} />
          <stop offset="0.5" stopColor={stops.tr[1]} />
          <stop offset="1" stopColor={stops.tr[2]} />
        </linearGradient>
        <linearGradient id={`w7-bl-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stops.bl[0]} />
          <stop offset="0.5" stopColor={stops.bl[1]} />
          <stop offset="1" stopColor={stops.bl[2]} />
        </linearGradient>
        <linearGradient id={`w7-br-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stops.br[0]} />
          <stop offset="0.5" stopColor={stops.br[1]} />
          <stop offset="1" stopColor={stops.br[2]} />
        </linearGradient>
        <linearGradient id={`w7-shine-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.65" />
          <stop offset="0.6" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M 5 19 Q 26 13 44 17 L 44 47 Q 26 51 5 47 Z" fill={`url(#w7-tl-${uid})`} />
      <path d="M 5 19 Q 26 13 44 17 L 44 31 Q 26 35 5 31 Z" fill={`url(#w7-shine-${uid})`} />
      <path d="M 56 17 Q 74 13 95 19 L 95 47 Q 74 51 56 47 Z" fill={`url(#w7-tr-${uid})`} />
      <path d="M 56 17 Q 74 13 95 19 L 95 31 Q 74 35 56 31 Z" fill={`url(#w7-shine-${uid})`} />
      <path d="M 5 53 Q 26 49 44 53 L 44 83 Q 26 87 5 83 Z" fill={`url(#w7-bl-${uid})`} />
      <path d="M 5 53 Q 26 49 44 53 L 44 67 Q 26 71 5 67 Z" fill={`url(#w7-shine-${uid})`} />
      <path d="M 56 53 Q 74 49 95 53 L 95 83 Q 74 87 56 83 Z" fill={`url(#w7-br-${uid})`} />
      <path d="M 56 53 Q 74 49 95 53 L 95 67 Q 74 71 56 67 Z" fill={`url(#w7-shine-${uid})`} />
    </svg>
  )
}

// SVG fallbacks for icons without PNG equivalents
function IEFallback({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <radialGradient id="ie-fb" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#7fc9ff" />
          <stop offset="1" stopColor="#0a3a7c" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill="url(#ie-fb)" />
      <ellipse cx="16" cy="16" rx="14" ry="5.5" fill="#fbcb22" opacity="0.9" />
      <text x="16" y="22" textAnchor="middle" fontSize="18" fontFamily="Georgia, serif" fontStyle="italic" fill="white" fontWeight="bold">e</text>
    </svg>
  )
}

function FirefoxFallback({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <radialGradient id="ff-g" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8ed3ff" />
          <stop offset="1" stopColor="#1e5fa8" />
        </radialGradient>
        <radialGradient id="ff-f" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#ffd24a" />
          <stop offset="0.5" stopColor="#ff8a1f" />
          <stop offset="1" stopColor="#c8400a" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill="url(#ff-g)" />
      <path d="M 6 18 Q 8 8 16 6 Q 26 7 27 16 Q 25 11 18 12 Q 11 14 12 22 Q 14 27 22 26 Q 16 28 11 25 Q 6 22 6 18 Z" fill="url(#ff-f)" />
    </svg>
  )
}

function CalcFallback({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <rect x="4" y="3" width="24" height="26" rx="2" fill="#dadbdf" stroke="#404858" strokeWidth="0.5" />
      <rect x="6" y="5" width="20" height="6" rx="0.5" fill="#a8d4ff" />
      <text x="24" y="10" textAnchor="end" fontSize="6" fill="#0c3d8c" fontFamily="monospace">0</text>
      {[14, 19, 24].map((y) =>
        [6, 11, 16, 21].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="0.6" fill="#fff" stroke="#404858" strokeWidth="0.4" />
        )),
      )}
    </svg>
  )
}

function SnippingFallback({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <rect x="4" y="6" width="20" height="16" fill="white" stroke="#1565b8" strokeWidth="1" strokeDasharray="2 1.5" />
      <g transform="translate(18,16) rotate(35)">
        <circle cx="-3" cy="-3" r="2.5" fill="none" stroke="#c8181f" strokeWidth="1.4" />
        <circle cx="-3" cy="3" r="2.5" fill="none" stroke="#c8181f" strokeWidth="1.4" />
        <line x1="-1" y1="-2" x2="10" y2="0" stroke="#888" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="-1" y1="2" x2="10" y2="0" stroke="#888" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function MagnifierFallback({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <defs>
        <radialGradient id="mg-g" cx="0.4" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#e8f5ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7ec8ff" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <circle cx="13" cy="13" r="9" fill="url(#mg-g)" stroke="#404858" strokeWidth="2" />
      <line x1="19.5" y1="19.5" x2="27" y2="27" stroke="#404858" strokeWidth="3.5" strokeLinecap="round" />
      <text x="13" y="16" textAnchor="middle" fontSize="9" fill="#1c5fb8" fontWeight="bold">+</text>
    </svg>
  )
}

function GettingStartedFallback({ size = 32 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="geometricPrecision">
      <rect x="4" y="4" width="24" height="24" rx="3" fill="white" stroke="#888" strokeWidth="0.5" />
      <rect x="4" y="4" width="24" height="6" rx="3" fill="#1c5fb8" />
      <text x="16" y="20" textAnchor="middle" fontSize="9" fontFamily="Segoe UI, sans-serif" fill="#1c5fb8" fontWeight="bold">?</text>
      <circle cx="24" cy="24" r="3" fill="#3aaa1f" stroke="white" strokeWidth="0.8" />
      <path d="M 22.5 24 L 24 25.5 L 26 22.5" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function Win7Icon({ kind, size = 32 }: IconProps) {
  switch (kind) {
    case "computer":
      return <Png src="/win7-icons/computer.png" size={size} alt="Equipo" />
    case "documents":
      return <Png src="/win7-icons/documents.png" size={size} alt="Documentos" />
    case "ie":
      return <IEFallback size={size} />
    case "notepad":
      return <Png src="/win7-icons/notepad.png" size={size} alt="Bloc de notas" />
    case "calc":
      return <CalcFallback size={size} />
    case "paint":
      return <Png src="/win7-icons/paint.png" size={size} alt="Paint" />
    case "history":
      return <Png src="/win7-icons/folder.png" size={size} alt="Historia" />
    case "controlpanel":
      return <Png src="/win7-icons/controlpanel.png" size={size} alt="Panel de control" />
    case "wmplayer":
      return <Png src="/win7-icons/mediaplayer.png" size={size} alt="Media Player" />
    case "explorer":
      return <Png src="/win7-icons/explorer.png" size={size} alt="Explorador" />
    case "recyclebin":
      return <Png src="/win7-icons/recyclebin.png" size={size} alt="Papelera" />
    case "firefox":
      return <FirefoxFallback size={size} />
    case "gettingstarted":
      return <GettingStartedFallback size={size} />
    case "mediacenter":
      return <Png src="/win7-icons/mediacenter.png" size={size} alt="Media Center" />
    case "stickynotes":
      return <Png src="/win7-icons/stickynotes.png" size={size} alt="Sticky Notes" />
    case "snipping":
      return <SnippingFallback size={size} />
    case "remotedesktop":
      return <Png src="/win7-icons/remotedesktop.png" size={size} alt="Remote Desktop" />
    case "magnifier":
      return <MagnifierFallback size={size} />
    case "livewriter":
      return <Png src="/win7-icons/livewriter.png" size={size} alt="Live Writer" />
  }
}
