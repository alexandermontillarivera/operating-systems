"use client"

import { useState } from "react"
import type { MacFile } from "@/modules/mac-classic/types"

interface SimpleTextProps {
  data: unknown
}

export function SimpleText({ data }: SimpleTextProps) {
  const initial = (data as { file?: MacFile } | undefined)?.file?.content ?? ""
  const [text, setText] = useState(initial)
  return (
    <div className="h-full bg-white flex flex-col">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="flex-1 p-3 font-mono text-sm resize-none outline-none bg-white text-black"
      />
      <div className="bg-gray-100 border-t border-black px-2 py-0.5 text-[10px] text-gray-700">
        {text.length} chars · {text.split("\n").length} lines
      </div>
    </div>
  )
}
