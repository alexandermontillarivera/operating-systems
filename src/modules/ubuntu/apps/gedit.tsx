"use client"

import { useState } from "react"

export function Gedit() {
  const [text, setText] = useState(
    "# Welcome to Text Editor (gedit)\n\nA simple GTK text editor for GNOME.\n\n- Lightweight\n- Syntax highlighting\n- Plugin system",
  )
  return (
    <div className="h-full flex flex-col bg-white text-black">
      <div className="bg-[#f5f5f5] border-b border-gray-300 px-3 py-1 flex items-center justify-between text-sm">
        <span>untitled.txt</span>
        <div className="flex gap-2">
          <button className="px-2 py-0.5 hover:bg-gray-200 rounded">Save</button>
          <button className="px-2 py-0.5 hover:bg-gray-200 rounded">Open</button>
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-3 font-mono text-sm outline-none resize-none bg-white text-black"
      />
      <div className="bg-[#f5f5f5] border-t border-gray-300 px-3 py-0.5 text-[10px] text-gray-700 flex justify-between">
        <span>Plain text</span>
        <span>Ln {text.split("\n").length}, Col 1</span>
      </div>
    </div>
  )
}
