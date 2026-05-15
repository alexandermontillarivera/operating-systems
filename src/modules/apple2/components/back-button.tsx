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
      className="absolute top-4 right-4 z-50 bg-green-900/30 hover:bg-green-800/30 text-[#33ff33] px-4 py-2 border border-green-700/50 text-sm font-mono"
    >
      [ESC] VOLVER
    </motion.button>
  )
}
