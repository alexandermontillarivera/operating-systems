"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Win7Icon } from "@/modules/win7/components/icons"
import type { AppId } from "@/modules/win7/types"

interface AppEntry {
  id: AppId
  label: string
  size?: { width: number; height: number }
}

const APPS: AppEntry[] = [
  { id: "computer", label: "Equipo", size: { width: 700, height: 460 } },
  { id: "documents", label: "Documentos", size: { width: 600, height: 420 } },
  { id: "ie", label: "Internet Explorer", size: { width: 760, height: 500 } },
  { id: "notepad", label: "Bloc de notas", size: { width: 480, height: 340 } },
  { id: "calc", label: "Calculadora", size: { width: 280, height: 360 } },
  { id: "paint", label: "Paint", size: { width: 640, height: 480 } },
  { id: "wmplayer", label: "Media Player", size: { width: 560, height: 400 } },
  { id: "controlpanel", label: "Panel de control", size: { width: 600, height: 440 } },
  { id: "history", label: "Historia Win 7", size: { width: 660, height: 500 } },
]

interface StartMenuProps {
  open: boolean
  onClose: () => void
  onShutdown: () => void
  onLaunch: (app: AppEntry) => void
}

export function StartMenu({ open, onClose, onShutdown, onLaunch }: StartMenuProps) {
  const [search, setSearch] = useState("")
  const filtered = search ? APPS.filter((a) => a.label.toLowerCase().includes(search.toLowerCase())) : APPS

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-12 left-0 w-[420px] bg-gradient-to-b from-[#1d4d8c]/95 to-[#0c2540]/95 backdrop-blur-xl rounded-t-lg border border-white/30 overflow-hidden z-50 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex">
            <div className="flex-1 p-2">
              <div className="space-y-px">
                {filtered.slice(0, 8).map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      onLaunch(a)
                      onClose()
                    }}
                    className="w-full flex items-center gap-3 px-3 py-1.5 hover:bg-white/15 rounded text-sm text-left"
                  >
                    <Win7Icon kind={a.id} size={20} />
                    {a.label}
                  </button>
                ))}
              </div>
              <div className="border-t border-white/20 mt-2 pt-2">
                <input
                  autoFocus
                  placeholder="Buscar programas y archivos"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/10 border border-white/30 rounded px-2 py-1 text-sm text-white placeholder-white/50 outline-none"
                />
              </div>
            </div>
            <div className="w-44 bg-black/30 p-2">
              <div className="text-xs opacity-60 mb-2 px-2">Usuario</div>
              <div className="flex items-center gap-2 p-2 bg-white/5 rounded mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <span className="text-sm">Usuario</span>
              </div>
              {APPS.slice(0, 5).map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    onLaunch(a)
                    onClose()
                  }}
                  className="w-full px-2 py-1 flex items-center gap-2 hover:bg-white/15 rounded text-sm text-left"
                >
                  <Win7Icon kind={a.id} size={16} /> {a.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 p-2 bg-black/40 border-t border-white/10">
            <button
              onClick={onShutdown}
              className="flex items-center gap-2 px-4 py-1 hover:bg-white/10 rounded text-white text-sm"
            >
              <span>⏻</span> Apagar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { APPS as WIN7_APPS }
export type { AppEntry }
