"use client"

import { useState } from "react"

interface NotepadProps {
  initial?: string
}

export function Notepad({ initial = "" }: NotepadProps) {
  const [text, setText] = useState(initial)
  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <MenuBar items={["Archivo", "Edición", "Buscar", "Ayuda"]} />
      <div className="flex-1 m-0.5 bg-white" style={{ boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #404040, inset -2px -2px 0 0 #dfdfdf" }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full p-1 text-sm outline-none resize-none bg-white"
          style={{ fontFamily: "'Lucida Console', 'Courier New', monospace" }}
          spellCheck={false}
        />
      </div>
    </div>
  )
}

function MenuBar({ items }: { items: string[] }) {
  return (
    <div className="bg-[#c0c0c0] px-1 flex gap-1 text-[11px] border-b border-[#808080]">
      {items.map((m) => (
        <button key={m} className="px-2 py-0.5 hover:bg-[#000080] hover:text-white">
          <u>{m[0]}</u>
          {m.slice(1)}
        </button>
      ))}
    </div>
  )
}
