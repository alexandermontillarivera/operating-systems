"use client"

import { useState } from "react"

export function Notepad() {
  const [text, setText] = useState("")
  return (
    <div className="h-full flex flex-col bg-white text-black">
      <div className="bg-[#ECE9D8] border-b px-2 py-0.5 flex gap-3 text-xs">
        {["Archivo", "Edición", "Formato", "Ver", "Ayuda"].map((m) => (
          <span key={m} className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">{m}</span>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="flex-1 p-2 font-mono text-sm outline-none resize-none bg-white text-black"
      />
    </div>
  )
}
