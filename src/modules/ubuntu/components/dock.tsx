"use client"

import { UbuntuIcon } from "@/modules/ubuntu/components/icons"
import type { AppId, UbuntuWindowState } from "@/modules/ubuntu/types"

interface DockApp {
  id: AppId
  name: string
  icon: "files" | "firefox" | "terminal" | "gedit" | "calc" | "software" | "settings" | "book"
}

const APPS: DockApp[] = [
  { id: "files", name: "Files", icon: "files" },
  { id: "firefox", name: "Firefox", icon: "firefox" },
  { id: "terminal", name: "Terminal", icon: "terminal" },
  { id: "gedit", name: "Text Editor", icon: "gedit" },
  { id: "calculator", name: "Calculator", icon: "calc" },
  { id: "software", name: "Software", icon: "software" },
  { id: "settings", name: "Settings", icon: "settings" },
]

interface DockProps {
  windows: UbuntuWindowState[]
  onLaunch: (id: AppId) => void
  onShowActivities: () => void
}

export function Dock({ windows, onLaunch, onShowActivities }: DockProps) {
  return (
    <div className="absolute left-0 top-7 bottom-0 w-16 bg-black/60 backdrop-blur-md flex flex-col items-center py-2 gap-1 z-[1000]">
      {APPS.map((a) => {
        const isOpen = windows.some((w) => w.id === a.id)
        return (
          <button key={a.id} onClick={() => onLaunch(a.id)} className="relative group" title={a.name}>
            <UbuntuIcon kind={a.icon} />
            {isOpen && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-white rounded-r" />
            )}
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
              {a.name}
            </div>
          </button>
        )
      })}
      <div className="flex-1" />
      <button
        onClick={onShowActivities}
        className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 mb-1"
        title="Show Applications"
      >
        <div className="grid grid-cols-3 gap-0.5 w-5 h-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white rounded-full w-1 h-1" />
          ))}
        </div>
      </button>
    </div>
  )
}

export { APPS as DOCK_APPS }
