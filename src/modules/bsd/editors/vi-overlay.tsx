"use client"

import type { ViState } from "@/modules/bsd/types"

interface ViOverlayProps {
  state: ViState
}

const ROWS = 22

/** Full-screen vi visual: viewport + cursor highlight + status line + ex-line. */
export function ViOverlay({ state }: ViOverlayProps) {
  const top = Math.max(0, Math.min(state.row - Math.floor(ROWS / 2), state.buffer.length - ROWS))
  const visible = state.buffer.slice(top, top + ROWS)
  while (visible.length < ROWS) visible.push("~")

  return (
    <div className="h-screen w-full bg-black text-amber-400 font-mono text-sm flex flex-col">
      <div className="flex-1 p-2 overflow-hidden">
        {visible.map((line, i) => {
          const realIdx = top + i
          const isCursor = realIdx === state.row
          const isTilde = line === "~" && realIdx >= state.buffer.length
          if (isTilde) {
            return (
              <div key={i} className="text-amber-700">
                ~
              </div>
            )
          }
          if (isCursor) {
            const before = line.slice(0, state.col)
            const at = line[state.col] || " "
            const after = line.slice(state.col + 1)
            return (
              <div key={i} className="whitespace-pre">
                {before}
                <span className="bg-amber-400 text-black">{at}</span>
                {after}
              </div>
            )
          }
          return (
            <div key={i} className="whitespace-pre">
              {line}
            </div>
          )
        })}
      </div>
      <div className="px-2 py-1 bg-amber-950/40 text-xs flex justify-between border-t border-amber-700/40">
        <span>{state.message || `"${state.file}" ${state.buffer.length}L`}</span>
        <span>
          {state.row + 1},{state.col + 1}  [{state.mode.toUpperCase()}]
          {state.dirty ? " [+]" : ""}
        </span>
      </div>
      {state.mode === "command" && (
        <div className="px-2 py-1 bg-black border-t border-amber-700/40">
          :{state.cmdInput}
          <span className="animate-pulse">_</span>
        </div>
      )}
      <div className="px-2 py-1 bg-black/80 text-amber-700 text-xs border-t border-amber-700/40">
        i=insert  ESC=normal  hjkl=move  o=open line  x=del char  dd~d=del line  :w :q :wq :q!
      </div>
    </div>
  )
}
