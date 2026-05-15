"use client"

import type { AppId, WinXPWindowState } from "@/modules/winxp/types"

interface TaskbarProps {
  windows: WinXPWindowState[]
  activeId: string | null
  startMenuOpen: boolean
  time: Date
  onStartClick: () => void
  onTaskItem: (id: string) => void
  appIconFor: (app: AppId) => React.ReactNode
}

/** XP Luna taskbar — blue gradient, green Start orb, system tray. */
export function Taskbar({
  windows,
  activeId,
  startMenuOpen,
  time,
  onStartClick,
  onTaskItem,
  appIconFor,
}: TaskbarProps) {
  return (
    <div className="h-9 bg-gradient-to-b from-[#245EDC] via-[#3469E0] to-[#245EDC] flex items-center shadow-inner z-[1000] relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onStartClick()
        }}
        className={`h-full pl-2 pr-5 flex items-center gap-2 font-bold text-white text-sm ${
          startMenuOpen
            ? "bg-[#5fbc4d]"
            : "bg-gradient-to-b from-[#73B95F] via-[#3D9E1B] to-[#5BB047]"
        }`}
        style={{
          borderRadius: "0 18px 18px 0",
          boxShadow: startMenuOpen
            ? "inset 0 0 12px rgba(0,0,0,0.3)"
            : "inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        <div className="grid grid-cols-2 gap-px w-5 h-5 transform -rotate-12">
          <div className="bg-red-500 rounded-tl-full" />
          <div className="bg-green-300 rounded-tr-full" />
          <div className="bg-blue-400 rounded-bl-full" />
          <div className="bg-yellow-400 rounded-br-full" />
        </div>
        <span className="italic">start</span>
      </button>

      <div className="flex-1 flex gap-1 px-2 overflow-x-auto">
        {windows.map((w) => (
          <button
            key={w.id}
            onClick={() => onTaskItem(w.id)}
            className={`h-7 px-3 flex items-center gap-1 rounded text-xs text-white truncate max-w-[180px] ${
              activeId === w.id && !w.minimized
                ? "bg-blue-400/60 shadow-inner"
                : "bg-blue-700/50 hover:bg-blue-600/60"
            }`}
          >
            {appIconFor(w.app)}
            <span className="truncate">{w.title}</span>
          </button>
        ))}
      </div>

      <div className="h-full px-3 flex items-center gap-3 bg-gradient-to-b from-[#0e7ec5] to-[#0c61a4] text-white text-xs">
        <span>🔊</span>
        <span>🛡️</span>
        <span className="font-mono">
          {time.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  )
}
