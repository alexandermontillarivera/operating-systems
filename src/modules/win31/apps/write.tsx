"use client"

import { useState } from "react"
import { MenuBar } from "@/modules/win31/components/menu-bar"

export function Write() {
  const [text, setText] = useState(
    "Microsoft Write\n\nThis was Windows 3.1's built-in word processor.\nIt could open .WRI files and supported basic formatting.",
  )
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)

  return (
    <div className="h-full flex flex-col bg-white text-black" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <MenuBar items={["File", "Edit", "Find", "Character", "Document", "Help"]} />
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-0.5 flex items-center gap-2 text-sm">
        <button
          onClick={() => setBold(!bold)}
          className={`px-2 font-bold border ${bold ? "bg-[#000080] text-white" : "border-[#808080] text-black"}`}
        >
          B
        </button>
        <button
          onClick={() => setItalic(!italic)}
          className={`px-2 italic border ${italic ? "bg-[#000080] text-white" : "border-[#808080] text-black"}`}
        >
          I
        </button>
        <span className="text-xs text-gray-700">Times New Roman 12</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-3 outline-none resize-none bg-white text-black"
        style={{
          fontFamily: "'Times New Roman', serif",
          fontSize: "14px",
          fontWeight: bold ? "bold" : "normal",
          fontStyle: italic ? "italic" : "normal",
        }}
        spellCheck={false}
      />
    </div>
  )
}
