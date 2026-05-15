"use client"

import { useEffect, useRef, useState } from "react"

const COMMANDS: Record<string, string> = {
  ls: "Applications  Desktop  Documents  Downloads  Library  Movies  Music  Pictures",
  pwd: "/Users/user",
  whoami: "user",
  date: new Date().toString(),
  help: "Comandos: ls pwd whoami date echo clear history neofetch sw_vers uname uptime",
  sw_vers: "ProductName:    macOS\nProductVersion: 14.0\nBuildVersion:   23A344",
  uname: "Darwin user.local 23.0.0 Darwin Kernel Version 23.0.0",
  uptime: " 14:32  up 5 days, 3:12, 2 users, load averages: 1.42 1.32 1.20",
  history: "macOS está basado en Darwin/BSD. Su Terminal usa zsh (antes bash).",
  neofetch: `                    'c.          user@mac
                 ,xNMM.          --------
               .OMMMMo           OS: macOS Sonoma
               OMMM0,            Kernel: Darwin 23.0
     .;loddo:' loolloddol;.      Shell: zsh
   cKMMMMMMMMMMNWMMMMMMMMMM0:    Resolution: 2560x1600
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.    Terminal: Terminal.app
 XMMMMMMMMMMMMMMMMMMMMMMMX.      CPU: Apple M3
;MMMMMMMMMMMMMMMMMMMMMMMM:       Memory: 16 GB`,
}

export function Terminal() {
  const [lines, setLines] = useState<string[]>(["Last login: " + new Date().toLocaleString(), ""])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => inputRef.current?.focus(), [])
  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [lines])

  const exec = (cmd: string) => {
    const trimmed = cmd.trim()
    setLines((p) => [...p, `user@mac ~ % ${trimmed}`])
    if (trimmed === "clear") {
      setLines([])
      return
    }
    const [c, ...args] = trimmed.split(" ")
    const r = c === "echo" ? args.join(" ") : COMMANDS[c]
    if (r) setLines((p) => [...p, r, ""])
    else if (trimmed) setLines((p) => [...p, `zsh: command not found: ${c}`, ""])
    else setLines((p) => [...p, ""])
  }

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-black/95 p-3 overflow-y-auto font-mono text-sm text-green-400 cursor-text"
    >
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {l}
        </div>
      ))}
      <div className="flex">
        <span className="text-blue-400">user@mac</span>
        <span className="text-white mx-1">~</span>
        <span className="text-yellow-400">%</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              exec(input)
              setInput("")
            }
          }}
          className="flex-1 bg-transparent outline-none text-white ml-2 caret-white"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
