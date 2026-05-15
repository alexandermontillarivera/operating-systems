"use client"

import { motion, AnimatePresence } from "framer-motion"
import { DOCK_APPS } from "@/modules/ubuntu/components/dock"
import { UbuntuIcon } from "@/modules/ubuntu/components/icons"
import type { AppId, UbuntuWindowState } from "@/modules/ubuntu/types"

interface ActivitiesProps {
  open: boolean
  windows: UbuntuWindowState[]
  onClose: () => void
  onLaunch: (id: AppId) => void
  onFocusWindow: (id: string) => void
}

export function Activities({ open, windows, onClose, onLaunch, onFocusWindow }: ActivitiesProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[1500] bg-black/60 backdrop-blur-md p-8 pt-12 flex flex-col text-white"
          onClick={onClose}
        >
          <div className="text-xs text-center mb-4 opacity-70">
            Activities · Press Esc or click outside to close
          </div>
          <input
            autoFocus
            placeholder="Type to search..."
            className="mx-auto mb-6 w-96 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 outline-none"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-1 grid grid-cols-3 gap-6 content-center max-w-3xl mx-auto">
            {windows.length > 0 &&
              windows.map((w) => (
                <button
                  key={w.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    onFocusWindow(w.id)
                    onClose()
                  }}
                  className="bg-white rounded-lg overflow-hidden shadow-2xl aspect-video"
                >
                  <div className="bg-gray-200 px-3 py-1 text-xs text-gray-700">{w.title}</div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-200 h-full flex items-center justify-center text-3xl opacity-60">
                    {/* preview placeholder */}
                  </div>
                </button>
              ))}
          </div>
          <div
            className="grid grid-cols-8 gap-4 max-w-3xl mx-auto pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {DOCK_APPS.map((a) => (
              <button
                key={a.id}
                onClick={() => onLaunch(a.id)}
                className="flex flex-col items-center hover:scale-110 transition-transform"
              >
                <UbuntuIcon kind={a.icon} />
                <span className="text-xs mt-1">{a.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
