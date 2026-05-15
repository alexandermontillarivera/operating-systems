"use client"

import { motion } from "framer-motion"
import { HappyMacIcon } from "@/modules/mac-classic/components/icons"

/** Boot-time happy-Mac splash. */
export function StartupScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "white",
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
        backgroundSize: "4px 4px",
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 16 }}
        className="text-center"
      >
        <HappyMacIcon size={120} />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-sm text-black"
          style={{ fontFamily: "'ChicagoFLF', 'Geneva', sans-serif" }}
        >
          Welcome to Macintosh
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
