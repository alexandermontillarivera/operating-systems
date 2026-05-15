"use client"

import { motion, AnimatePresence } from "framer-motion"

interface AppleMenuProps {
  open: boolean
  onClose: () => void
  onShutdown: () => void
  onOpenSettings: () => void
}

export function AppleMenu({ open, onClose, onShutdown, onOpenSettings }: AppleMenuProps) {
  const items = [
    { label: "Acerca de este Mac" },
    { divider: true },
    { label: "Ajustes del Sistema...", onClick: onOpenSettings },
    { divider: true },
    { label: "Force Quit...", shortcut: "⌥⌘⎋" },
    { divider: true },
    { label: "Reposo" },
    { label: "Reiniciar..." },
    { label: "Apagar...", onClick: onShutdown },
  ] as const

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[9999]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-7 left-1 w-56 bg-white/90 backdrop-blur-xl rounded-lg shadow-2xl z-[10001] py-1 border border-gray-200 text-sm text-black"
          >
            {items.map((it, i) =>
              "divider" in it ? (
                <div key={i} className="border-t border-gray-200 my-1" />
              ) : (
                <button
                  key={i}
                  onClick={() => {
                    it.onClick?.()
                    onClose()
                  }}
                  className="w-full px-4 py-1 text-left hover:bg-blue-500 hover:text-white flex justify-between items-center"
                >
                  <span>{it.label}</span>
                  {"shortcut" in it && it.shortcut && (
                    <span className="text-xs text-gray-400">{it.shortcut}</span>
                  )}
                </button>
              ),
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
