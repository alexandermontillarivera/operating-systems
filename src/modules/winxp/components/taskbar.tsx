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

/** XP Luna taskbar — blue gradient with green Start button. */
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
    <div
      className="h-[30px] flex items-stretch z-[1000] relative"
      style={{
        background:
          "linear-gradient(to bottom, #1f64da 0%, #2c80f0 5%, #2778e8 50%, #0c52c4 95%, #2370db 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
        fontFamily: '"Tahoma", "Trebuchet MS", sans-serif',
      }}
    >
      {/* START BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onStartClick()
        }}
        className="h-full pl-2 pr-6 flex items-center gap-1.5 relative"
        style={{
          background: startMenuOpen
            ? "linear-gradient(to bottom, #6dc556 0%, #438d2c 50%, #2e6a18 100%)"
            : "linear-gradient(to bottom, #5eae46 0%, #449b27 8%, #3f932a 45%, #266c10 85%, #429e25 100%)",
          borderRadius: "0 12px 12px 0",
          boxShadow: startMenuOpen
            ? "inset 1px 1px 4px rgba(0,0,0,0.4)"
            : "inset 0 1px 0 rgba(255,255,255,0.6), inset 1px 0 0 rgba(255,255,255,0.3), 2px 0 4px rgba(0,0,0,0.2)",
          minWidth: 90,
        }}
      >
        {/* small Windows flag */}
        <svg width="20" height="20" viewBox="0 0 20 20" style={{ transform: "rotate(-2deg)" }}>
          <defs>
            <linearGradient id="xp-flag-r" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#ff8a4a" />
              <stop offset="1" stopColor="#c33a0a" />
            </linearGradient>
            <linearGradient id="xp-flag-g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#9ae053" />
              <stop offset="1" stopColor="#2d8a14" />
            </linearGradient>
            <linearGradient id="xp-flag-b" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#82caff" />
              <stop offset="1" stopColor="#0e4a93" />
            </linearGradient>
            <linearGradient id="xp-flag-y" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#ffe170" />
              <stop offset="1" stopColor="#cf8a08" />
            </linearGradient>
          </defs>
          <path d="M 1 4 Q 5 2 9 3 L 9 9 Q 5 10 1 9 Z" fill="url(#xp-flag-r)" />
          <path d="M 11 3 Q 15 2 19 4 L 19 9 Q 15 10 11 9 Z" fill="url(#xp-flag-g)" />
          <path d="M 1 11 Q 5 10 9 11 L 9 17 Q 5 18 1 17 Z" fill="url(#xp-flag-b)" />
          <path d="M 11 11 Q 15 10 19 11 L 19 17 Q 15 18 11 17 Z" fill="url(#xp-flag-y)" />
        </svg>
        <span
          className="text-white text-[15px] font-bold italic pr-1"
          style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.55)" }}
        >
          start
        </span>
      </button>

      {/* TASKS */}
      <div className="flex-1 flex gap-[2px] px-2 items-center overflow-x-auto">
        {windows.map((w) => {
          const active = activeId === w.id && !w.minimized
          return (
            <button
              key={w.id}
              onClick={() => onTaskItem(w.id)}
              className="h-[22px] px-2 flex items-center gap-1.5 text-[11.5px] text-white truncate max-w-[180px]"
              style={{
                background: active
                  ? "linear-gradient(to bottom, #1a4ba8 0%, #2367c8 50%, #2c70d4 100%)"
                  : "linear-gradient(to bottom, #3884e8 0%, #2670d8 50%, #1957c0 100%)",
                border: "1px solid",
                borderColor: active ? "#0c3678" : "#1c54b0",
                borderRadius: 3,
                boxShadow: active
                  ? "inset 1px 1px 3px rgba(0,0,0,0.4)"
                  : "inset 0 1px 0 rgba(255,255,255,0.4)",
                textShadow: "1px 1px 1px rgba(0,0,0,0.45)",
              }}
            >
              <span className="shrink-0 inline-flex">{appIconFor(w.app)}</span>
              <span className="truncate">{w.title}</span>
            </button>
          )
        })}
      </div>

      {/* SYSTEM TRAY */}
      <div
        className="h-full px-3 flex items-center gap-2 text-white text-[11px]"
        style={{
          background:
            "linear-gradient(to bottom, #0c5fc7 0%, #1372d8 50%, #0c52c0 100%)",
          borderLeft: "1px solid rgba(0,0,0,0.4)",
          boxShadow: "inset 1px 0 0 rgba(255,255,255,0.25)",
        }}
      >
        <span title="Volume">🔊</span>
        <span title="Security">🛡️</span>
        <span
          className="font-normal"
          style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}
        >
          {time.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  )
}
