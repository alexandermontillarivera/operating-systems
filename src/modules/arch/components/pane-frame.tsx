"use client"

import { ArchTerminal } from "@/modules/arch/apps/arch-terminal"
import { NeofetchPane } from "@/modules/arch/apps/neofetch-pane"
import { ConfigPane, HistoryPane, WikiPane } from "@/modules/arch/apps/static-panes"
import type { Pane, PaneType } from "@/modules/arch/types"

interface PaneFrameProps {
  pane: Pane
  focused: boolean
  onFocus: () => void
  onClose: () => void
  onOpenPane: (type: PaneType, title: string) => void
}

export function PaneFrame({ pane, focused, onFocus, onClose, onOpenPane }: PaneFrameProps) {
  return (
    <div
      onClick={onFocus}
      className={`flex flex-col rounded overflow-hidden border-2 ${focused ? "border-[#1793D1]" : "border-[#222]"} bg-[#0d1117]`}
    >
      <div
        className={`px-2 py-0.5 text-[10px] flex items-center justify-between font-mono ${focused ? "bg-[#1793D1] text-white" : "bg-[#1a1a2e] text-gray-400"}`}
      >
        <span>{pane.title}</span>
        <button onClick={onClose} className="hover:text-red-400">
          ×
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        {pane.type === "terminal" && <ArchTerminal onOpenPane={onOpenPane} />}
        {pane.type === "neofetch" && <NeofetchPane />}
        {pane.type === "config" && <ConfigPane />}
        {pane.type === "wiki" && <WikiPane />}
        {pane.type === "history" && <HistoryPane />}
      </div>
    </div>
  )
}
