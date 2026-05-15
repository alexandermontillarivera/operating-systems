"use client"

import type { Drive } from "@/modules/cpm/types"

interface StatusBarProps {
  drive: Drive
  userNum: number
  modeLabel: string
}

export function StatusBar({ drive, userNum, modeLabel }: StatusBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-40 bg-blue-950/60 border-b border-white/20 px-4 py-1 text-xs text-white/85 flex justify-between font-mono">
      <span>
        DRIVE {drive}: USER {userNum}
      </span>
      <span>{modeLabel}</span>
    </div>
  )
}
