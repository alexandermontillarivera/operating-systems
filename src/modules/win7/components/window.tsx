"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import type { SnapMode, Win7WindowState } from "@/modules/win7/types"

interface WindowProps {
  state: Win7WindowState
  isActive: boolean
  peekHidden: boolean
  showDesktopHover: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onSnap: (mode: SnapMode) => void
  onPreview: (mode: "left" | "right" | "max" | null) => void
  children: React.ReactNode
}

/**
 * Aero Glass window with snap detection on drag.
 * Drag to left/right edge → snap to half. Drag to top → maximize.
 */
export function Win7Window({
  state,
  isActive,
  peekHidden,
  showDesktopHover,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onSnap,
  onPreview,
  children,
}: WindowProps) {
  const [pos, setPos] = useState({ x: state.x, y: state.y })
  const [drag, setDrag] = useState(false)
  const off = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!drag) return
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX - off.current.x, y: e.clientY - off.current.y })
      if (e.clientX <= 5) onPreview("left")
      else if (e.clientX >= window.innerWidth - 5) onPreview("right")
      else if (e.clientY <= 5) onPreview("max")
      else onPreview(null)
    }
    const up = (e: MouseEvent) => {
      setDrag(false)
      if (e.clientX <= 5) onSnap("left")
      else if (e.clientX >= window.innerWidth - 5) onSnap("right")
      else if (e.clientY <= 5) onSnap("max")
      else if (state.snap !== "none") onSnap("none")
      onPreview(null)
    }
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
    }
  }, [drag, onPreview, onSnap, state.snap])

  let style: React.CSSProperties = {
    width: state.width,
    height: state.height,
    left: pos.x,
    top: pos.y,
    zIndex: state.zIndex,
  }
  if (state.maximized || state.snap === "max") {
    style = { left: 0, top: 0, width: "100%", height: "calc(100% - 48px)", zIndex: state.zIndex }
  } else if (state.snap === "left") {
    style = { left: 0, top: 0, width: "50%", height: "calc(100% - 48px)", zIndex: state.zIndex }
  } else if (state.snap === "right") {
    style = { left: "50%", top: 0, width: "50%", height: "calc(100% - 48px)", zIndex: state.zIndex }
  }

  const opacity = showDesktopHover ? 0.05 : peekHidden ? 0.15 : 1

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity }}
      exit={{ scale: 0.9, opacity: 0 }}
      style={style}
      className="absolute rounded-lg overflow-hidden"
      onMouseDown={onFocus}
    >
      <div
        className={`h-8 flex items-center justify-between px-2 cursor-move ${
          isActive
            ? "bg-gradient-to-b from-[#3b7dd8]/90 to-[#1e457e]/90"
            : "bg-gradient-to-b from-gray-500/70 to-gray-700/70"
        }`}
        style={{ backdropFilter: "blur(12px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)" }}
        onMouseDown={(e) => {
          if (state.maximized || state.snap !== "none") return
          onFocus()
          setDrag(true)
          off.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
        }}
        onDoubleClick={onMaximize}
      >
        <span className="text-white text-sm truncate drop-shadow">{state.title}</span>
        <div className="flex gap-1">
          <button
            onClick={onMinimize}
            className="w-9 h-6 flex items-center justify-center hover:bg-white/20 text-white text-sm"
          >
            ─
          </button>
          <button
            onClick={onMaximize}
            className="w-9 h-6 flex items-center justify-center hover:bg-white/20 text-white text-sm"
          >
            □
          </button>
          <button
            onClick={onClose}
            className="w-9 h-6 flex items-center justify-center hover:bg-red-500 text-white text-sm"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-32px)] overflow-auto bg-white/95 text-black">{children}</div>
    </motion.div>
  )
}
