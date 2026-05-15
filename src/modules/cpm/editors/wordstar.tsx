"use client"

import type { WSState } from "@/modules/cpm/types"

interface WordStarProps {
  state: WSState
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  onChange: (text: string) => void
  onSave: () => void
  onExit: () => void
  onToggleHelp: () => void
}

/**
 * WordStar 3.0 full-screen overlay.
 * Real WordStar used Ctrl-K, Ctrl-Q, etc. — we map a small subset:
 *   Ctrl+K → save
 *   Ctrl+X → save & exit
 *   Ctrl+Q → exit (no save)
 *   Ctrl+J → toggle help
 */
export function WordStar({ state, textareaRef, onChange, onSave, onExit, onToggleHelp }: WordStarProps) {
  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.ctrlKey) return
    const k = e.key.toUpperCase()
    if (k === "K") {
      e.preventDefault()
      onSave()
      return
    }
    if (k === "X") {
      e.preventDefault()
      onSave()
      onExit()
    }
    if (k === "Q") {
      e.preventDefault()
      onExit()
    }
    if (k === "J") {
      e.preventDefault()
      onToggleHelp()
    }
  }

  return (
    <div className="absolute inset-0 z-50 bg-[#000080] text-white font-mono flex flex-col">
      <div className="bg-white text-black px-3 py-1 text-xs flex justify-between border-b border-black">
        <span>
          {state.drive}:{state.filename}    PAGE 1   LINE 1   COL 1
        </span>
        <span>WORDSTAR 3.0</span>
      </div>
      {state.showHelp && (
        <div className="bg-[#0000a0] border-b border-white/40 px-3 py-1 text-xs leading-relaxed">
          <div>^J HELP   ^K BLOCK   ^Q QUICK   ^O ONSCREEN   ^P PRINT</div>
          <div>^KS SAVE   ^KX SAVE&amp;EXIT   ^KQ ABANDON   ^KD SAVE&amp;DONE</div>
          <div className="mt-1 text-yellow-300">
            (en este simulador: Ctrl+K guarda, Ctrl+X guarda y sale, Ctrl+Q sale, Ctrl+J alterna ayuda)
          </div>
        </div>
      )}
      <textarea
        ref={textareaRef}
        value={state.text}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        onKeyDown={onKey}
        autoFocus
        className="flex-1 bg-[#000080] text-white font-mono p-3 resize-none outline-none text-base uppercase"
        spellCheck={false}
      />
      <div className="bg-white text-black px-3 py-1 text-xs flex justify-between border-t border-black">
        <span>{state.text.length} CHARS</span>
        <span>F1=^J HELP   F10=^X SAVE&amp;EXIT</span>
      </div>
    </div>
  )
}
