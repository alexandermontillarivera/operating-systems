"use client"

import { motion } from "framer-motion"
import { useDraggable } from "@/modules/win95/hooks/use-draggable"
import type { Win95WindowState } from "@/modules/win95/types"
import { CloseGlyph, MaximizeGlyph, MinimizeGlyph } from "@/modules/win95/components/icons"

interface WindowProps {
  state: Win95WindowState
  isActive: boolean
  icon?: React.ReactNode
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  children: React.ReactNode
}

export function Window({ state, isActive, icon, onClose, onMinimize, onFocus, children }: WindowProps) {
  const { position, handlers } = useDraggable({ x: state.x, y: state.y })

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      style={{
        left: position.x,
        top: position.y,
        width: state.width,
        height: state.height,
        zIndex: state.zIndex,
        // Real Win95 raised bevel: outer white/dark, inner highlight/shadow
        boxShadow:
          "inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #dfdfdf, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #ffffff",
      }}
      className="absolute flex flex-col bg-[#c0c0c0]"
      onPointerDown={onFocus}
    >
      <TitleBar
        title={state.title}
        icon={icon}
        active={isActive}
        onClose={onClose}
        onMinimize={onMinimize}
        dragHandlers={handlers}
      />
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  )
}

interface TitleBarProps {
  title: string
  icon?: React.ReactNode
  active: boolean
  onClose: () => void
  onMinimize: () => void
  dragHandlers: { onPointerDown: (e: React.PointerEvent) => void }
}

function TitleBar({ title, icon, active, onClose, onMinimize, dragHandlers }: TitleBarProps) {
  return (
    <div
      onPointerDown={dragHandlers.onPointerDown}
      className="h-[18px] mx-[2px] mt-[2px] flex items-center justify-between cursor-move px-1 select-none"
      style={{
        background: active ? "#000080" : "#7f7f7f",
        color: "white",
      }}
    >
      <div className="flex items-center gap-1 overflow-hidden">
        {icon && <div className="w-4 h-4 shrink-0">{icon}</div>}
        <span className="text-[11px] font-bold truncate">{title}</span>
      </div>
      <div className="flex gap-px">
        <TitleBarButton onClick={(e) => { e.stopPropagation(); onMinimize() }} aria-label="Minimize">
          <MinimizeGlyph />
        </TitleBarButton>
        <TitleBarButton aria-label="Maximize">
          <MaximizeGlyph />
        </TitleBarButton>
        <TitleBarButton onClick={(e) => { e.stopPropagation(); onClose() }} aria-label="Close">
          <CloseGlyph />
        </TitleBarButton>
      </div>
    </div>
  )
}

interface TitleBarButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  "aria-label"?: string
}

function TitleBarButton({ children, onClick, ...rest }: TitleBarButtonProps) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className="w-4 h-3.5 bg-[#c0c0c0] flex items-center justify-center active:[box-shadow:inset_1px_1px_0_0_#000,inset_-1px_-1px_0_0_#fff]"
      style={{
        boxShadow: "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff",
      }}
    >
      {children}
    </button>
  )
}
