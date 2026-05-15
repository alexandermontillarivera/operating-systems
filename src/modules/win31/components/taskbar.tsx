"use client"

import type { Win31WindowState } from "@/modules/win31/types"

interface TaskbarProps {
  windows: Win31WindowState[]
  programManagerVisible: boolean
  onShowProgramManager: () => void
  onRestoreWindow: (id: string) => void
}

/**
 * Win 3.1 didn't really have a taskbar — minimized apps became icons on the desktop.
 * We approximate with a thin bottom strip that shows minimized apps + Program Manager.
 */
export function Taskbar({
  windows,
  programManagerVisible,
  onShowProgramManager,
  onRestoreWindow,
}: TaskbarProps) {
  const minimized = windows.filter((w) => w.minimized)
  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 gap-1 text-black">
      {!programManagerVisible && (
        <button
          onClick={onShowProgramManager}
          className="px-2 py-0.5 bg-[#c0c0c0] text-xs"
          style={{ boxShadow: "inset -1px -1px 0 0 #404040, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf" }}
        >
          Program Manager
        </button>
      )}
      {minimized.map((w) => (
        <button
          key={w.id}
          onClick={() => onRestoreWindow(w.id)}
          className="px-2 py-0.5 bg-[#c0c0c0] text-xs"
          style={{ boxShadow: "inset -1px -1px 0 0 #404040, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf" }}
        >
          {w.title}
        </button>
      ))}
    </div>
  )
}
