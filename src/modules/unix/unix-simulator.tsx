"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { FsNode } from "@/modules/unix/types"
import {
  getNode,
  initialFs,
  makeDir,
  removeNode,
  resolvePath,
  setFile,
} from "@/modules/unix/lib/filesystem"
import { manPage } from "@/modules/unix/lib/man-pages"
import { HELP_TEXT, HISTORY_TEXT } from "@/modules/unix/lib/help-texts"
import { useCommandHistory } from "@/modules/unix/hooks/use-command-history"
import { useEdEditor } from "@/modules/unix/hooks/use-ed-editor"
import { CrtScreen } from "@/modules/unix/components/crt-screen"
import { StatusBar } from "@/modules/unix/components/status-bar"
import { BackButton } from "@/modules/unix/components/back-button"

interface UnixSimulatorProps {
  onBack: () => void
}

const KNOWN_USERS = ["root", "ken", "dmr", "bwk"] as const

export function UnixSimulator({ onBack }: UnixSimulatorProps) {
  const fsRef = useRef<FsNode>(initialFs())
  const [input, setInput] = useState("")
  const [cwd, setCwd] = useState("/home/root")
  const [user, setUser] = useState("root")
  const [history, setHistory] = useState<string[]>([
    "UNIX Time-Sharing System; V7",
    "(C) 1979 Bell Telephone Laboratories, Incorporated",
    "",
    "login: root",
    "Password: ",
    "Last login: Thu Nov  3 14:23:11 on tty01",
    "",
    "* Welcome to UNIX V7. Type 'help' for available commands. *",
    "",
  ])
  const cmdHistory = useCommandHistory()
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const prompt = user === "root" ? "# " : "$ "

  const appendLines = useCallback(
    (lines: string[]) => setHistory((prev) => [...prev, ...lines]),
    [],
  )

  const ed = useEdEditor({
    fsRef,
    cwd,
    prompt,
    appendLines,
    onCommand: () => undefined,
  })

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  }, [history, ed.state])

  useEffect(() => {
    inputRef.current?.focus()
  }, [ed.state])

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) {
      appendLines([`${prompt}`])
      return
    }
    const parts = trimmed.split(/\s+/)
    const command = parts[0]
    const args = parts.slice(1)
    let output: string[] = []

    switch (command) {
      case "help":
        output = HELP_TEXT
        break

      case "ls": {
        const showLong = args.includes("-l") || args.includes("-la") || args.includes("-al")
        const showAll = args.includes("-a") || args.includes("-la") || args.includes("-al")
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
        if (showLong) {
          output = ["total " + all.length * 2]
          for (const n of all) {
            const child = n === "." || n === ".." ? node : node.children[n]
            const isDir = child.type === "dir"
            const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--"
            const size = isDir ? 512 : (child as { content: string }).content.length
            output.push(
              `${perms}  1 ${user.padEnd(5)} staff ${String(size).padStart(6)} Nov  3  1979 ${n}`,
            )
          }
        } else {
          output = [all.join("  ")]
        }
        break
      }

      case "cd": {
        const target = args[0] || "/home/root"
        const path = resolvePath(cwd, target)
        const node = getNode(fsRef.current, path)
        if (!node) output = [`${target}: bad directory`]
        else if (node.type !== "dir") output = [`${target}: not a directory`]
        else setCwd(path === "" ? "/" : path)
        break
      }

      case "pwd":
        output = [cwd]
        break

      case "cat": {
        if (!args[0]) {
          output = ["cat: missing file"]
          break
        }
        const path = resolvePath(cwd, args[0])
        const node = getNode(fsRef.current, path)
        if (!node) output = [`cat: ${args[0]}: No such file or directory`]
        else if (node.type === "dir") output = [`cat: ${args[0]}: Is a directory`]
        else output = node.content.split("\n")
        break
      }

      case "ed":
        if (!args[0]) {
          appendLines([`${prompt}${trimmed}`, "?"])
          return
        }
        ed.openEditor(args[0])
        return

      case "mkdir":
        if (!args[0]) output = ["mkdir: missing operand"]
        else if (!makeDir(fsRef.current, resolvePath(cwd, args[0])))
          output = [`mkdir: ${args[0]}: cannot create`]
        break

      case "rm":
        if (!args[0]) output = ["rm: missing operand"]
        else if (!removeNode(fsRef.current, resolvePath(cwd, args[0])))
          output = [`rm: ${args[0]}: No such file or directory`]
        break

      case "cp": {
        if (args.length < 2) {
          output = ["cp: missing operand"]
          break
        }
        const src = getNode(fsRef.current, resolvePath(cwd, args[0]))
        if (!src || src.type !== "file") {
          output = [`cp: ${args[0]}: cannot read`]
          break
        }
        if (!setFile(fsRef.current, resolvePath(cwd, args[1]), src.content))
          output = [`cp: ${args[1]}: cannot create`]
        break
      }

      case "mv": {
        if (args.length < 2) {
          output = ["mv: missing operand"]
          break
        }
        const src = getNode(fsRef.current, resolvePath(cwd, args[0]))
        if (!src || src.type !== "file") {
          output = [`mv: ${args[0]}: not found`]
          break
        }
        setFile(fsRef.current, resolvePath(cwd, args[1]), src.content)
        removeNode(fsRef.current, resolvePath(cwd, args[0]))
        break
      }

      case "echo":
        output = [args.join(" ")]
        break

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
        const text = node.content
        const lines = text.split("\n").length
        const words = text.split(/\s+/).filter(Boolean).length
        const chars = text.length
        output = [
          `${String(lines).padStart(7)} ${String(words).padStart(7)} ${String(chars).padStart(7)} ${args[0]}`,
        ]
        break
      }

      case "whoami":
      case "id":
        output =
          command === "id"
            ? [
                `uid=${user === "root" ? 0 : 100}(${user}) gid=${user === "root" ? 0 : 1}(${user === "root" ? "wheel" : "staff"})`,
              ]
            : [user]
        break

      case "who":
        output = [
          "root     console  Nov  3 14:23",
          "ken      tty01    Nov  3 09:00",
          "dmr      tty02    Nov  3 09:30",
          "bwk      tty03    Nov  3 11:42",
        ]
        break

      case "su": {
        const target = args[0] || "root"
        if (!KNOWN_USERS.includes(target as (typeof KNOWN_USERS)[number])) {
          output = [`su: unknown user: ${target}`]
          break
        }
        setUser(target)
        const home = `/home/${target}`
        if (getNode(fsRef.current, home)) setCwd(home)
        output = [""]
        break
      }

      case "date":
        output = ["Thu Nov  3 14:30:00 EST 1979"]
        break

      case "uname":
        output = args.includes("-a") ? ["UNIX bell-labs 7 #1 PDP-11"] : ["UNIX"]
        break

      case "uptime":
        output = [" 2:30PM  up 23 days, 4:12, 4 users, load 0.42, 0.38, 0.41"]
        break

      case "ps":
        output = [
          "  PID TTY    TIME CMD",
          "    1 ?      0:01 init",
          "   42 con    0:00 sh",
          "   83 tty01  0:00 -sh",
          "  101 tty02  0:00 ed unix.c",
          "  137 con    0:00 ps",
        ]
        break

      case "man":
        if (!args[0]) {
          output = ["What manual page do you want?"]
          break
        }
        output = manPage(args[0])
        break

      case "history":
        output = HISTORY_TEXT
        break

      case "clear":
        setHistory([])
        return

      case "exit":
      case "logout":
        onBack()
        return

      default:
        output = [`${command}: not found`]
    }

    appendLines([`${prompt}${trimmed}`, ...output])
  }

  const handleSubmit = () => {
    const value = input
    setInput("")
    if (ed.active) {
      ed.feedInput(value)
      return
    }
    cmdHistory.push(value)
    executeCommand(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
      return
    }
    if (ed.active) return
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setInput((curr) => cmdHistory.recallPrevious(curr))
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setInput(cmdHistory.recallNext())
    }
  }

  const livePrompt = ed.active ? (ed.state?.mode === "insert" ? "" : ":") : prompt
  const modeLabel = ed.active
    ? `ed ${ed.state?.file}  [${ed.state?.mode}${ed.state?.dirty ? " *" : ""}]`
    : "UNIX V7"

  return (
    <div
      className="min-h-screen text-amber-400 font-mono"
      style={{
        textShadow: "0 0 4px rgba(255,176,0,0.55)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <CrtScreen>
        <StatusBar user={user} cwd={cwd} modeLabel={modeLabel} />
        <BackButton onClick={onBack} />

        <div
          ref={terminalRef}
          className="h-screen overflow-y-auto p-4 pt-10 pb-20 relative z-10"
        >
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap leading-relaxed">
              {line}
            </div>
          ))}

          <div className="flex">
            <span>{livePrompt}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-amber-400 caret-amber-400 ml-1"
              autoFocus
              spellCheck={false}
              style={{ textShadow: "inherit" }}
            />
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </CrtScreen>
    </div>
  )
}
