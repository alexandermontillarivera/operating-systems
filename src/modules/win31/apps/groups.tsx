"use client"

import {
  CalcIcon,
  ClockIcon,
  ControlPanelIcon,
  FileManagerIcon,
  MinesIcon,
  MsDosIcon,
  NotepadIcon,
  PaintbrushIcon,
  SolitaireIcon,
  WriteIcon,
} from "@/modules/win31/components/icons"
import type { AppId } from "@/modules/win31/types"

type Launcher = (
  id: string,
  title: string,
  app: AppId,
  opts?: { width?: number; height?: number },
) => void

interface GroupProps {
  openApp: Launcher
}

interface AppEntry {
  id: AppId
  icon: React.ReactNode
  label: string
  size?: { width: number; height: number }
}

const ACC_APPS: AppEntry[] = [
  { id: "write", icon: <WriteIcon size={36} />, label: "Write" },
  {
    id: "paintbrush",
    icon: <PaintbrushIcon size={36} />,
    label: "Paintbrush",
    size: { width: 540, height: 400 },
  },
  { id: "notepad", icon: <NotepadIcon size={36} />, label: "Notepad" },
  {
    id: "calculator",
    icon: <CalcIcon size={36} />,
    label: "Calculator",
    size: { width: 230, height: 280 },
  },
  { id: "clock", icon: <ClockIcon size={36} />, label: "Clock", size: { width: 220, height: 240 } },
  {
    id: "filemanager",
    icon: <FileManagerIcon size={36} />,
    label: "File Manager",
    size: { width: 600, height: 380 },
  },
  {
    id: "control",
    icon: <ControlPanelIcon size={36} />,
    label: "Control Panel",
    size: { width: 460, height: 320 },
  },
  {
    id: "msdos",
    icon: <MsDosIcon size={36} />,
    label: "MS-DOS Prompt",
    size: { width: 520, height: 320 },
  },
]

export function AccessoriesGroup({ openApp }: GroupProps) {
  return (
    <div className="p-4 grid grid-cols-4 gap-4 text-black">
      {ACC_APPS.map((a) => (
        <button
          key={a.id}
          onDoubleClick={() => openApp(a.id, a.label, a.id, a.size)}
          className="flex flex-col items-center p-2 hover:bg-[#000080] hover:text-white"
        >
          {a.icon}
          <span className="text-xs mt-1 text-center">{a.label}</span>
        </button>
      ))}
    </div>
  )
}

export function GamesGroup({ openApp }: GroupProps) {
  return (
    <div className="p-4 grid grid-cols-2 gap-4 text-black">
      <button
        onDoubleClick={() => openApp("solitaire", "Solitaire", "solitaire", { width: 640, height: 460 })}
        className="flex flex-col items-center p-2 hover:bg-[#000080] hover:text-white"
      >
        <SolitaireIcon size={40} />
        <span className="text-xs mt-1">Solitaire</span>
      </button>
      <button
        onDoubleClick={() =>
          openApp("minesweeper", "Minesweeper", "minesweeper", { width: 360, height: 420 })
        }
        className="flex flex-col items-center p-2 hover:bg-[#000080] hover:text-white"
      >
        <MinesIcon size={40} />
        <span className="text-xs mt-1">Minesweeper</span>
      </button>
    </div>
  )
}

export function StartupGroup() {
  return <div className="p-6 text-sm text-gray-700">StartUp group is empty.</div>
}
