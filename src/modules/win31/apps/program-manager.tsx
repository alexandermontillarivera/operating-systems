"use client"

import { MenuBar } from "@/modules/win31/components/menu-bar"
import {
  AccessoriesIcon,
  GamesIcon,
  HelpIcon,
  MainGroupIcon,
  StartupIcon,
} from "@/modules/win31/components/icons"
import type { AppId } from "@/modules/win31/types"

interface ProgramManagerProps {
  openApp: (id: string, title: string, app: AppId, opts?: { width?: number; height?: number }) => void
}

interface GroupProps {
  icon: React.ReactNode
  label: string
  onOpen: () => void
}

function Group({ icon, label, onOpen }: GroupProps) {
  return (
    <button
      onDoubleClick={onOpen}
      className="flex flex-col items-center w-20 p-2 hover:bg-[#000080] hover:text-white text-black"
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs text-center">{label}</span>
    </button>
  )
}

export function ProgramManager({ openApp }: ProgramManagerProps) {
  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-black">
      <MenuBar items={["File", "Options", "Window", "Help"]} />
      <div className="flex-1 p-4 flex flex-wrap gap-6 content-start">
        <Group
          icon={<MainGroupIcon size={40} />}
          label="Main"
          onOpen={() => openApp("main-grp", "Main", "main-group")}
        />
        <Group
          icon={<AccessoriesIcon size={40} />}
          label="Accessories"
          onOpen={() => openApp("acc-grp", "Accessories", "acc-group")}
        />
        <Group
          icon={<GamesIcon size={40} />}
          label="Games"
          onOpen={() => openApp("games-grp", "Games", "games-group")}
        />
        <Group
          icon={<StartupIcon size={40} />}
          label="StartUp"
          onOpen={() => openApp("startup-grp", "StartUp", "startup-group")}
        />
        <Group
          icon={<HelpIcon size={40} />}
          label="Historia"
          onOpen={() =>
            openApp("history", "Historia de Windows 3.1", "history", { width: 520, height: 400 })
          }
        />
      </div>
    </div>
  )
}
