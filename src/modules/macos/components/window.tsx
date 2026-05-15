"use client"

import { motion } from "framer-motion"
import { useDraggable } from "@/modules/macos/hooks/use-draggable"
import type { MacOSWindowState } from "@/modules/macos/types"

interface WindowProps {
  state: MacOSWindowState
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  children: React.ReactNode
}

/** macOS window — rounded with traffic lights, blurred title bar. */
export function MacOSWindow({
  state,
  isActive,
  onClose,
  onMinimize,
  onFocus,
  children,
}: WindowProps) {
  const drag = useDraggable({ x: state.x, y: state.y })

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      style={{
        left: drag.position.x,
        top: drag.position.y,
        width: state.width,
        height: state.height,
        zIndex: state.zIndex,
      }}
      className={`absolute flex flex-col rounded-xl overflow-hidden shadow-2xl ${
        isActive ? "" : "opacity-95"
      }`}
      onMouseDown={onFocus}
    >
      <div
        onPointerDown={drag.onPointerDown}
        className="h-8 bg-gray-100/95 backdrop-blur-xl flex items-center px-3 cursor-move border-b border-gray-200"
      >
        <div className="flex gap-2 group">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 flex items-center justify-center"
            aria-label="close"
          >
            <span className="text-[8px] opacity-0 group-hover:opacity-100 text-red-900">✕</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 flex items-center justify-center"
            aria-label="minimize"
          >
            <span className="text-[8px] opacity-0 group-hover:opacity-100 text-yellow-900">−</span>
          </button>
          <button
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 flex items-center justify-center"
            aria-label="zoom"
          >
            <span className="text-[8px] opacity-0 group-hover:opacity-100 text-green-900">+</span>
          </button>
        </div>
        <div className="flex-1 text-center">
          <span className="text-sm font-medium text-gray-700">{state.title}</span>
        </div>
        <div className="w-14" />
      </div>
      <div className="flex-1 overflow-hidden bg-gray-50">{children}</div>
    </motion.div>
  )
}
