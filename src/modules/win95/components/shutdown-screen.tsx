"use client"

import { motion } from "framer-motion"

interface ShutdownScreenProps {
  onBack: () => void
}

export function ShutdownScreen({ onBack }: ShutdownScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 18 }}
        className="text-center"
        style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
      >
        <div className="text-[#FF8000] text-3xl md:text-4xl font-bold mb-6 leading-snug">
          Es seguro apagar el equipo.
        </div>
        <button
          onClick={onBack}
          className="bg-[#c0c0c0] text-black px-6 py-1 text-[11px]"
          style={{
            boxShadow:
              "inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #dfdfdf, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #ffffff",
          }}
        >
          Volver al Timeline
        </button>
      </motion.div>
    </motion.div>
  )
}
