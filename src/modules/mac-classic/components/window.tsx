"use client"

import { motion } from "framer-motion"
import { useDraggable } from "@/modules/mac-classic/hooks/use-draggable"
import type { MacWindowState } from "@/modules/mac-classic/types"

interface WindowProps {
  state: MacWindowState
  isActive: boolean
  onClose: () => void
  onFocus: () => void
  children: React.ReactNode
}

/**
 * Mac System 6/7 window:
 *   - 1px black border
 *   - Title bar with horizontal hatch lines (active) or blank (inactive)
 *   - Centered title with white "cutout" background
 *   - Close box on left, zoom box on right (zoom is decorative)
 */
export function Window({ state, isActive, onClose, onFocus, children }: WindowProps) {
  const drag = useDraggable({ x: state.x, y: state.y })

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      style={{
        left: drag.position.x,
        top: drag.position.y,
        width: state.width,
        height: state.height,
        zIndex: state.zIndex,
        boxShadow: "1px 1px 0 0 #000, 2px 2px 0 0 #000, 3px 3px 0 0 rgba(0,0,0,0.4)",
        fontFamily: "'ChicagoFLF', 'Geneva', 'Lucida Grande', sans-serif",
      }}
      className="absolute flex flex-col bg-white border border-black"
      onMouseDown={onFocus}
    >
      <TitleBar
        title={state.title}
        active={isActive}
        onClose={onClose}
        onPointerDown={drag.onPointerDown}
      />
      <div className="flex-1 overflow-hidden bg-white">{children}</div>
    </motion.div>
  )
}

interface TitleBarProps {
  title: string
  active: boolean
  onClose: () => void
  onPointerDown: (e: React.PointerEvent) => void
}

function TitleBar({ title, active, onClose, onPointerDown }: TitleBarProps) {
  return (
    <div
      onPointerDown={onPointerDown}
      className="h-[18px] flex items-center px-1.5 cursor-move border-b border-black bg-white relative select-none"
      style={{
        backgroundImage: active
          ? "repeating-linear-gradient(0deg, transparent 0 1px, black 1px 2px)"
          : "none",
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="w-2.5 h-2.5 bg-white border border-black hover:bg-gray-200 active:bg-black"
        aria-label="close"
      />
      {/* Title with white cutout to interrupt the hatching */}
      <div className="flex-1 flex justify-center">
        <span className="bg-white px-2 text-[12px] text-black">{title}</span>
      </div>
      <div className="w-2.5 h-2.5 bg-white border border-black" />
    </div>
  )
}
