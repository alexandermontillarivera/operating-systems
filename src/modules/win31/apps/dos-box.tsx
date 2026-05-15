"use client"

import { useState } from "react"

/** Mini MS-DOS prompt embedded inside Win 3.1 (a real Win 3.1 feature). */
export function DosBox() {
  const [history, setHistory] = useState<string[]>([
    "Microsoft(R) MS-DOS(R) Version 5.00",
    "(C) Copyright Microsoft Corp 1981-1991.",
    "",
    "C:\\>",
  ])
  const [input, setInput] = useState("")

  const exec = (cmd: string) => {
    const out: string[] = [`C:\\>${cmd.toUpperCase()}`]
    switch (cmd.trim().toUpperCase()) {
      case "DIR":
        out.push(
          "DOS          <DIR>",
          "WINDOWS      <DIR>",
          "AUTOEXEC BAT     128",
          "CONFIG   SYS     256",
          "        2 file(s)        384 bytes",
        )
        break
      case "VER":
        out.push("MS-DOS Version 5.00")
        break
      case "WIN":
        out.push("(Already in Windows.)")
        break
      case "":
        break
      default:
        out.push("Bad command or file name")
    }
    out.push("", "C:\\>")
    setHistory((h) => [...h, ...out])
    setInput("")
  }

  return (
    <div className="h-full bg-black p-2 font-mono text-green-400 text-sm overflow-auto">
      {history.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {l}
        </div>
      ))}
      <div className="flex">
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && exec(input)}
          className="bg-transparent outline-none flex-1 text-green-400"
        />
      </div>
    </div>
  )
}
