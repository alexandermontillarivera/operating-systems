"use client"

import type { Mode } from "@/modules/apple2/types"

interface StatusBarProps {
  dosMode: boolean
  mode: Mode
  programLines: number
  color: number
  hcolor: number
}

export function StatusBar({ dosMode, mode, programLines, color, hcolor }: StatusBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-40 bg-green-950/40 border-b border-green-800/40 px-4 py-1 text-xs text-[#33ff33]/85 flex justify-between font-mono uppercase">
      <span>
        {dosMode ? "DOS 3.3" : "APPLESOFT"} | MODE: {mode}
      </span>
      <span>
        PROG: {programLines} LINES | COLOR: {color} HCOLOR: {hcolor}
      </span>
    </div>
  )
}
