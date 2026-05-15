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

// Win7 left-column program list (matches authentic start menu)
type ProgramKind =
  | "firefox"
  | "gettingstarted"
  | "mediacenter"
  | "calc"
  | "stickynotes"
  | "paint"
  | "snipping"
  | "remotedesktop"
  | "magnifier"
  | "livewriter"

interface LeftProgram {
  icon: ProgramKind
  label: string
  arrow?: boolean
  appId?: AppId
}

const LEFT_PROGRAMS: LeftProgram[] = [
  { icon: "firefox", label: "Mozilla Firefox", arrow: true, appId: "ie" },
  { icon: "gettingstarted", label: "Getting Started", arrow: true, appId: "history" },
  { icon: "mediacenter", label: "Windows Media Center", appId: "wmplayer" },
  { icon: "calc", label: "Calculator", appId: "calc" },
  { icon: "stickynotes", label: "Sticky Notes", appId: "notepad" },
  { icon: "paint", label: "Paint", arrow: true, appId: "paint" },
  { icon: "snipping", label: "Snipping Tool" },
  { icon: "remotedesktop", label: "Remote Desktop Connection" },
  { icon: "magnifier", label: "Magnifier" },
  { icon: "livewriter", label: "Windows Live Writer" },
]

// Right-column menu items (matches authentic order)
const RIGHT_MENU: { label: string; appId?: AppId; separator?: boolean }[] = [
  { label: "Blog Bytes" },
  { label: "Documents", appId: "documents" },
  { label: "Pictures" },
  { label: "Music" },
  { label: "Games", separator: true },
  { label: "Computer", appId: "computer" },
  { label: "Control Panel", appId: "controlpanel" },
  { label: "Devices and Printers" },
  { label: "Default Programs" },
  { label: "Help and Support" },
  { label: "Run..." },
]

interface StartMenuProps {
  open: boolean
  onClose: () => void
  onShutdown: () => void
  onLaunch: (app: AppEntry) => void
}

