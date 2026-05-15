"use client"

import { useEffect, useState } from "react"
import { usePanes } from "@/modules/arch/hooks/use-panes"
import { HelpOverlay } from "@/modules/arch/components/help-overlay"
import { PaneFrame } from "@/modules/arch/components/pane-frame"
import { StatusBar } from "@/modules/arch/components/status-bar"

interface ArchSimulatorProps {
  onBack: () => void
}

export function ArchSimulator({ onBack }: ArchSimulatorProps) {
  const panes = usePanes()
  const [showHelp, setShowHelp] = useState(false)
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const cols = Math.min(panes.visible.length, 4)

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col select-none overflow-hidden text-gray-200 font-mono">
      <div
        className="flex-1 grid gap-1 p-1"
        style={
          panes.visible.length === 0
            ? undefined
            : panes.splitMode === "h"
              ? { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }
              : { gridTemplateRows: `repeat(${cols}, minmax(0, 1fr))` }
        }
      >
        {panes.visible.length === 0 && (
          <div className="flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-6xl mb-2 opacity-20">⛺</div>
              <div className="text-sm">Workspace {panes.workspace} vacío</div>
              <div className="text-xs mt-1 opacity-70">Alt+Enter para abrir terminal</div>
            </div>
          </div>
        )}
        {panes.visible.map((p) => (
          <PaneFrame
            key={p.id}
            pane={p}
            focused={panes.focusId === p.id}
            onFocus={() => panes.setFocusId(p.id)}
            onClose={() => panes.closePane(p.id)}
            onOpenPane={panes.openPane}
          />
        ))}
      </div>

      <StatusBar
        workspace={panes.workspace}
        usedWorkspaces={panes.usedWorkspaces}
        splitMode={panes.splitMode}
        showHelp={showHelp}
        time={time}
        onSwitchWorkspace={panes.setWorkspace}
        onToggleHelp={() => setShowHelp((s) => !s)}
        onBack={onBack}
      />

      <HelpOverlay open={showHelp} />
    </div>
  )
}
