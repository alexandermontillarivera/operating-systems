"use client"

import type { SplitMode } from "@/modules/arch/types"

interface StatusBarProps {
  workspace: number
  usedWorkspaces: Set<number>
  splitMode: SplitMode
  showHelp: boolean
  time: Date
  onSwitchWorkspace: (n: number) => void
  onToggleHelp: () => void
  onBack: () => void
}

export function StatusBar({
  workspace,
  usedWorkspaces,
  splitMode,
  showHelp,
  time,
  onSwitchWorkspace,
  onToggleHelp,
  onBack,
}: StatusBarProps) {
  return (
    <div className="h-7 bg-[#1a1a2e] border-t border-[#1793D1]/50 flex items-center text-xs text-gray-300 font-mono">
      <div className="flex">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
          const has = usedWorkspaces.has(n)
          const active = workspace === n
          return (
            <button
              key={n}
              onClick={() => onSwitchWorkspace(n)}
              className={`px-3 h-7 ${active ? "bg-[#1793D1] text-white" : has ? "text-gray-200 hover:bg-white/10" : "text-gray-600 hover:bg-white/5"}`}
            >
              {n}
            </button>
          )
        })}
      </div>
      <div className="ml-4 text-gray-400">
        mode: <span className="text-[#1793D1]">{splitMode === "h" ? "horizontal-split" : "vertical-split"}</span>
      </div>
      <button
        onClick={onToggleHelp}
        className="ml-4 px-2 py-0.5 hover:bg-white/10 rounded text-gray-400"
      >
        {showHelp ? "[hide bindings]" : "[show bindings]"}
      </button>
      <div className="ml-auto flex items-center gap-3 px-3">
        <span>📦 847 pkgs</span>
        <span>🌡 32°C</span>
        <span>RAM 2.1G/16G</span>
        <span>CPU 8%</span>
        <span>BAT 87%</span>
        <span>📶 wlp2s0</span>
        <span className="text-[#1793D1]">{time.toLocaleString("en-GB", { hour12: false })}</span>
        <button onClick={onBack} className="ml-2 text-red-400 hover:text-red-300">
          [volver]
        </button>
      </div>
    </div>
  )
}
