"use client"

import { motion, AnimatePresence } from "framer-motion"

interface CalendarDropdownProps {
  open: boolean
  time: Date
  onClose: () => void
}

export function CalendarDropdown({ open, time, onClose }: CalendarDropdownProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[1999]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-7 left-1/2 -translate-x-1/2 bg-[#2d2d2d] rounded-lg shadow-2xl p-4 z-[2001] text-white border border-gray-700"
            style={{ minWidth: 320 }}
          >
            <div className="text-center text-sm mb-2 capitalize">
              {time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </div>
            <div className="text-center text-3xl font-light mb-3">
              {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
            </div>
            <div className="border-t border-gray-700 pt-2 text-xs text-gray-400 text-center">
              No events scheduled
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
