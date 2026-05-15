"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { DOCK_APPS } from "@/modules/macos/components/dock"
import { DockIcon } from "@/modules/macos/components/dock-icons"
import type { AppId } from "@/modules/macos/types"

interface SpotlightProps {
  open: boolean
  onClose: () => void
  onLaunch: (id: AppId) => void
}

export function Spotlight({ open, onClose, onLaunch }: SpotlightProps) {
  const [query, setQuery] = useState("")
  const filtered = query
    ? DOCK_APPS.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
    : DOCK_APPS.slice(0, 6)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] bg-white/85 backdrop-blur-xl rounded-xl shadow-2xl z-[9999] overflow-hidden text-black"
          >
            <div className="flex items-center px-4 py-3 gap-3 border-b border-gray-200">
              <span className="text-gray-400 text-xl">🔍</span>
              <input
                autoFocus
                type="text"
                placeholder="Búsqueda en Spotlight"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered[0]) {
                    onLaunch(filtered[0].id)
                    onClose()
                  }
                  if (e.key === "Escape") onClose()
                }}
                className="flex-1 bg-transparent outline-none text-lg text-black"
              />
            </div>
            <div className="p-2 max-h-80 overflow-y-auto">
              {query && (
                <p className="text-xs text-gray-500 px-2 py-1">
                  {filtered.length} resultado(s) para &quot;{query}&quot;
                </p>
              )}
              {!query && <p className="text-xs text-gray-500 px-2 py-1">Sugerencias</p>}
              {filtered.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    onLaunch(app.id)
                    onClose()
                  }}
                  className="w-full px-3 py-2 flex items-center gap-3 hover:bg-blue-500 hover:text-white rounded-lg"
                >
                  <div className="w-8 h-8 [&>div]:!w-8 [&>div]:!h-8">
                    <DockIcon
                      kind={
                        app.id === "calculator"
                          ? "calc"
                          : app.id === "history"
                            ? "book"
                            : app.id === "photos"
                              ? "notes"
                              : (app.id as "finder" | "safari" | "mail" | "notes" | "calendar" | "music" | "terminal" | "settings")
                      }
                    />
                  </div>
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
