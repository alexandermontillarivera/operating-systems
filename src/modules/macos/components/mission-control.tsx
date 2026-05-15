"use client"

import { motion, AnimatePresence } from "framer-motion"
import { DOCK_APPS } from "@/modules/macos/components/dock"
import { DockIcon } from "@/modules/macos/components/dock-icons"
import type { MacOSWindowState } from "@/modules/macos/types"

interface MissionControlProps {
  open: boolean
  windows: MacOSWindowState[]
  onClose: () => void
  onFocusWindow: (id: string) => void
}

const ICON_KIND = {
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
} as const

export function MissionControl({ open, windows, onClose, onFocusWindow }: MissionControlProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[5000] bg-black/40 backdrop-blur-md p-8 flex flex-col text-white"
          onClick={onClose}
        >
          <div className="text-sm text-center mb-4">Mission Control · F3 para alternar</div>
          <div className="flex-1 grid grid-cols-3 gap-6 content-center">
            {windows.length === 0 && (
              <div className="col-span-3 text-white/70 text-center py-12">No hay ventanas abiertas</div>
            )}
            {windows.map((w) => (
              <motion.button
                key={w.id}
                layout
                whileHover={{ scale: 1.05 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onFocusWindow(w.id)
                  onClose()
                }}
                className="bg-white rounded-lg overflow-hidden shadow-2xl aspect-video"
              >
                <div className="h-full flex flex-col">
                  <div className="bg-gray-100 px-3 py-1 text-xs flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-medium">{w.title}</span>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center text-3xl opacity-60">
                    <DockIcon kind={ICON_KIND[w.app]} />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          {/* Show dock apps for quick launch */}
          <div className="text-xs text-white/50 mt-4 text-center">
            {DOCK_APPS.length} apps in dock
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
