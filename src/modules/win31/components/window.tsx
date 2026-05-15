"use client"

import { motion } from "framer-motion"
import { useDraggable } from "@/modules/win31/hooks/use-draggable"
import type { Win31WindowState } from "@/modules/win31/types"

interface WindowProps {
  state: Win31WindowState
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  children: React.ReactNode
}

/**
 * Win 3.1 window — gray bg with raised 3D bevels (white/dark borders),
 * solid blue title bar when active, gray when inactive.
 */
export function Win31Window({
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
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        left: drag.position.x,
        top: drag.position.y,
        width: state.width,
        height: state.height,
        zIndex: state.zIndex,
        boxShadow: "inset -2px -2px 0 0 #404040, inset 2px 2px 0 0 #ffffff",
        fontFamily: "Tahoma, 'MS Sans Serif', sans-serif",
      }}
      className="absolute bg-[#c0c0c0] text-black"
      onMouseDown={onFocus}
    >
      <TitleBar
        title={state.title}
        active={isActive}
        onClose={onClose}
        onMinimize={onMinimize}
        onPointerDown={drag.onPointerDown}
      />
      <div className="h-[calc(100%-28px)] overflow-auto bg-[#c0c0c0]">{children}</div>
    </motion.div>
  )
}

interface TitleBarProps {
  title: string
  active: boolean
  onClose: () => void
  onMinimize: () => void
  onPointerDown: (e: React.PointerEvent) => void
}

function TitleBar({ title, active, onClose, onMinimize, onPointerDown }: TitleBarProps) {
  return (
    <div
      onPointerDown={onPointerDown}
      className={`${active ? "bg-[#000080]" : "bg-[#808080]"} text-white px-2 py-1 flex items-center justify-between cursor-move select-none`}
    >
      <span className="font-bold text-sm truncate flex items-center gap-1">
        <span className="inline-block w-3 h-3 border border-white/60" />
        {title}
      </span>
      <div className="flex gap-px">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onMinimize()
          }}
          className="w-5 h-4 bg-[#c0c0c0] text-black text-xs flex items-center justify-center"
          style={{ boxShadow: "inset -1px -1px 0 0 #404040, inset 1px 1px 0 0 #fff" }}
          aria-label="minimize"
        >
          _
        </button>
        <button
          className="w-5 h-4 bg-[#c0c0c0] text-black text-xs flex items-center justify-center"
          style={{ boxShadow: "inset -1px -1px 0 0 #404040, inset 1px 1px 0 0 #fff" }}
          aria-label="maximize"
        >
          □
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="w-5 h-4 bg-[#c0c0c0] text-black text-xs flex items-center justify-center"
          style={{ boxShadow: "inset -1px -1px 0 0 #404040, inset 1px 1px 0 0 #fff" }}
          aria-label="close"
        >
          ×
        </button>
      </div>
    </div>
  )
}
