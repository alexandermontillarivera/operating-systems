"use client"

import { motion } from "framer-motion"
import { DockIcon } from "@/modules/macos/components/dock-icons"
import type { AppId, MacOSWindowState } from "@/modules/macos/types"

interface DockApp {
  id: AppId
  name: string
}

const APPS: DockApp[] = [
  { id: "finder", name: "Finder" },
  { id: "safari", name: "Safari" },
  { id: "mail", name: "Mail" },
  { id: "notes", name: "Notas" },
  { id: "calendar", name: "Calendario" },
  { id: "calculator", name: "Calculadora" },
  { id: "music", name: "Música" },
  { id: "terminal", name: "Terminal" },
  { id: "history", name: "Historia" },
  { id: "settings", name: "Ajustes" },
]

const ICON_KIND: Record<AppId, "finder" | "safari" | "mail" | "notes" | "calendar" | "calc" | "music" | "terminal" | "book" | "settings"> = {
  finder: "finder",
  safari: "safari",
  mail: "mail",
  notes: "notes",
  photos: "notes",
  calendar: "calendar",
  calculator: "calc",
  music: "music",
  terminal: "terminal",
  history: "book",
  settings: "settings",
}

interface DockProps {
  windows: MacOSWindowState[]
  onLaunch: (id: AppId) => void
}

export function Dock({ windows, onLaunch }: DockProps) {
  return (
    <div className="flex justify-center pb-2 z-[1000] relative">
      <motion.div className="flex items-end gap-1 px-3 py-1 bg-white/30 backdrop-blur-xl rounded-2xl border border-white/50">
        {APPS.map((app) => {
          const isOpen = windows.some((w) => w.id === app.id)
          return (
            <motion.button
              key={app.id}
              whileHover={{ scale: 1.4, y: -12 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onLaunch(app.id)}
              className="relative flex flex-col items-center group"
            >
              <DockIcon kind={ICON_KIND[app.id]} />
              {isOpen && <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />}
              <div className="absolute -top-9 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {app.name}
              </div>
            </motion.button>
          )
        })}
        <div className="w-px h-10 bg-white/50 mx-2" />
        <motion.button whileHover={{ scale: 1.4, y: -12 }} className="relative group">
          <DockIcon kind="trash" />
          <div className="absolute -top-9 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
            Papelera
          </div>
        </motion.button>
      </motion.div>
    </div>
  )
}

export { APPS as DOCK_APPS }
