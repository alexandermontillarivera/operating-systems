"use client"

import { motion, AnimatePresence } from "framer-motion"

interface SnapPreviewProps {
  mode: "left" | "right" | "max" | null
}

/** Translucent preview overlay shown while dragging a window to a snap zone. */
export function SnapPreview({ mode }: SnapPreviewProps) {
  return (
    <AnimatePresence>
      {mode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute z-[5] pointer-events-none border-2 border-white/70 bg-white/20 rounded-md backdrop-blur-sm"
          style={
            mode === "left"
              ? { left: 0, top: 0, width: "50%", height: "calc(100% - 48px)" }
              : mode === "right"
                ? { left: "50%", top: 0, width: "50%", height: "calc(100% - 48px)" }
                : { left: 0, top: 0, width: "100%", height: "calc(100% - 48px)" }
          }
        />
      )}
    </AnimatePresence>
  )
}
