"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  BookIcon,
  CalcIcon,
  ControlPanelIcon,
  FolderIcon,
  IEIcon,
  MediaPlayerIcon,
  MessengerIcon,
  MinesIcon,
  MovieMakerIcon,
  MyComputerIcon,
  NotepadIcon,
  OutlookIcon,
  PaintIcon,
  SolitaireIcon,
} from "@/modules/winxp/components/icons"

export type LaunchKey =
  | "ie"
  | "outlook"
  | "mediaplayer"
  | "messenger"
  | "moviemaker"
  | "paint"
  | "notepad"
  | "calc"
  | "minesweeper"
  | "solitaire"
  | "mydocs"
  | "mypc"
  | "controlpanel"

interface StartMenuProps {
  open: boolean
  onClose: () => void
  onShutdown: () => void
  onLaunch: (key: LaunchKey) => void
}

interface AppRow {
  icon: React.ReactNode
  label: string
  desc?: string
  key: LaunchKey
}

const FREQ_APPS: AppRow[] = [
  { icon: <IEIcon size={28} />, label: "Internet Explorer", desc: "Internet", key: "ie" },
  { icon: <OutlookIcon size={28} />, label: "Outlook Express", desc: "E-mail", key: "outlook" },
]

const RECENT_APPS: AppRow[] = [
  { icon: <MediaPlayerIcon size={24} />, label: "Windows Media Player", key: "mediaplayer" },
  { icon: <MessengerIcon size={24} />, label: "Windows Messenger", key: "messenger" },
  { icon: <MovieMakerIcon size={24} />, label: "Windows Movie Maker", key: "moviemaker" },
]

const ALL_PROGRAMS: AppRow[] = [
  { icon: <PaintIcon size={20} />, label: "Paint", key: "paint" },
  { icon: <NotepadIcon size={20} />, label: "Bloc de notas", key: "notepad" },
  { icon: <CalcIcon size={20} />, label: "Calculadora", key: "calc" },
  { icon: <MinesIcon size={20} />, label: "Buscaminas", key: "minesweeper" },
  { icon: <SolitaireIcon size={20} />, label: "Solitario", key: "solitaire" },
]

const RIGHT_COLUMN: { icon: React.ReactNode; name: string; key?: LaunchKey }[] = [
  { icon: <FolderIcon size={18} />, name: "Mis documentos", key: "mydocs" },
  { icon: <FolderIcon size={18} />, name: "Mis imágenes" },
  { icon: <FolderIcon size={18} />, name: "Mi música" },
  { icon: <MyComputerIcon size={18} />, name: "Mi PC", key: "mypc" },
  { icon: <ControlPanelIcon size={18} />, name: "Panel de control", key: "controlpanel" },
  { icon: <BookIcon size={18} />, name: "Buscar" },
  { icon: <NotepadIcon size={18} />, name: "Ejecutar..." },
]

export function StartMenu({ open, onClose, onShutdown, onLaunch }: StartMenuProps) {
  const [allProgsOpen, setAllProgsOpen] = useState(false)

  const launchAndClose = (k: LaunchKey) => {
    onLaunch(k)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-9 left-0 w-[400px] bg-white shadow-2xl z-[9999] overflow-visible text-black"
            style={{ borderTopRightRadius: 8 }}
          >
            <div
              className="bg-gradient-to-b from-[#0e7ec5] to-[#1565b8] p-3 flex items-center gap-3"
              style={{ borderTopRightRadius: 8 }}
            >
              <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-2xl shadow border-2 border-yellow-300">
                👤
              </div>
              <span className="text-white font-bold drop-shadow">Usuario</span>
            </div>

            <div className="flex">
              <div className="flex-1 bg-white p-2">
                {FREQ_APPS.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => launchAndClose(it.key)}
                    className="w-full px-2 py-1 flex items-center gap-3 hover:bg-blue-100 rounded text-sm text-left"
                  >
                    <span className="shrink-0">{it.icon}</span>
                    <span className="flex flex-col">
                      <span className="font-semibold">{it.label}</span>
                      {it.desc && <span className="text-[10px] text-gray-500">{it.desc}</span>}
                    </span>
                  </button>
                ))}
                <div className="border-t border-gray-300 my-1" />
                {RECENT_APPS.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => launchAndClose(it.key)}
                    className="w-full px-2 py-1 flex items-center gap-3 hover:bg-blue-100 rounded text-sm text-left"
                  >
                    <span className="shrink-0">{it.icon}</span>
                    <span className="font-semibold">{it.label}</span>
                  </button>
                ))}
                <div className="border-t border-gray-300 my-2" />
                <button
                  onClick={() => setAllProgsOpen((s) => !s)}
                  className="w-full px-2 py-1 flex items-center gap-2 hover:bg-blue-100 rounded text-sm font-bold"
                >
                  <FolderIcon size={18} /> Todos los programas
                  <span className="ml-auto">▶</span>
                </button>
                {allProgsOpen && (
                  <div className="absolute left-full top-12 bg-white border border-gray-400 shadow-xl w-56 py-1 text-sm">
                    {ALL_PROGRAMS.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          launchAndClose(p.key)
                          setAllProgsOpen(false)
                        }}
                        className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-blue-500 hover:text-white text-left"
                      >
                        <span className="shrink-0">{p.icon}</span>
                        {p.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-44 bg-blue-50 p-2 border-l border-blue-200">
                {RIGHT_COLUMN.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => it.key && launchAndClose(it.key)}
                    className="w-full px-2 py-1 flex items-center gap-2 hover:bg-blue-200 rounded text-sm text-left"
                  >
                    <span className="shrink-0">{it.icon}</span>
                    <span className="font-semibold text-blue-900">{it.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#1565b8] to-[#0e7ec5] p-2 flex justify-end gap-2">
              <button
                onClick={onShutdown}
                className="px-3 py-1 bg-gradient-to-b from-red-500 to-red-700 text-white rounded text-sm flex items-center gap-1 shadow"
              >
                <span>🔌</span> Apagar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
