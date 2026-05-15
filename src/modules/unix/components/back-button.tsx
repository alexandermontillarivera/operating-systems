"use client"

import { motion } from "framer-motion"

interface BackButtonProps {
  onClick: () => void
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClick}
      className="absolute top-4 right-4 z-50 bg-amber-900/50 hover:bg-amber-800/50 text-amber-300 px-4 py-2 rounded border border-amber-700/50 text-sm font-mono"
    >
      [ESC] Volver
    </motion.button>
  )
}
