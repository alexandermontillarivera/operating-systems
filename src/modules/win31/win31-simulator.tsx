"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import type { AppId } from "@/modules/win31/types"
import { useWindowManager } from "@/modules/win31/hooks/use-window-manager"
import { Win31Window } from "@/modules/win31/components/window"
import { Taskbar } from "@/modules/win31/components/taskbar"
import { AppRenderer } from "@/modules/win31/apps/app-renderer"

interface Win31SimulatorProps {
  onBack: () => void
}

export function Win31Simulator({ onBack }: Win31SimulatorProps) {
  const wm = useWindowManager()
  const [showProgman, setShowProgman] = useState(true)

  const visible = wm.windows.filter(
    (w) => !w.minimized && (w.id !== "progman" || showProgman),
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#008080] overflow-hidden relative select-none text-black"
      style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <button
        onClick={onBack}
        className="absolute top-2 right-2 z-[200] bg-[#c0c0c0] hover:bg-[#d0d0d0] text-black px-3 py-1 text-sm"
        style={{
          boxShadow:
            "inset -1px -1px 0 0 #404040, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
        }}
      >
        Volver
      </button>

      {visible.map((w) => (
        <Win31Window
          key={w.id}
          state={w}
          isActive={wm.activeId === w.id}
          onClose={() => {
            if (w.id === "progman") setShowProgman(false)
            else wm.closeWindow(w.id)
          }}
          onMinimize={() => wm.minimizeWindow(w.id)}
          onFocus={() => wm.focusWindow(w.id)}
        >
          <AppRenderer
            app={w.app}
            openApp={(id, title, app, opts) => wm.openApp(id, title, app as AppId, opts)}
          />
        </Win31Window>
      ))}

      <Taskbar
        windows={wm.windows}
        programManagerVisible={showProgman}
        onShowProgramManager={() => setShowProgman(true)}
        onRestoreWindow={(id) => wm.focusWindow(id)}
      />
    </motion.div>
  )
}
