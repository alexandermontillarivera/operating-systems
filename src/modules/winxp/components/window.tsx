"use client"

import { motion } from "framer-motion"
import { useDraggable } from "@/modules/winxp/hooks/use-draggable"
import type { WinXPWindowState } from "@/modules/winxp/types"

interface WindowProps {
  state: WinXPWindowState
  isActive: boolean
  icon?: React.ReactNode
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  children: React.ReactNode
}

/**
 * XP Luna window: rounded top, blue gradient title bar, glossy buttons.
 * Maximize doubles as restore.
 */
export function WinXPWindow({
  state,
  isActive,
  icon,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}: WindowProps) {
  const drag = useDraggable({ x: state.x, y: state.y })

  const style: React.CSSProperties = state.maximized
    ? { left: 0, top: 0, width: "100%", height: "calc(100% - 36px)", zIndex: state.zIndex }
    : {
        left: drag.position.x,
        top: drag.position.y,
        width: state.width,
        height: state.height,
        zIndex: state.zIndex,
      }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      style={style}
      className="absolute flex flex-col shadow-2xl rounded-t-lg overflow-hidden"
      onMouseDown={onFocus}
    >
      <div
        onPointerDown={state.maximized ? undefined : drag.onPointerDown}
        onDoubleClick={onMaximize}
        className={`h-7 px-1.5 flex items-center justify-between cursor-move rounded-t-lg ${
          isActive
            ? "bg-gradient-to-b from-[#0058e6] via-[#3a8bff] to-[#0058e6]"
            : "bg-gradient-to-b from-[#7d97c2] via-[#a4b6d4] to-[#7d97c2]"
        }`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span
            className="text-white text-xs font-bold truncate"
            style={{ textShadow: "0 1px 1px rgba(0,0,0,0.4)" }}
          >
            {state.title}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="w-5 h-5 bg-gradient-to-b from-blue-300 to-blue-600 rounded-sm flex items-center justify-center text-white text-xs"
          >
            _
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMaximize()
            }}
            className="w-5 h-5 bg-gradient-to-b from-blue-300 to-blue-600 rounded-sm flex items-center justify-center text-white text-xs"
          >
            □
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="w-5 h-5 bg-gradient-to-b from-red-400 to-red-700 rounded-sm flex items-center justify-center text-white text-xs"
          >
            ×
          </button>
        </div>
      </div>
      <div className="flex-1 bg-white overflow-hidden">{children}</div>
    </motion.div>
  )
}
