"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { FsNode, TerminalLine } from "@/modules/bsd/types"
import { getNode, initialFs, resolvePath } from "@/modules/bsd/lib/filesystem"
import { manPage } from "@/modules/bsd/lib/man-pages"
import { FINGER_DETAILS, HELP_TEXT, HISTORY_TEXT } from "@/modules/bsd/lib/help-texts"
import { useCommandHistory } from "@/modules/bsd/hooks/use-command-history"
import { useViEditor } from "@/modules/bsd/hooks/use-vi-editor"
import { CrtScreen } from "@/modules/bsd/components/crt-screen"
import { TitleBar } from "@/modules/bsd/components/title-bar"
import { ViOverlay } from "@/modules/bsd/editors/vi-overlay"

interface BSDSimulatorProps {
  onExit: () => void
}

const KNOWN_USERS = ["root", "joy", "ken", "dmr"] as const

export function BSDSimulator({ onExit }: BSDSimulatorProps) {
  const fsRef = useRef<FsNode>(initialFs())
  const [cwd, setCwd] = useState("/home/root")
  const [user, setUser] = useState("root")
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: "4.3 BSD UNIX (ucbvax.Berkeley.EDU)" },
    { type: "system", content: "" },
    { type: "system", content: "Copyright (c) 1983,1986 Regents of the University of California." },
    { type: "system", content: "All rights reserved." },
    { type: "system", content: "" },
    { type: "system", content: "4.3 BSD #1: Thu Apr 10 13:35:55 PST 1986" },
    { type: "system", content: "" },
    { type: "output", content: "login: root" },
    { type: "output", content: "Last login: Wed Apr 9 14:22:36 on console" },
    { type: "system", content: "" },
    { type: "output", content: "Welcome to 4.3 BSD UNIX  -  Type 'help' for commands." },
    { type: "system", content: "" },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const cmdHistory = useCommandHistory()
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const prompt = () => `${user}@ucbvax:${cwd}% `

  const appendOutput = useCallback(
    (text: string | string[]) =>
      setLines((prev) => [
        ...prev,
        ...(Array.isArray(text) ? text : [text]).map((c) => ({ type: "output" as const, content: c })),
      ]),
    [],
  )

  const vi = useViEditor({ fsRef, cwd, appendOutput })

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  }, [lines])

  useEffect(() => inputRef.current?.focus(), [vi.active])

  const processCommand = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/)
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)
    let output: string[] = []

    switch (command) {
      case "":
        break

      case "ls": {
        const showAll = args.includes("-a")
        const longFormat = args.includes("-l") || args.includes("-la") || args.includes("-al")
        const target = args.find((a) => !a.startsWith("-")) || cwd
        const path = resolvePath(cwd, target)
        const node = getNode(fsRef.current, path)
        if (!node) {
          output = [`ls: ${target}: No such file or directory`]
          break
        }
        if (node.type === "file") {
          output = [target]
          break
        }
        const names = Object.keys(node.children).sort()
        const all = showAll ? [".", "..", ...names] : names
        if (longFormat) {
          output = ["total " + all.length * 2]
          for (const n of all) {
            const child = n === "." || n === ".." ? node : node.children[n]
            const isDir = child.type === "dir"
            const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--"
            const size = isDir ? 512 : (child as { content: string }).content.length
            output.push(
              `${perms}  2 ${user.padEnd(5)} wheel ${String(size).padStart(6)} Apr 10 13:35 ${n}`,
            )
          }
        } else output = [all.join("  ")]
        break
      }

      case "cd": {
        const target = args[0] || `/home/${user}`
        const path = resolvePath(cwd, target)
        const node = getNode(fsRef.current, path)
        if (!node) output = [`${target}: No such directory`]
        else if (node.type !== "dir") output = [`${target}: Not a directory`]
        else setCwd(path === "" ? "/" : path)
        break
      }

      case "pwd":
        output = [cwd]
        break

      case "whoami":
        output = [user]
        break

      case "id":
        output = [
          `uid=${user === "root" ? 0 : 100}(${user}) gid=${user === "root" ? 0 : 10}(${user === "root" ? "wheel" : "staff"})`,
        ]
        break

      case "su": {
        const target = args[0] || "root"
        if (!KNOWN_USERS.includes(target as (typeof KNOWN_USERS)[number])) {
          output = [`su: unknown login ${target}`]
          break
        }
        setUser(target)
        const home = `/home/${target}`
        if (getNode(fsRef.current, home)) setCwd(home)
        break
      }

      case "hostname":
        output = ["ucbvax.Berkeley.EDU"]
        break

      case "uname":
        output = args.includes("-a")
          ? ["BSD ucbvax.Berkeley.EDU 4.3 BSD UNIX #1: Thu Apr 10 13:35:55 PST 1986 vax"]
          : ["BSD"]
        break

      case "date":
        output = ["Thu Apr 10 14:30:00 PST 1986"]
        break

      case "uptime":
        output = [" 2:30PM  up 15 days, 3:45, 3 users, load averages: 0.25, 0.30, 0.27"]
        break

      case "who":
        output = [
          "root     console  Apr 10 14:22",
          "joy      ttyp0    Apr 10 09:15",
          "ken      ttyp1    Apr 10 11:30",
        ]
        break

      case "finger":
        if (args[0]) {
          output = FINGER_DETAILS[args[0]] || [`finger: ${args[0]}: no such user`]
        } else {
          output = [
            "Login    Name              TTY  Idle  Login Time   Office",
            "root     Charlie Root      co      -  Apr 10 14:22",
            "joy      Bill Joy          p0     15  Apr 10 09:15  Evans Hall",
            "ken      Ken Thompson      p1     45  Apr 10 11:30  Bell Labs",
          ]
        }
        break

      case "ps":
        output = [
          "  PID TT STAT  TIME COMMAND",
          "    1 co IWs   0:01 /etc/init",
          "   45 co Ss    0:00 -csh (csh)",
          "   88 p0 S     0:01 vi vi.c",
          "  112 co R+    0:00 ps",
        ]
        break

      case "man":
        if (!args[0]) {
          output = ["What manual page do you want?"]
          break
        }
        output = manPage(args[0])
        break

      case "cat": {
        if (!args[0]) {
          output = ["usage: cat [-benstuv] [file ...]"]
          break
        }
        const path = resolvePath(cwd, args[0])
        const node = getNode(fsRef.current, path)
        if (!node) output = [`cat: ${args[0]}: No such file or directory`]
        else if (node.type === "dir") output = [`cat: ${args[0]}: Is a directory`]
        else output = node.content.split("\n")
        break
      }

      case "vi":
      case "ex":
        if (!args[0]) {
          appendOutput(`% ${cmd}`)
          appendOutput(["Usage: vi <file>"])
          return
        }
        appendOutput(`% ${cmd}`)
        vi.open(args[0])
        return

      case "echo":
        output = [args.join(" ")]
        break

      case "mail": {
        const path = `/var/mail/${user}`
        const node = getNode(fsRef.current, path)
        if (!node || node.type !== "file" || node.content.length === 0) {
          output = ["No mail."]
          break
        }
        output = [
          "Mail version 8.1  Type ? for help.",
          `"/var/mail/${user}":`,
          ...node.content.split("\n"),
        ]
        break
      }

      case "grep": {
        if (args.length < 2) {
          output = ["usage: grep pattern file"]
          break
        }
        const [pattern, file] = args
        const node = getNode(fsRef.current, resolvePath(cwd, file))
        if (!node || node.type !== "file") {
          output = [`grep: ${file}: No such file`]
          break
        }
        const re = new RegExp(pattern)
        output = node.content.split("\n").filter((l) => re.test(l))
        if (output.length === 0) output = [""]
        break
      }

      case "wc": {
        if (!args[0]) {
          output = ["usage: wc file"]
          break
        }
        const node = getNode(fsRef.current, resolvePath(cwd, args[0]))
        if (!node || node.type !== "file") {
          output = [`wc: ${args[0]}: No such file`]
          break
        }
        const t = node.content
        output = [
          `${String(t.split("\n").length).padStart(7)} ${String(t.split(/\s+/).filter(Boolean).length).padStart(7)} ${String(t.length).padStart(7)} ${args[0]}`,
        ]
        break
      }

      case "ifconfig":
        output = [
          "le0: flags=63<UP,BROADCAST,NOTRAILERS,RUNNING>",
          "        inet 128.32.0.1 netmask ffffff00 broadcast 128.32.0.255",
          "lo0: flags=49<UP,LOOPBACK,RUNNING>",
          "        inet 127.0.0.1 netmask ff000000",
        ]
        break

      case "ping":
        if (!args[0]) {
          output = ["usage: ping host"]
        } else {
          output = [
            `PING ${args[0]} (...): 56 data bytes`,
            "64 bytes: icmp_seq=0 ttl=64 time=0.084 ms",
            "64 bytes: icmp_seq=1 ttl=64 time=0.073 ms",
            "^C",
            `--- ${args[0]} ping statistics ---`,
            "2 packets transmitted, 2 packets received, 0.0% packet loss",
          ]
        }
        break

      case "history":
        output = HISTORY_TEXT
        break

      case "help":
        output = HELP_TEXT
        break

      case "clear":
        setLines([])
        return

      case "exit":
      case "logout":
        onExit()
        return

      default:
        output = [`${command}: Command not found.`]
    }

    setLines((prev) => [
      ...prev,
      { type: "input", content: `${prompt()}${cmd}` },
      ...output.map((line) => ({ type: "output" as const, content: line })),
    ])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(currentInput)
      cmdHistory.push(currentInput)
      setCurrentInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setCurrentInput((curr) => cmdHistory.recallPrevious(curr))
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setCurrentInput(cmdHistory.recallNext())
    }
  }

  if (vi.active && vi.state) return <ViOverlay state={vi.state} />

  return (
    <div
      className="h-screen w-full font-mono text-sm flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <TitleBar user={user} cwd={cwd} onClose={onExit} />
      <CrtScreen>
        <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 text-amber-400 z-20 h-full">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap ${line.type === "system" ? "text-amber-600" : ""}`}
            >
              {line.content}
            </div>
          ))}

          <div className="flex items-center">
            <span className="text-amber-400">{prompt()}</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-amber-400 caret-amber-400"
              spellCheck={false}
              autoComplete="off"
            />
            <span className="animate-pulse text-amber-400">_</span>
          </div>
        </div>
      </CrtScreen>
    </div>
  )
}
