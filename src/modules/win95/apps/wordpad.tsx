"use client"

import { useState } from "react"

interface WordPadProps {
  initial?: string
}

export function WordPad({ initial = "" }: WordPadProps) {
  const [text, setText] = useState(initial)
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [size, setSize] = useState(12)

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <MenuBar items={["Archivo", "Edición", "Ver", "Insertar", "Formato", "Ayuda"]} />
      <div className="bg-[#c0c0c0] px-1 py-1 flex items-center gap-1 border-b border-[#808080]">
        <select
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value, 10))}
          className="text-[11px] h-5 bg-white border border-gray-500 px-1"
        >
          {[8, 10, 12, 14, 16, 18, 24].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <ToolbarButton active={bold} onClick={() => setBold(!bold)} className="font-bold">
          B
        </ToolbarButton>
        <ToolbarButton active={italic} onClick={() => setItalic(!italic)} className="italic">
          I
        </ToolbarButton>
        <ToolbarButton active={underline} onClick={() => setUnderline(!underline)} className="underline">
          U
        </ToolbarButton>
      </div>
      <div className="flex-1 m-0.5 bg-white" style={{ boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #404040, inset -2px -2px 0 0 #dfdfdf" }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full p-2 outline-none resize-none bg-white"
          spellCheck={false}
          style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: `${size}px`,
            fontWeight: bold ? "bold" : "normal",
            fontStyle: italic ? "italic" : "normal",
            textDecoration: underline ? "underline" : "none",
          }}
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

function ToolbarButton({
  children,
  onClick,
  active,
  className = "",
}: {
  children: React.ReactNode
  onClick: () => void
  active: boolean
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 bg-[#c0c0c0] text-sm ${className}`}
      style={{
        boxShadow: active
          ? "inset 1px 1px 0 0 #000, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #808080"
          : "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
      }}
    >
      {children}
    </button>
  )
}
