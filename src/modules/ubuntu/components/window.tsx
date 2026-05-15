"use client"

import { motion } from "framer-motion"
import { useDraggable } from "@/modules/ubuntu/hooks/use-draggable"
import type { UbuntuWindowState } from "@/modules/ubuntu/types"

interface WindowProps {
  state: UbuntuWindowState
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  children: React.ReactNode
}

/** GNOME window — dark header bar with right-aligned controls. */
export function UbuntuWindow({
  state,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}: WindowProps) {
  const drag = useDraggable({ x: state.x, y: state.y })

  const style: React.CSSProperties = state.maximized
    ? {
        left: -64,
        top: -28,
        width: "calc(100% + 64px)",
        height: "calc(100% + 28px)",
        zIndex: state.zIndex,
      }
    : {
        left: drag.position.x,
        top: drag.position.y,
        width: state.width,
        height: state.height,
        zIndex: state.zIndex,
      }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      style={style}
      className="absolute flex flex-col rounded-lg overflow-hidden shadow-2xl"
      onMouseDown={onFocus}
    >
      <div
        onPointerDown={state.maximized ? undefined : drag.onPointerDown}
        onDoubleClick={onMaximize}
        className={`h-9 flex items-center justify-between px-3 cursor-move ${
          isActive ? "bg-[#2d2d2d]" : "bg-[#202020]"
        } border-b border-black/30`}
      >
        <span className="text-white text-sm font-semibold">{state.title}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="w-7 h-6 rounded hover:bg-white/10 text-white text-sm"
          >
            −
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMaximize()
            }}
            className="w-7 h-6 rounded hover:bg-white/10 text-white text-xs"
          >
            □
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="w-7 h-6 rounded bg-[#E95420] hover:bg-[#cc4719] text-white text-xs"
          >
            ×
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-white">{children}</div>
    </motion.div>
  )
}
