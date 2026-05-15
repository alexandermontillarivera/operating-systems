"use client"

import { Win7Icon, Win7Logo } from "@/modules/win7/components/icons"
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
      className="absolute bottom-0 left-0 right-0 h-10 flex items-stretch z-[1000]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(40,80,140,0.4) 0%, rgba(10,25,55,0.85) 8%, rgba(20,45,90,0.92) 50%, rgba(5,15,40,0.95) 100%)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        borderTop: "1px solid rgba(180,220,255,0.55)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 2px 10px rgba(70,130,200,0.3), inset 0 -1px 0 rgba(0,0,0,0.5)",
        fontFamily: '"Segoe UI", Tahoma, sans-serif',
      }}
    >
      {/* START BUTTON (orb fitted to taskbar height) */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onStartClick()
        }}
        className="relative flex items-center justify-center shrink-0"
        style={{ width: 44, height: 40 }}
        title="Inicio"
      >
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: startMenuOpen
              ? "radial-gradient(circle at 50% 50%, rgba(180,230,255,0.6) 0%, rgba(70,140,220,0.3) 40%, transparent 65%)"
              : "radial-gradient(circle at 50% 50%, rgba(140,200,255,0.45) 0%, rgba(20,80,160,0.2) 40%, transparent 65%)",
            filter: "blur(3px)",
          }}
        />
        <div
          className="relative w-[36px] h-[36px] rounded-full flex items-center justify-center"
          style={{
            background: startMenuOpen
              ? "radial-gradient(circle at 50% 28%, #e0eeff 0%, #88c4ff 35%, #1f63cc 80%, #0b3984 100%)"
              : "radial-gradient(circle at 50% 28%, #b3d5f5 0%, #4d8fdf 42%, #0d418a 85%, #061a44 100%)",
            boxShadow:
              "0 2px 10px rgba(0,80,180,0.8), inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -3px 6px rgba(0,15,50,0.6), 0 0 0 1px rgba(0,30,90,0.7)",
          }}
        >
          <div
            className="absolute top-[2px] left-[5px] right-[5px] h-[8px] rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.1) 70%, transparent)",
              filter: "blur(0.5px)",
            }}
          />
          <div className="relative z-10">
            <Win7Logo size={20} />
          </div>
        </div>
      </button>

      {/* TASKS + PINNED (icon-only, large, no text) */}
      <div className="flex items-center gap-[1px] pl-2 pr-1">
        {PINNED.map((p) => {
          const isOpen = windows.some((w) => w.id === p.id)
          const isActive = activeId === p.id && !windows.find((w) => w.id === p.id)?.minimized
          return (
            <TaskButton
              key={p.id}
              icon={<Win7Icon kind={p.id} size={30} />}
              title={p.label}
              isOpen={isOpen}
              isActive={isActive}
              onClick={() => onPin(p.id, p.label)}
            />
          )
        })}
        {windows
          .filter((w) => !["ie", "documents", "wmplayer"].includes(w.id))
          .map((w) => {
            const isActive = activeId === w.id && !w.minimized
            return (
              <TaskButton
                key={w.id}
                icon={appIconFor(w.app)}
                title={w.title}
                isOpen
                isActive={isActive}
                onMouseEnter={() => onPeek(w.id)}
                onMouseLeave={() => onPeek(null)}
                onClick={() => onTaskClick(w.id)}
              />
            )
          })}
      </div>

      <div className="flex-1" />

      {/* SYSTEM TRAY */}
      <div
        className="flex items-center h-full pl-2 pr-2 gap-1.5 text-white text-[11px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(50,100,180,0.35) 0%, rgba(15,30,75,0.5) 50%, rgba(5,15,40,0.5) 100%)",
          borderLeft: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "inset 1px 0 0 rgba(0,0,0,0.35)",
          fontFamily: '"Segoe UI", Tahoma, sans-serif',
        }}
      >
        {/* up chevron for hidden icons */}
        <button
          className="w-5 h-5 flex items-center justify-center hover:bg-white/15 rounded"
          title="Mostrar iconos ocultos"
        >
          <svg width="9" height="6" viewBox="0 0 9 6" fill="white" opacity="0.85">
            <path d="M 4.5 0 L 9 6 L 0 6 Z" />
          </svg>
        </button>
        {/* Network */}
        <button className="w-6 h-6 flex items-center justify-center hover:bg-white/15 rounded" title="Red">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="white">
            <path d="M 8 14 L 6 11 L 10 11 Z" />
            <path d="M 4 9 L 12 9 L 12 11 L 4 11 Z" opacity="0.85" />
            <path d="M 2 6 L 14 6 L 14 8 L 2 8 Z" opacity="0.7" />
            <path d="M 0 3 L 16 3 L 16 5 L 0 5 Z" opacity="0.55" />
          </svg>
        </button>
        {/* Volume */}
        <button className="w-6 h-6 flex items-center justify-center hover:bg-white/15 rounded" title="Volumen">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="white">
            <path d="M 0 5 L 0 9 L 3 9 L 7 13 L 7 1 L 3 5 Z" />
            <path d="M 9 4 Q 12 7 9 10" stroke="white" strokeWidth="1.2" fill="none" />
            <path d="M 11 2 Q 16 7 11 12" stroke="white" strokeWidth="1.2" fill="none" />
          </svg>
        </button>
        {/* Action Center flag */}
        <button className="w-6 h-6 flex items-center justify-center hover:bg-white/15 rounded" title="Action Center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
            <path d="M 3 1 L 12 4 L 3 7 Z" />
            <rect x="2.5" y="1" width="1" height="12" />
          </svg>
        </button>
        {/* Clock */}
        <div
          className="px-2 leading-tight text-right flex flex-col justify-center"
          style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}
        >
          <span>
            {time.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <span className="text-[10px] opacity-90">
            {time.toLocaleDateString("es-ES")}
          </span>
        </div>
      </div>

      {/* SHOW DESKTOP (right edge slim bar) */}
      <button
        onMouseEnter={() => onShowDesktopHover(true)}
        onMouseLeave={() => onShowDesktopHover(false)}
        onClick={onShowDesktop}
        className="h-full"
        style={{
          width: 10,
          borderLeft: "1px solid rgba(255,255,255,0.3)",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        }}
        title="Mostrar el escritorio"
      />
    </div>
  )
}

