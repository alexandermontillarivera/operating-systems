"use client"

import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import type { AppId } from "@/modules/win7/types"
import { useClock } from "@/modules/win7/hooks/use-clock"
import { useWindowManager } from "@/modules/win7/hooks/use-window-manager"
import { CalendarGadget, ClockGadget, WeatherGadget } from "@/modules/win7/components/gadgets"
import { Win7Icon } from "@/modules/win7/components/icons"
import { SnapPreview } from "@/modules/win7/components/snap-preview"
import { StartMenu, WIN7_APPS, type AppEntry } from "@/modules/win7/components/start-menu"
import { Taskbar } from "@/modules/win7/components/taskbar"
import { Win7Window } from "@/modules/win7/components/window"
import { AppRenderer } from "@/modules/win7/apps/app-renderer"

interface Win7SimulatorProps {
  onBack: () => void
}

const DESKTOP_ICONS: { id: AppId | "recyclebin"; label: string; launchAs?: AppId }[] = [
  { id: "recyclebin", label: "Recycle Bin" },
  { id: "history", label: "Historia Win 7", launchAs: "history" },
]

export function Win7Simulator({ onBack }: Win7SimulatorProps) {
  const wm = useWindowManager()
  const time = useClock()
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [snapPreview, setSnapPreview] = useState<"left" | "right" | "max" | null>(null)
  const [peekId, setPeekId] = useState<string | null>(null)
  const [showDesktopHover, setShowDesktopHover] = useState(false)

  const launch = (a: AppEntry) => {
    wm.openApp(a.id, a.label, a.id, undefined, a.size)
    setStartMenuOpen(false)
  }
  const launchById = (id: AppId, label: string) => {
    const app = WIN7_APPS.find((a) => a.id === id)
    if (app) launch(app)
    else wm.openApp(id, label, id)
  }

  return (
    <div
      className="min-h-screen overflow-hidden relative select-none text-black"
      onClick={() => startMenuOpen && setStartMenuOpen(false)}
    >
      {/* Wallpaper image (Harmony) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/win7-harmony.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#1c4582",
        }}
      />

      {/* Desktop icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4 z-10">
        {DESKTOP_ICONS.map((icon) => (
          <button
            key={icon.id}
            onDoubleClick={() => icon.launchAs && launchById(icon.launchAs, icon.label)}
            className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 cursor-pointer w-20"
          >
            <div className="drop-shadow-lg">
              <Win7Icon kind={icon.id as AppId | "recyclebin"} size={44} />
            </div>
            <span className="text-white text-xs text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{icon.label}</span>
          </button>
        ))}
      </div>

      {/* Gadgets sidebar */}
      <div className="absolute top-4 right-4 z-10 space-y-3 w-44">
        <ClockGadget time={time} />
        <WeatherGadget />
        <CalendarGadget time={time} />
      </div>

      <SnapPreview mode={snapPreview} />

      <AnimatePresence>
        {wm.windows
          .filter((w) => !w.minimized)
          .map((w) => (
            <Win7Window
              key={w.id}
              state={w}
              isActive={wm.activeId === w.id}
              peekHidden={peekId !== null && peekId !== w.id}
              showDesktopHover={showDesktopHover}
              onClose={() => wm.closeWindow(w.id)}
              onMinimize={() => wm.minimizeWindow(w.id)}
              onMaximize={() => wm.maximizeWindow(w.id)}
              onFocus={() => wm.focusWindow(w.id)}
              onSnap={(mode) => wm.snapWindow(w.id, mode)}
              onPreview={setSnapPreview}
            >
              <AppRenderer app={w.app} data={w.data} />
            </Win7Window>
          ))}
      </AnimatePresence>

      <StartMenu
        open={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onShutdown={onBack}
        onLaunch={launch}
      />

      <Taskbar
        windows={wm.windows}
        activeId={wm.activeId}
        startMenuOpen={startMenuOpen}
        time={time}
        appIconFor={(app) => <Win7Icon kind={app} size={20} />}
        onStartClick={() => setStartMenuOpen((s) => !s)}
        onTaskClick={(id) => {
          const w = wm.windows.find((x) => x.id === id)
          if (w?.minimized) wm.focusWindow(id)
          else if (wm.activeId === id) wm.minimizeWindow(id)
          else wm.focusWindow(id)
        }}
        onPeek={setPeekId}
        onShowDesktop={wm.showDesktop}
        onShowDesktopHover={setShowDesktopHover}
        onPin={launchById}
      />

      <button
        onClick={onBack}
        className="absolute top-2 right-2 z-[100] bg-black/30 hover:bg-black/50 text-white px-4 py-1.5 text-sm rounded backdrop-blur-sm border border-white/20"
      >
        Volver
      </button>
    </div>
  )
}
