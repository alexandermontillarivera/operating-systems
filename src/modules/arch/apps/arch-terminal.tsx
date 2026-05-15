"use client"

import { useEffect, useRef, useState } from "react"
import { HELP_TEXT, I3_KEYBINDS } from "@/modules/arch/lib/ascii-art"
import { pacmanCommand, yayCommand } from "@/modules/arch/lib/pacman"
import { useCommandHistory } from "@/modules/arch/hooks/use-command-history"
import type { PaneType } from "@/modules/arch/types"

interface Line {
  text: string
  cls?: string
}

interface ArchTerminalProps {
  onOpenPane: (type: PaneType, title: string) => void
}

export function ArchTerminal({ onOpenPane }: ArchTerminalProps) {
  const [input, setInput] = useState("")
  const [lines, setLines] = useState<Line[]>([
    { text: "Arch Linux 6.9.1-arch1-1 (tty1)", cls: "text-gray-500" },
    { text: "" },
    { text: "Welcome to Arch — Keep It Simple, Stupid", cls: "text-[#1793D1]" },
    { text: "" },
    { text: "Type 'help' for available commands.", cls: "text-gray-400" },
    { text: "" },
  ])
  const [cwd, setCwd] = useState("~")
  const cmdHistory = useCommandHistory()
  const ref = useRef<HTMLDivElement>(null)
  const inp = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [lines])
  useEffect(() => inp.current?.focus(), [])

  const print = (entries: Line[]) => setLines((p) => [...p, ...entries])

  const exec = (cmd: string) => {
    const t = cmd.trim()
    setLines((p) => [...p, { text: `[archer@archlinux ${cwd}]$ ${t}`, cls: "text-green-400" }])
    if (!t) return

    const [c, ...args] = t.split(" ")
    let out: Line[] = []

    switch (c) {
      case "help":
        out = HELP_TEXT.map((x) => ({ text: x, cls: "text-gray-300" }))
        break
      case "ls":
        out = [{ text: "arch_install_guide.txt  btw.txt  dotfiles/  scripts/  .config/" }]
        break
      case "pwd":
        out = [{ text: "/home/archer" }]
        break
      case "cd":
        if (!args[0] || args[0] === "~") setCwd("~")
        else if (args[0] === "..") setCwd("~")
        else if (["dotfiles", ".config", "scripts"].includes(args[0])) setCwd(`~/${args[0]}`)
        else out = [{ text: `cd: ${args[0]}: No such file or directory`, cls: "text-red-400" }]
        break
      case "whoami":
        out = [{ text: "archer" }]
        break
      case "id":
        out = [{ text: "uid=1000(archer) gid=1000(archer) groups=1000(archer),998(wheel)" }]
        break
      case "uname":
        out = args.includes("-a")
          ? [{ text: "Linux archlinux 6.9.1-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" }]
          : [{ text: "Linux" }]
        break
      case "uptime":
        out = [{ text: " 14:32:01 up 3 days, 14:23, 1 user, load average: 0.42, 0.38, 0.41" }]
        break
      case "echo":
        out = [{ text: args.join(" ") }]
        break
      case "btw":
        out = [
          { text: "" },
          { text: "  ┌─────────────────────────────┐", cls: "text-[#1793D1]" },
          { text: "  │     I USE ARCH BTW          │", cls: "text-[#1793D1]" },
          { text: "  └─────────────────────────────┘", cls: "text-[#1793D1]" },
          { text: "" },
        ]
        break
      case "wiki":
        onOpenPane("wiki", "wiki: arch principles")
        return
      case "history":
        onOpenPane("history", "history: linux distros")
        return
      case "neofetch":
      case "fastfetch":
        onOpenPane("neofetch", "neofetch")
        return
      case "i3":
        if (args[0] === "keybindings") {
          out = I3_KEYBINDS.map((x) => ({ text: x, cls: "text-gray-300" }))
        } else out = [{ text: "Usage: i3 keybindings", cls: "text-gray-400" }]
        break
      case "cat":
        if (args[0] === "btw.txt") out = [{ text: "I use Arch btw" }]
        else if (args[0] === ".config/i3/config" || args[0] === "~/.config/i3/config") {
          onOpenPane("config", "i3/config")
          return
        } else out = [{ text: `cat: ${args[0] || ""}: No such file or directory`, cls: "text-red-400" }]
        break
      case "pacman":
        out = pacmanCommand(args)
        break
      case "yay":
        out = yayCommand(args)
        break
      case "sudo":
        out = [
          { text: "[sudo] password for archer: ", cls: "text-gray-400" },
          { text: "archer is not in the sudoers file. This incident will be reported.", cls: "text-red-400" },
        ]
        break
      case "fortune":
        out = [
          { text: '"In the beginning there was nothing, which exploded."' },
          { text: "        — Terry Pratchett" },
        ]
        break
      case "clear":
        setLines([])
        return
      case "exit":
        out = [{ text: "logout" }]
        break
      default:
        out = [{ text: `zsh: command not found: ${c}`, cls: "text-red-400" }]
    }
    print(out)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.altKey) return // Let the parent capture i3 keybindings
    if (e.key === "Enter") {
      const v = input
      setInput("")
      cmdHistory.push(v)
      exec(v)
      return
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setInput((curr) => cmdHistory.recallPrevious(curr))
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setInput(cmdHistory.recallNext())
    }
  }

  return (
    <div
      ref={ref}
      onClick={() => inp.current?.focus()}
      className="h-full bg-[#0d1117] p-2 overflow-y-auto text-sm cursor-text"
    >
      {lines.map((l, i) => (
        <div key={i} className={`whitespace-pre-wrap leading-snug ${l.cls ?? "text-gray-200"}`}>
          {l.text || " "}
        </div>
      ))}
      <div className="flex">
        <span className="text-green-400">[archer@archlinux {cwd}]$&nbsp;</span>
        <input
          ref={inp}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="flex-1 bg-transparent outline-none text-gray-200 caret-gray-200"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
