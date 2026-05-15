"use client"

import type { Win95WindowState, AppId } from "@/modules/win95/types"
import { StartLogoIcon } from "@/modules/win95/components/icons"

interface TaskbarProps {
  windows: Win95WindowState[]
  activeId: string | null
  startMenuOpen: boolean
  time: Date
  onStartClick: () => void
  onTaskbarItemClick: (id: string) => void
  taskbarIconFor: (app: AppId) => React.ReactNode
}

export function Taskbar({
  windows,
  activeId,
  startMenuOpen,
  time,
  onStartClick,
  onTaskbarItemClick,
  taskbarIconFor,
}: TaskbarProps) {
  return (
    <div
      className="h-7 bg-[#c0c0c0] flex items-center px-1 gap-1 select-none"
      style={{
        boxShadow: "inset 0 1px 0 0 #ffffff",
        fontFamily: "Tahoma, 'MS Sans Serif', sans-serif",
      }}
    >
      <StartButton onClick={onStartClick} pressed={startMenuOpen} />

      {/* Quick launch separator */}
      <div className="h-5 w-px bg-[#808080] border-r border-white mx-0.5" />

      {/* Window task buttons */}
      <div className="flex-1 flex gap-1 overflow-hidden">
        {windows.map((w) => {
          const isActive = activeId === w.id && !w.minimized
          return (
            <button
              key={w.id}
              onClick={() => onTaskbarItemClick(w.id)}
              className={`h-6 px-1 flex items-center gap-1 text-[11px] truncate max-w-[160px] text-left ${
                isActive ? "bg-[#bdbdbd]" : "bg-[#c0c0c0]"
              }`}
              style={{
                boxShadow: isActive
                  ? "inset 1px 1px 0 0 #000, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #808080, inset -2px -2px 0 0 #dfdfdf"
                  : "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
                backgroundImage: isActive
                  ? "repeating-linear-gradient(45deg, transparent 0 1px, rgba(255,255,255,0.5) 1px 2px)"
                  : undefined,
              }}
            >
              <span className="w-4 h-4 shrink-0">{taskbarIconFor(w.app)}</span>
              <span className="truncate">{w.title}</span>
            </button>
          )
        })}
      </div>

      <SystemTray time={time} />
    </div>
  )
}

function StartButton({ onClick, pressed }: { onClick: () => void; pressed: boolean }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className="h-[22px] px-1 flex items-center gap-1 text-[11px] font-bold bg-[#c0c0c0]"
      style={{
        boxShadow: pressed
          ? "inset 1px 1px 0 0 #000, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #808080, inset -2px -2px 0 0 #dfdfdf"
          : "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
      }}
    >
      <span className="ml-0.5">
        <StartLogoIcon size={16} />
      </span>
      <span className="px-1">Inicio</span>
    </button>
  )
}

function SystemTray({ time }: { time: Date }) {
  return (
    <div
      className="h-[22px] px-2 flex items-center gap-1.5 text-[11px]"
      style={{
        boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff",
      }}
    >
      <SpeakerIcon />
      <span className="font-mono tabular-nums">
        {time.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  )
}

function SpeakerIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" shapeRendering="crispEdges">
      <polygon points="1,4 4,4 7,1 7,11 4,8 1,8" fill="#404040" />
      <path d="M 9 3 Q 11 6 9 9" stroke="#404040" fill="none" />
      <path d="M 10 1 Q 13 6 10 11" stroke="#404040" fill="none" />
    </svg>
  )
}
