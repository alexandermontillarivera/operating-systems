"use client"

import { useState } from "react"

interface DesktopIconProps {
  label: string
  icon: React.ReactNode
  onOpen: () => void
}

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
      className="flex flex-col items-center w-[72px] gap-0.5 p-1 outline-none"
    >
      <div
        className="relative"
        style={selected ? { filter: "brightness(0.7) sepia(1) hue-rotate(180deg) saturate(2)" } : undefined}
      >
        {icon}
      </div>
      <span
        className={`text-[11px] text-white text-center px-1 leading-tight ${
          selected ? "bg-[#000080]" : ""
        }`}
        style={{
          textShadow: selected ? undefined : "1px 1px 0 #000, 0 1px 0 #000, 1px 0 0 #000",
          fontFamily: "Tahoma, 'MS Sans Serif', sans-serif",
        }}
      >
        {label}
      </span>
    </button>
  )
}
