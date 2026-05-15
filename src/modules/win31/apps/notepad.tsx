"use client"

import { useState } from "react"
import { MenuBar } from "@/modules/win31/components/menu-bar"

export function Notepad() {
  const [text, setText] = useState("Welcome to Windows 3.1 Notepad.\n\nA simple text editor.")
  return (
    <div
      className="h-full flex flex-col bg-white text-black"
      style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <MenuBar items={["File", "Edit", "Search", "Help"]} />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="flex-1 p-2 font-mono text-sm resize-none outline-none bg-white text-black"
      />
    </div>
  )
}
