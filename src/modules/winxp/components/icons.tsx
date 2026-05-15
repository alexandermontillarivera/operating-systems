// XP-style icons - uses authentic high-resolution PNGs from public/winxp-icons/
import type { AppId } from "@/modules/winxp/types"

interface IconProps {
  size?: number
}

function PngIcon({ src, size = 32, alt }: { src: string; size?: number; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size, imageRendering: "auto" }}
      draggable={false}
    />
  )
}

export function MyComputerIcon({ size = 32 }: IconProps) {
  return <PngIcon src="/winxp-icons/my-computer.png" size={size} alt="Mi PC" />
}

export function FolderIcon({ size = 32 }: IconProps) {
  return <PngIcon src="/winxp-icons/my-documents.png" size={size} alt="Mis documentos" />
}

export function TrashIcon({ size = 32 }: IconProps) {
  return <PngIcon src="/winxp-icons/recycle-empty.png" size={size} alt="Papelera" />
}

export function IEIcon({ size = 40 }: IconProps) {
  return <PngIcon src="/winxp-icons/ie.png" size={size} alt="Internet Explorer" />
}

export function BookIcon({ size = 32 }: IconProps) {
  return <PngIcon src="/winxp-icons/history.png" size={size} alt="Historia" />
}

export function MediaPlayerIcon({ size = 24 }: IconProps) {
  return <PngIcon src="/winxp-icons/mediaplayer.png" size={size} alt="Media Player" />
}

export function PaintIcon({ size = 24 }: IconProps) {
  return <PngIcon src="/winxp-icons/paint.png" size={size} alt="Paint" />
}

export function NotepadIcon({ size = 24 }: IconProps) {
  return <PngIcon src="/winxp-icons/notepad.png" size={size} alt="Bloc de notas" />
}

export function CalcIcon({ size = 24 }: IconProps) {
  return <PngIcon src="/winxp-icons/calc.png" size={size} alt="Calculadora" />
}

export function MinesIcon({ size = 24 }: IconProps) {
  return <PngIcon src="/winxp-icons/mines.png" size={size} alt="Buscaminas" />
}

export function SolitaireIcon({ size = 24 }: IconProps) {
  return <PngIcon src="/winxp-icons/solitaire.png" size={size} alt="Solitario" />
}

export function OutlookIcon({ size = 24 }: IconProps) {
  return <PngIcon src="/winxp-icons/outlook.png" size={size} alt="Outlook Express" />
}

export function MessengerIcon({ size = 24 }: IconProps) {
  return <PngIcon src="/winxp-icons/messenger.png" size={size} alt="Messenger" />
}

export function MovieMakerIcon({ size = 24 }: IconProps) {
  return <PngIcon src="/winxp-icons/moviemaker.png" size={size} alt="Movie Maker" />
}

export function ControlPanelIcon({ size = 24 }: IconProps) {
  return <PngIcon src="/winxp-icons/controlpanel.png" size={size} alt="Panel de control" />
}

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
