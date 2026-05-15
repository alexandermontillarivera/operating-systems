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
 * XP Luna window: blue gradient title bar with glossy buttons + 3px blue border.
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
    ? { left: 0, top: 0, width: "100%", height: "calc(100% - 30px)", zIndex: state.zIndex }
    : {
        left: drag.position.x,
        top: drag.position.y,
        width: state.width,
        height: state.height,
        zIndex: state.zIndex,
      }

  const titleBarBg = isActive
    ? "linear-gradient(to bottom, #0058ee 0%, #3b8df3 8%, #1b6cdf 40%, #1957cd 80%, #2367e2 100%)"
    : "linear-gradient(to bottom, #7892c0 0%, #a3b5d6 8%, #859cc2 40%, #7c92ba 80%, #8aa2c8 100%)"

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.96, opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{
        ...style,
        fontFamily: '"Tahoma", "Trebuchet MS", sans-serif',
        border: "3px solid #0a3a8d",
        borderTop: "none",
        borderRadius: "8px 8px 0 0",
        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
      }}
      className="absolute flex flex-col overflow-hidden"
      onMouseDown={onFocus}
    >
      {/* TITLE BAR */}
      <div
        onPointerDown={state.maximized ? undefined : drag.onPointerDown}
        onDoubleClick={onMaximize}
        className="h-[26px] pl-1.5 pr-1 flex items-center justify-between cursor-move"
        style={{
          background: titleBarBg,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          {icon && <span className="shrink-0 inline-flex">{icon}</span>}
          <span
            className="text-white text-[12px] font-bold truncate"
            style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.55)" }}
          >
            {state.title}
          </span>
        </div>
        <div className="flex items-center gap-[2px] pr-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            title="Minimize"
            className="w-[22px] h-[22px] flex items-end justify-center text-white"
            style={{
              background: "linear-gradient(to bottom, #4d8be8 0%, #2870d6 50%, #1957c5 100%)",
              border: "1px solid #08266f",
              borderRadius: 3,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="2" y="7" width="6" height="2" fill="white" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMaximize()
            }}
            title="Maximize"
            className="w-[22px] h-[22px] flex items-center justify-center text-white"
            style={{
              background: "linear-gradient(to bottom, #4d8be8 0%, #2870d6 50%, #1957c5 100%)",
              border: "1px solid #08266f",
              borderRadius: 3,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="1" y="1" width="8" height="8" fill="none" stroke="white" strokeWidth="1.5" />
              <rect x="1" y="1" width="8" height="2" fill="white" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            title="Close"
            className="w-[22px] h-[22px] flex items-center justify-center text-white"
            style={{
              background: "linear-gradient(to bottom, #e87362 0%, #cc3a26 50%, #a91d0b 100%)",
              border: "1px solid #5a0e02",
              borderRadius: 3,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <line x1="2" y1="2" x2="8" y2="8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="8" y1="2" x2="2" y2="8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      {/* CONTENT */}
      <div
        className="flex-1 bg-white overflow-hidden"
        style={{ borderLeft: "0", borderRight: "0" }}
      >
        {children}
      </div>
    </motion.div>
  )
}