interface TaskButtonProps {
  icon: React.ReactNode
  title: string
  isOpen: boolean
  isActive: boolean
  onClick: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

function TaskButton({ icon, title, isOpen, isActive, onClick, onMouseEnter, onMouseLeave }: TaskButtonProps) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      title={title}
      className="relative flex items-center justify-center group shrink-0"
      style={{
        width: 38,
        height: 36,
        background: isActive
          ? "linear-gradient(to bottom, rgba(140,200,255,0.4) 0%, rgba(80,160,230,0.55) 50%, rgba(40,100,180,0.5) 100%)"
          : isOpen
          ? "linear-gradient(to bottom, rgba(90,150,220,0.25) 0%, rgba(40,100,180,0.3) 50%, rgba(20,60,130,0.25) 100%)"
          : "transparent",
        border: isActive
          ? "1px solid rgba(180,220,255,0.7)"
          : isOpen
          ? "1px solid rgba(140,180,230,0.45)"
          : "1px solid transparent",
        borderRadius: 3,
        boxShadow: isActive
          ? "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.15), 0 0 8px rgba(120,180,250,0.5)"
          : isOpen
          ? "inset 0 1px 0 rgba(255,255,255,0.2)"
          : "none",
      }}
    >
      <span style={{ width: 24, height: 24 }} className="inline-flex items-center justify-center">
        {icon}
      </span>
    </button>
  )
}
