"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCallback, useState } from "react"
import type { AppId } from "@/modules/ubuntu/types"
import { useClock } from "@/modules/ubuntu/hooks/use-clock"
import { useWindowManager } from "@/modules/ubuntu/hooks/use-window-manager"
import { Activities } from "@/modules/ubuntu/components/activities"
import { CalendarDropdown } from "@/modules/ubuntu/components/calendar-dropdown"
import { Dock, DOCK_APPS } from "@/modules/ubuntu/components/dock"
import { TopBar } from "@/modules/ubuntu/components/top-bar"
import { UbuntuWindow } from "@/modules/ubuntu/components/window"
import { Wallpaper } from "@/modules/ubuntu/components/wallpaper"
import { AppRenderer } from "@/modules/ubuntu/apps/app-renderer"

interface UbuntuSimulatorProps {
  onBack: () => void
}

const DEFAULTS: Record<AppId, { width: number; height: number; title: string }> = {
  files: { width: 720, height: 480, title: "Files" },
  terminal: { width: 680, height: 440, title: "Terminal" },
  firefox: { width: 760, height: 500, title: "Firefox" },
  settings: { width: 700, height: 480, title: "Settings" },
  software: { width: 700, height: 480, title: "Software" },
  gedit: { width: 600, height: 420, title: "Text Editor" },
  calculator: { width: 280, height: 380, title: "Calculator" },
  history: { width: 660, height: 500, title: "Linux History" },
}

export function UbuntuSimulator({ onBack }: UbuntuSimulatorProps) {
  const wm = useWindowManager()
  const time = useClock()
  const [activitiesOpen, setActivitiesOpen] = useState(false)
  const [calOpen, setCalOpen] = useState(false)

  const launch = useCallback(
    (id: AppId) => {
      const app = DOCK_APPS.find((a) => a.id === id) ?? { name: DEFAULTS[id].title }
      const def = DEFAULTS[id]
      wm.openApp(id, app.name, id, undefined, { width: def.width, height: def.height })
      setActivitiesOpen(false)
    },
    [wm],
  )

  const activeTitle = wm.windows.find((w) => w.id === wm.activeId)?.title

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex select-none overflow-hidden relative text-black"
      style={{ background: "linear-gradient(135deg, #2c001e 0%, #5e2750 50%, #772953 100%)" }}
    >
      <Wallpaper />

      <TopBar
        activitiesOpen={activitiesOpen}
        activeTitle={activeTitle}
        time={time}
        onActivities={() => setActivitiesOpen((a) => !a)}
        onCalendar={() => setCalOpen((c) => !c)}
      />

      <CalendarDropdown open={calOpen} time={time} onClose={() => setCalOpen(false)} />

      <Activities
        open={activitiesOpen}
        windows={wm.windows}
        onClose={() => setActivitiesOpen(false)}
        onLaunch={launch}
        onFocusWindow={wm.focusWindow}
      />

      <Dock windows={wm.windows} onLaunch={launch} onShowActivities={() => setActivitiesOpen(true)} />

      <div className="flex-1 relative ml-16 mt-7">
        <AnimatePresence>
          {wm.windows
            .filter((w) => !w.minimized)
            .map((w) => (
              <UbuntuWindow
                key={w.id}
                state={w}
                isActive={wm.activeId === w.id}
                onClose={() => wm.closeWindow(w.id)}
                onMinimize={() => wm.minimizeWindow(w.id)}
                onMaximize={() => wm.maximizeWindow(w.id)}
                onFocus={() => wm.focusWindow(w.id)}
              >
                <AppRenderer app={w.app} />
              </UbuntuWindow>
            ))}
        </AnimatePresence>
      </div>

      <button
        onClick={onBack}
        className="absolute top-9 right-2 z-[2000] bg-white/10 hover:bg-white/20 text-white px-3 py-1 text-xs rounded backdrop-blur"
      >
        Volver
      </button>
    </motion.div>
  )
}
