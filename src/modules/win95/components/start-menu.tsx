"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CalcIcon,
  DocumentsIcon,
  FindIcon,
  HelpIcon,
  MinesIcon,
  NotepadIcon,
  PaintIcon,
  ProgramsIcon,
  RunIcon,
  SettingsIcon,
  ShutdownIcon,
  SolitaireIcon,
} from "@/modules/win95/components/icons"

interface StartMenuItem {
  icon?: React.ReactNode
  label?: string
  divider?: boolean
  hasSubmenu?: boolean
  onClick?: () => void
  children?: { icon: React.ReactNode; label: string; onClick: () => void }[]
}

interface StartMenuProps {
  open: boolean
  onClose: () => void
  onShutdown: () => void
  onLaunch: (key: LaunchKey) => void
}

export type LaunchKey =
  | "notepad"
  | "wordpad"
  | "paint"
  | "calculator"
  | "minesweeper"
  | "solitaire"
  | "explorer"
  | "documents"
  | "find"
  | "run"
  | "settings"
  | "help"

export function StartMenu({ open, onClose, onShutdown, onLaunch }: StartMenuProps) {
  const items: StartMenuItem[] = [
    {
      icon: <ProgramsIcon size={32} />,
      label: "Programas",
      hasSubmenu: true,
      children: [
        { icon: <NotepadIcon size={16} />, label: "Bloc de notas", onClick: () => onLaunch("notepad") },
        { icon: <NotepadIcon size={16} />, label: "WordPad", onClick: () => onLaunch("wordpad") },
        { icon: <PaintIcon size={16} />, label: "Paint", onClick: () => onLaunch("paint") },
        { icon: <CalcIcon size={16} />, label: "Calculadora", onClick: () => onLaunch("calculator") },
        { icon: <MinesIcon size={16} />, label: "Buscaminas", onClick: () => onLaunch("minesweeper") },
        { icon: <SolitaireIcon size={16} />, label: "Solitario", onClick: () => onLaunch("solitaire") },
      ],
    },
    {
      icon: <DocumentsIcon size={32} />,
      label: "Documentos",
      onClick: () => onLaunch("documents"),
    },
    { icon: <SettingsIcon size={32} />, label: "Configuración", onClick: () => onLaunch("settings") },
    { icon: <FindIcon size={32} />, label: "Buscar", onClick: () => onLaunch("find") },
    { icon: <HelpIcon size={32} />, label: "Ayuda", onClick: () => onLaunch("help") },
    { icon: <RunIcon size={32} />, label: "Ejecutar...", onClick: () => onLaunch("run") },
    { divider: true },
    { icon: <ShutdownIcon size={32} />, label: "Apagar el sistema...", onClick: onShutdown },
  ]

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.1 }}
            className="absolute bottom-7 left-0 w-[260px] bg-[#c0c0c0] z-[9999] flex"
            style={{
              boxShadow:
                "inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #dfdfdf, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #ffffff",
              fontFamily: "Tahoma, 'MS Sans Serif', sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
            <div className="flex-1 py-1">
              {items.map((it, i) =>
                it.divider ? (
                  <Divider key={i} />
                ) : (
                  <StartMenuRow
                    key={i}
                    item={it}
                    onClose={onClose}
                  />
                ),
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Sidebar() {
  return (
    <div
      className="w-7 flex items-end justify-center pb-2"
      style={{
        background: "linear-gradient(180deg, #808080 0%, #404040 50%, #000080 100%)",
      }}
    >
      <div
        className="text-white font-bold text-[14px] tracking-tight"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          textShadow: "1px 1px 0 #000",
        }}
      >
        Windows<span className="text-[#c0c0c0]">95</span>
      </div>
    </div>
  )
}

function Divider() {
  return (
    <div
      className="my-1 mx-1 h-px"
      style={{
        background: "linear-gradient(to bottom, #808080 50%, #fff 50%)",
      }}
    />
  )
}

function StartMenuRow({ item, onClose }: { item: StartMenuItem; onClose: () => void }) {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const hasSubmenu = item.hasSubmenu && item.children
  return (
    <div
      className="relative"
      onMouseEnter={() => setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}
    >
      <button
        onClick={() => {
          if (item.onClick) {
            item.onClick()
            onClose()
          }
        }}
        className="w-full px-1 py-0.5 flex items-center gap-2 text-[11px] text-left hover:bg-[#000080] hover:text-white"
      >
        <span className="w-8 h-8 shrink-0 flex items-center justify-center">{item.icon}</span>
        <span className="flex-1">{item.label}</span>
        {hasSubmenu && <span className="text-[10px] mr-1">▶</span>}
      </button>
      {hasSubmenu && submenuOpen && (
        <div
          className="absolute left-full top-0 w-[200px] bg-[#c0c0c0] z-[10000] py-1"
          style={{
            boxShadow:
              "inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #dfdfdf, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #ffffff",
          }}
        >
          {item.children?.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                c.onClick()
                onClose()
              }}
              className="w-full px-2 py-0.5 flex items-center gap-2 text-[11px] text-left hover:bg-[#000080] hover:text-white"
            >
              <span className="w-4 h-4 shrink-0">{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
