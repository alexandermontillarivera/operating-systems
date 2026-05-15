"use client"

import { APPLE_PATH } from "@/modules/macos/components/dock-icons"

interface MenuBarProps {
  appleOpen: boolean
  onToggleApple: () => void
  activeAppName: string
  time: Date
  onSpotlight: () => void
  onMissionControl: () => void
  onNotifications: () => void
  notificationCenterOpen: boolean
}

const MENUS = ["Archivo", "Edición", "Ver", "Ventana", "Ayuda"]

export function MenuBar({
  appleOpen,
  onToggleApple,
  activeAppName,
  time,
  onSpotlight,
  onMissionControl,
  onNotifications,
  notificationCenterOpen,
}: MenuBarProps) {
  return (
    <div className="h-7 bg-white/40 backdrop-blur-xl flex items-center px-4 text-sm relative z-[10000] text-black">
      <button
        onClick={onToggleApple}
        className={`px-2 hover:bg-black/10 rounded ${appleOpen ? "bg-blue-500 text-white" : ""}`}
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
          <path d={APPLE_PATH} />
        </svg>
      </button>
      <div className="flex items-center gap-3 ml-3">
        <button className="font-semibold hover:bg-black/10 px-2 rounded">{activeAppName}</button>
        {MENUS.map((m) => (
          <button key={m} className="hover:bg-black/10 px-2 rounded">
            {m}
          </button>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2 text-xs">
        <span>🔋 100%</span>
        <span>📶</span>
        <span>🔊</span>
        <button onClick={onSpotlight} className="hover:bg-black/10 p-1 rounded" aria-label="spotlight">
          🔍
        </button>
        <button onClick={onMissionControl} className="hover:bg-black/10 p-1 rounded" aria-label="mission control">
          ▦
        </button>
        <button
          onClick={onNotifications}
          className={`hover:bg-black/10 px-2 rounded font-medium ${notificationCenterOpen ? "bg-black/15" : ""}`}
        >
          {time.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" })}{" "}
          {time.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
        </button>
      </div>
    </div>
  )
}
