"use client"

import { motion, AnimatePresence } from "framer-motion"

export interface MenuItem {
  label?: string
  divider?: boolean
  onClick?: () => void
}

interface DropdownMenuProps {
  open: boolean
  items: MenuItem[]
  /** Pixel offset from the left of the menu bar where the dropdown anchors. */
  left: number
  width?: number
  onClose: () => void
}

/** Mac menu pop-up with white bg, black border, hover-invert items. */
export function DropdownMenu({ open, items, left, width = 200, onClose }: DropdownMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[9999]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.08 }}
            className="absolute top-5 bg-white border-2 border-black z-[10001] text-[12px]"
            style={{ left, width, fontFamily: "'ChicagoFLF', 'Geneva', sans-serif" }}
          >
            {items.map((it, i) =>
              it.divider ? (
                <div key={i} className="border-t border-gray-400 my-1" />
              ) : (
                <button
                  key={i}
                  onClick={() => {
                    it.onClick?.()
                    onClose()
                  }}
                  className="w-full px-3 py-0.5 text-left hover:bg-black hover:text-white"
                >
                  {it.label}
                </button>
              ),
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