export function StartMenu({ open, onClose, onShutdown, onLaunch }: StartMenuProps) {
  const [search, setSearch] = useState("")
  const filteredPrograms = search
    ? LEFT_PROGRAMS.filter((p) => p.label.toLowerCase().includes(search.toLowerCase()))
    : LEFT_PROGRAMS

  const tryLaunch = (id?: AppId) => {
    if (!id) {
      onClose()
      return
    }
    const app = APPS.find((a) => a.id === id)
    if (app) {
      onLaunch(app)
      onClose()
    } else {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.15 }}
          className="absolute left-0 w-[520px] z-50 text-white select-none"
          onClick={(e) => e.stopPropagation()}
          style={{
            bottom: 40,
            background:
              "linear-gradient(to bottom, rgba(15,40,80,0.92) 0%, rgba(8,25,55,0.96) 100%)",
            backdropFilter: "blur(20px) saturate(140%)",
            border: "1px solid rgba(180,220,255,0.5)",
            borderBottom: "none",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            boxShadow: "0 -4px 30px rgba(0,40,100,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <div className="flex" style={{ minHeight: 440 }}>
            {/* LEFT: Pinned + Recent programs */}
            <div className="flex-1 flex flex-col" style={{ minWidth: 260 }}>
              <div className="flex-1 p-1.5">
                <div className="space-y-0">
                  {filteredPrograms.slice(0, 10).map((p, i) => (
                    <button
                      key={i}
                      onClick={() => tryLaunch(p.appId)}
                      className="w-full flex items-center gap-2 px-2 py-[3px] hover:bg-blue-400/40 border border-transparent hover:border-blue-300/60 rounded-sm text-[12px] text-left group"
                    >
                      <span className="w-6 h-6 flex items-center justify-center shrink-0">
                        <Win7Icon kind={p.icon} size={22} />
                      </span>
                      <span className="text-white/95 flex-1 truncate">{p.label}</span>
                      {p.arrow && (
                        <svg width="6" height="9" viewBox="0 0 6 9" fill="white" opacity="0.6">
                          <path d="M 0 0 L 6 4.5 L 0 9 Z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {/* All Programs */}
              <button
                className="px-2 py-1 text-[12px] text-left hover:bg-blue-400/30 border-t border-white/15 flex items-center gap-2"
                onClick={onClose}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2" width="5" height="4" fill="#7fc7ff" stroke="#1c5fb8" strokeWidth="0.4" />
                  <rect x="1" y="7.5" width="5" height="4" fill="#7fc7ff" stroke="#1c5fb8" strokeWidth="0.4" />
                  <path d="M 8 4 L 12 7 L 8 10 Z" fill="white" />
                </svg>
                <span className="font-semibold">All Programs</span>
                <svg className="ml-auto" width="6" height="9" viewBox="0 0 6 9" fill="white" opacity="0.7">
                  <path d="M 6 0 L 0 4.5 L 6 9 Z" />
                </svg>
              </button>
              {/* Search */}
              <div className="p-1.5 border-t border-white/15">
                <div className="relative">
                  <input
                    autoFocus
                    placeholder="Search programs and files"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white border border-gray-400 rounded-sm pl-2 pr-7 py-[3px] text-[12px] text-black placeholder-gray-500 outline-none focus:border-blue-400"
                  />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-gradient-to-b from-gray-200 to-gray-400 rounded-sm border border-gray-500">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#333" strokeWidth="1.5">
                      <circle cx="4.5" cy="4.5" r="3" />
                      <path d="M 7 7 L 10 10" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: User + Menu links */}
            <div
              className="w-[210px] flex flex-col"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(0,0,0,0.18))",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Avatar */}
              <div className="flex flex-col items-center pt-3 pb-3 border-b border-white/15">
                <div
                  className="w-[52px] h-[52px] rounded-sm overflow-hidden flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #ffd494 0%, #ee9540 50%, #b85a14 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 2px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.5)",
                  }}
                >
                  {/* Fish-style silhouette like Win7 default avatar */}
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <defs>
                      <radialGradient id="av-light" cx="0.5" cy="0.3" r="0.6">
                        <stop offset="0" stopColor="white" stopOpacity="0.5" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="20" cy="16" rx="7" ry="7.5" fill="white" />
                    <path d="M 7 36 Q 8 23 20 22 Q 32 23 33 36 Z" fill="white" />
                    <rect width="40" height="40" fill="url(#av-light)" />
                  </svg>
                </div>
                <span className="text-[12px] mt-1 text-white">Usuario</span>
              </div>
              {/* Menu links */}
              <nav className="flex-1 py-1">
                {RIGHT_MENU.map((item, i) => (
                  <div key={i}>
                    <button
                      onClick={() => tryLaunch(item.appId)}
                      className="w-full text-left px-3 py-[3px] text-[12px] text-white hover:bg-blue-400/40 hover:border-blue-300/60 border border-transparent"
                    >
                      {item.label}
                    </button>
                    {item.separator && <div className="my-1 mx-3 border-t border-white/20" />}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Footer with shutdown - split button */}
          <div
            className="flex items-stretch justify-end px-2 py-1.5"
            style={{
              background: "linear-gradient(to bottom, rgba(20,40,80,0.4), rgba(0,15,40,0.75))",
              borderTop: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div
              className="flex items-stretch rounded-sm overflow-hidden"
              style={{
                background: "linear-gradient(to bottom, rgba(60,90,140,0.6) 0%, rgba(30,55,100,0.85) 100%)",
                border: "1px solid rgba(120,160,210,0.6)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              <button
                onClick={onShutdown}
                className="flex items-center gap-2 px-3 py-1 text-[12px] text-white hover:bg-white/15"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="white" strokeWidth="1.4">
                  <path d="M 6.5 1.5 L 6.5 6.5" strokeLinecap="round" />
                  <path d="M 3.5 3.5 A 5 5 0 1 0 9.5 3.5" strokeLinecap="round" />
                </svg>
                Shut down
              </button>
              <button
                className="px-2 hover:bg-white/15 border-l border-white/20 flex items-center"
                title="Options"
              >
                <svg width="7" height="5" viewBox="0 0 7 5" fill="white">
                  <path d="M 0 0 L 7 0 L 3.5 5 Z" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { APPS as WIN7_APPS }
export type { AppEntry }
