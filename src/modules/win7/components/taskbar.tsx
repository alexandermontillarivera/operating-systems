"use client"

import { Win7Icon } from "@/modules/win7/components/icons"
import type { AppId, Win7WindowState } from "@/modules/win7/types"

interface TaskbarProps {
  windows: Win7WindowState[]
  activeId: string | null
  startMenuOpen: boolean
  time: Date
  appIconFor: (app: AppId) => React.ReactNode
  onStartClick: () => void
  onTaskClick: (id: string) => void
  onPeek: (id: string | null) => void
  onShowDesktop: () => void
  onShowDesktopHover: (hover: boolean) => void
  onPin: (id: AppId, label: string) => void
}

const PINNED: { id: AppId; label: string }[] = [
  { id: "ie", label: "Internet Explorer" },
  { id: "documents", label: "Explorador" },
  { id: "wmplayer", label: "Media Player" },
]

export function Taskbar({
  windows,
  activeId,
  startMenuOpen,
  time,
  appIconFor,
  onStartClick,
  onTaskClick,
  onPeek,
  onShowDesktop,
  onShowDesktopHover,
  onPin,
}: TaskbarProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-12 flex items-center px-1 z-[1000]"
      style={{
        background: "linear-gradient(to bottom, rgba(40,80,140,0.85) 0%, rgba(15,30,60,0.95) 100%)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(120,180,255,0.4)",
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onStartClick()
        }}
        className="relative w-12 h-12 flex items-center justify-center -mt-1"
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
          style={{
            background: startMenuOpen
              ? "radial-gradient(circle, #5fa8ff 0%, #1e5bb8 70%)"
              : "radial-gradient(circle, #3b7dd8 0%, #1e457e 70%)",
            boxShadow: "0 2px 12px rgba(0,100,200,0.5), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
            <div className="bg-orange-400 rounded-tl-full" />
            <div className="bg-green-400 rounded-tr-full" />
            <div className="bg-blue-300 rounded-bl-full" />
            <div className="bg-yellow-300 rounded-br-full" />
          </div>
        </div>
      </button>

      <div className="flex-1 flex items-center gap-1 px-2">
        {PINNED.map((p) => {
          const isOpen = windows.some((w) => w.id === p.id)
          return (
            <button
              key={p.id}
              onClick={() => onPin(p.id, p.label)}
              className={`w-10 h-10 rounded flex items-center justify-center ${isOpen ? "bg-white/15 border border-white/40" : "hover:bg-white/10"}`}
              title={p.label}
            >
              <Win7Icon kind={p.id} size={28} />
            </button>
          )
        })}
        {windows
          .filter((w) => !["ie", "documents", "wmplayer"].includes(w.id))
          .map((w) => (
            <button
              key={w.id}
              onMouseEnter={() => onPeek(w.id)}
              onMouseLeave={() => onPeek(null)}
              onClick={() => onTaskClick(w.id)}
              className={`h-10 px-2 flex items-center gap-2 rounded text-white text-xs ${activeId === w.id && !w.minimized ? "bg-white/20 border-b-2 border-blue-400" : "hover:bg-white/10"}`}
            >
              {appIconFor(w.app)}
              <span className="truncate max-w-[120px]">{w.title}</span>
            </button>
          ))}
      </div>

      <div className="flex items-center gap-2 px-3 text-white text-xs">
        <span>🔊</span>
        <span>📶</span>
        <span>🔋</span>
        <div className="border-l border-white/20 pl-3 ml-2 text-right">
          <div>{time.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}</div>
          <div className="text-[10px] opacity-80">{time.toLocaleDateString("es-ES")}</div>
        </div>
      </div>

      <button
        onMouseEnter={() => onShowDesktopHover(true)}
        onMouseLeave={() => onShowDesktopHover(false)}
        onClick={onShowDesktop}
        className="w-3 h-12 ml-1 hover:bg-white/15 border-l border-white/40"
        title="Mostrar el escritorio"
      />
    </div>
  )
}
