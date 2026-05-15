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
 * Authentic Win7 Aero Glass window — translucent blurred title bar,
 * inner light border, glossy caption buttons, subtle outer halo.
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
    style = { left: 0, top: 0, width: "100%", height: "calc(100% - 40px)", zIndex: state.zIndex }
  } else if (state.snap === "left") {
    style = { left: 0, top: 0, width: "50%", height: "calc(100% - 40px)", zIndex: state.zIndex }
  } else if (state.snap === "right") {
    style = { left: "50%", top: 0, width: "50%", height: "calc(100% - 40px)", zIndex: state.zIndex }
  }

  const opacity = showDesktopHover ? 0.05 : peekHidden ? 0.15 : 1

  const titleBg = isActive
    ? "linear-gradient(to bottom, rgba(180,220,255,0.65) 0%, rgba(110,170,230,0.65) 50%, rgba(70,140,210,0.7) 100%)"
    : "linear-gradient(to bottom, rgba(220,225,235,0.7) 0%, rgba(180,190,210,0.7) 50%, rgba(160,170,195,0.75) 100%)"

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity }}
      exit={{ scale: 0.96, opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{
        ...style,
        borderRadius: 8,
        boxShadow: isActive
          ? "0 0 0 1px rgba(255,255,255,0.5), 0 0 0 2px rgba(60,120,200,0.6), 0 12px 38px rgba(0,30,90,0.6), 0 4px 14px rgba(0,0,0,0.35)"
          : "0 0 0 1px rgba(255,255,255,0.4), 0 0 0 2px rgba(120,140,170,0.45), 0 6px 24px rgba(0,0,0,0.4)",
      }}
      className="absolute overflow-hidden"
      onMouseDown={onFocus}
    >
      {/* TITLE BAR (Aero Glass) */}
      <div
        className="h-[30px] flex items-center justify-between px-1.5 cursor-move relative"
        style={{
          background: titleBg,
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottom: "1px solid rgba(255,255,255,0.35)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.05)",
          fontFamily: '"Segoe UI", Tahoma, sans-serif',
        }}
        onMouseDown={(e) => {
          if (state.maximized || state.snap !== "none") return
          onFocus()
          setDrag(true)
          off.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
        }}
        onDoubleClick={onMaximize}
      >
        {/* glossy top highlight */}
        <div
          className="absolute left-0 right-0 top-0 h-3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(255,255,255,0))",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <span
          className="text-[12px] truncate px-2 relative"
          style={{
            color: isActive ? "#0a3a8d" : "#3a4358",
            textShadow:
              "0 0 4px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.7), 1px 1px 0 rgba(255,255,255,0.6)",
            fontWeight: 500,
          }}
        >
          {state.title}
        </span>
        <div className="flex items-center gap-0 relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            title="Minimizar"
            className="w-[44px] h-[22px] flex items-end justify-center pb-1 group relative"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(200,220,255,0.2) 50%, rgba(120,170,230,0.3) 100%)",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRight: "none",
              borderTopLeftRadius: 3,
              borderBottomLeftRadius: 3,
            }}
          >
            <svg width="11" height="3" viewBox="0 0 11 3">
              <rect width="11" height="3" fill="#0a3a8d" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMaximize()
            }}
            title="Maximizar"
            className="w-[44px] h-[22px] flex items-center justify-center group relative"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(200,220,255,0.2) 50%, rgba(120,170,230,0.3) 100%)",
              borderTop: "1px solid rgba(255,255,255,0.5)",
              borderBottom: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11">
              <rect x="0.5" y="0.5" width="10" height="10" fill="none" stroke="#0a3a8d" strokeWidth="1.2" />
              <rect x="0.5" y="0.5" width="10" height="2" fill="#0a3a8d" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            title="Cerrar"
            className="w-[48px] h-[22px] flex items-center justify-center text-white group relative"
            style={{
              background:
                "linear-gradient(to bottom, #f7847a 0%, #e54a3d 45%, #b81b0e 100%)",
              border: "1px solid #6c0c08",
              borderTopRightRadius: 6,
              borderBottomLeftRadius: 3,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.15)",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11">
              <line x1="1.5" y1="1.5" x2="9.5" y2="9.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="9.5" y1="1.5" x2="1.5" y2="9.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      {/* CONTENT - with thin glass border around it */}
      <div
        className="bg-white text-black overflow-auto"
        style={{
          height: "calc(100% - 30px)",
          border: "1px solid rgba(255,255,255,0.6)",
          borderTop: "none",
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
