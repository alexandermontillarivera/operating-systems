"use client"

import { useState } from "react"

interface DesktopIconProps {
  label: string
  icon: React.ReactNode
  onOpen: () => void
}

/** Mac Classic desktop icon: pixel-art glyph + label that inverts when selected. */
export function DesktopIcon({ label, icon, onOpen }: DesktopIconProps) {
  const [selected, setSelected] = useState(false)

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        setSelected(true)
      }}
      onDoubleClick={onOpen}
      onBlur={() => setSelected(false)}
      className="flex flex-col items-center w-20 gap-0.5 p-1 outline-none group"
      style={{ fontFamily: "'ChicagoFLF', 'Geneva', 'Lucida Grande', sans-serif" }}
    >
      <div
        className="relative"
        style={selected ? { filter: "invert(1)" } : undefined}
      >
        {icon}
      </div>
      <span
        className={`text-[11px] text-center px-1 leading-tight ${
          selected ? "bg-black text-white" : "text-black"
        }`}
      >
        {label}
      </span>
    </button>
  )
}
