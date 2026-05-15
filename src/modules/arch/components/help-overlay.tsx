"use client"

import { motion, AnimatePresence } from "framer-motion"
import { I3_KEYBINDS } from "@/modules/arch/lib/ascii-art"

interface HelpOverlayProps {
  open: boolean
}

export function HelpOverlay({ open }: HelpOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-9 left-2 bg-[#1a1a2e] border border-[#1793D1]/50 rounded p-3 text-xs z-50 font-mono text-gray-200"
        >
          {I3_KEYBINDS.map((k, i) => (
            <div key={i}>{k}</div>
          ))}
          <div className="text-[10px] text-gray-500 mt-2">
            (usa Alt como Mod en este simulador)
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
