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
      className="absolute top-4 right-4 z-50 bg-blue-900/50 hover:bg-blue-800/50 text-white px-4 py-2 border border-white/30 text-sm font-mono"
    >
      [ESC] VOLVER
    </motion.button>
  )
}
