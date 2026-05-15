"use client"

import { useEffect, useRef, useState } from "react"
import type { EditState } from "@/modules/dos/types"

interface DOSEditorProps {
  state: EditState
  onSave: (text: string) => void
  onExit: () => void
}

/**
 * MS-DOS Editor (EDIT.COM 5.0+) — full screen, blue background, gray menu bar.
 * Keys: Alt+F shows file menu, F2 saves, ESC exits.
 */
export function DOSEditor({ state, onSave, onExit }: DOSEditorProps) {
  const [text, setText] = useState(state.text)
  const [showMenu, setShowMenu] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  const lines = text.split("\n").length

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.altKey && e.key.toLowerCase() === "f") {
      e.preventDefault()
      setShowMenu((s) => !s)
      return
    }
    if (e.key === "F2") {
      e.preventDefault()
      onSave(text)
      return
    }
    if (e.key === "Escape") {
      e.preventDefault()
      onExit()
    }
  }

  return (
    <div className="min-h-screen bg-[#0000AA] text-white font-mono flex flex-col">
      {/* Menu bar */}
      <div className="bg-[#AAAAAA] text-black px-2 py-0.5 flex gap-4 text-sm select-none">
        <span className="hover:bg-black hover:text-white px-1 cursor-pointer">
          <u>A</u>rchivo
        </span>
        <span className="hover:bg-black hover:text-white px-1 cursor-pointer">
          <u>E</u>dicion
        </span>
        <span className="hover:bg-black hover:text-white px-1 cursor-pointer">
          <u>B</u>uscar
        </span>
        <span className="hover:bg-black hover:text-white px-1 cursor-pointer">
          <u>O</u>pciones
        </span>
        <span className="ml-auto">MS-DOS Editor</span>
      </div>

      {showMenu && (
        <div className="absolute top-6 left-2 bg-[#AAAAAA] text-black border border-black z-50 text-sm">
          <div
            className="px-3 py-1 hover:bg-black hover:text-white cursor-pointer"
            onClick={() => onSave(text)}
          >
            <u>G</u>uardar (F2)
          </div>
          <div
            className="px-3 py-1 hover:bg-black hover:text-white cursor-pointer"
            onClick={onExit}
          >
            <u>S</u>alir (ESC)
          </div>
        </div>
      )}

      {/* Title */}
      <div className="bg-[#0000AA] text-white px-2 py-0.5 text-center text-sm border-b border-white/30">
        ============== {state.drive}:\{state.path.join("\\")}\{state.filename} ==============
      </div>

      {/* Editor area */}
      <textarea
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKey}
        spellCheck={false}
        autoFocus
        className="flex-1 bg-[#0000AA] text-white font-mono p-2 outline-none resize-none text-sm"
        style={{ caretColor: "white" }}
      />

      {/* Status bar */}
      <div className="bg-[#AAAAAA] text-black px-2 py-0.5 flex justify-between text-xs">
        <span>F1=Ayuda  F2=Guardar  ESC=Salir</span>
        <span>
          Lin {lines}  Col 1  {text.length} bytes
        </span>
      </div>
    </div>
  )
}
