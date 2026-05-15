"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import type { AppId } from "@/modules/macos/types"
import { useClock } from "@/modules/macos/hooks/use-clock"
import { useWindowManager } from "@/modules/macos/hooks/use-window-manager"
import { AppleMenu } from "@/modules/macos/components/apple-menu"
import { Dock, DOCK_APPS } from "@/modules/macos/components/dock"
import { MacOSWindow } from "@/modules/macos/components/window"
import { MenuBar } from "@/modules/macos/components/menu-bar"
import { MissionControl } from "@/modules/macos/components/mission-control"
import { NotificationCenter } from "@/modules/macos/components/notification-center"
import { Spotlight } from "@/modules/macos/components/spotlight"
import { AppRenderer } from "@/modules/macos/apps/app-renderer"

interface MacOSSimulatorProps {
  onBack: () => void
}

const APP_DEFAULTS: Record<AppId, { width: number; height: number }> = {
  finder: { width: 720, height: 480 },
  safari: { width: 760, height: 500 },
  mail: { width: 700, height: 460 },
  notes: { width: 640, height: 460 },
  calendar: { width: 640, height: 460 },
  calculator: { width: 280, height: 360 },
  music: { width: 720, height: 480 },
  terminal: { width: 640, height: 420 },
  history: { width: 600, height: 480 },
  settings: { width: 640, height: 460 },
  photos: { width: 600, height: 480 },
}

export function MacOSSimulator({ onBack }: MacOSSimulatorProps) {
  const wm = useWindowManager()
  const time = useClock()
  const [appleMenuOpen, setAppleMenuOpen] = useState(false)
  const [spotlightOpen, setSpotlightOpen] = useState(false)
  const [missionControlOpen, setMissionControlOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  // Cmd+Space → Spotlight, F3 → Mission Control
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === " ") {
        e.preventDefault()
        setSpotlightOpen((s) => !s)
      }
      if (e.key === "F3" || (e.ctrlKey && e.key === "ArrowUp")) {
        e.preventDefault()
        setMissionControlOpen((m) => !m)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const launch = useCallback(
    (id: AppId) => {
      const app = DOCK_APPS.find((a) => a.id === id)
      if (!app) return
      const def = APP_DEFAULTS[id]
      wm.openApp(id, app.name, id, undefined, def)
      setSpotlightOpen(false)
      setMissionControlOpen(false)
    },
    [wm],
  )

  const activeAppName =
    DOCK_APPS.find((a) => a.id === wm.windows.find((w) => w.id === wm.activeId)?.app)?.name ??
    "Finder"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col select-none overflow-hidden text-black"
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      }}
    >
      <MenuBar
        appleOpen={appleMenuOpen}
        onToggleApple={() => setAppleMenuOpen((o) => !o)}
        activeAppName={activeAppName}
        time={time}
        onSpotlight={() => setSpotlightOpen(true)}
        onMissionControl={() => setMissionControlOpen(true)}
        onNotifications={() => setNotifOpen((n) => !n)}
        notificationCenterOpen={notifOpen}
      />

      <AppleMenu
        open={appleMenuOpen}
        onClose={() => setAppleMenuOpen(false)}
        onShutdown={onBack}
        onOpenSettings={() => launch("settings")}
      />

      <div className="flex-1 relative">
        <AnimatePresence>
          {!missionControlOpen &&
            wm.windows
              .filter((w) => !w.minimized)
              .map((w) => (
                <MacOSWindow
                  key={w.id}
                  state={w}
                  isActive={wm.activeId === w.id}
                  onClose={() => wm.closeWindow(w.id)}
                  onMinimize={() => wm.minimizeWindow(w.id)}
                  onFocus={() => wm.focusWindow(w.id)}
                >
                  <AppRenderer app={w.app} time={time} />
                </MacOSWindow>
              ))}
        </AnimatePresence>

        <MissionControl
          open={missionControlOpen}
          windows={wm.windows}
          onClose={() => setMissionControlOpen(false)}
          onFocusWindow={wm.focusWindow}
        />

        <Spotlight open={spotlightOpen} onClose={() => setSpotlightOpen(false)} onLaunch={launch} />

        <NotificationCenter open={notifOpen} time={time} onClose={() => setNotifOpen(false)} />
      </div>

      <Dock windows={wm.windows} onLaunch={launch} />

      <button
        onClick={onBack}
        className="absolute top-10 right-4 px-4 py-1.5 bg-white/90 backdrop-blur hover:bg-white rounded-lg text-sm shadow-lg z-[1500]"
      >
        Volver
      </button>
    </motion.div>
  )
}
