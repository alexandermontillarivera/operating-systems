"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { Drive, WSState } from "@/modules/cpm/types"
import { initialFiles, parseRef } from "@/modules/cpm/lib/filesystem"
import { HELP_TEXT, HISTORY_TEXT } from "@/modules/cpm/lib/help-texts"
import { useCommandHistory } from "@/modules/cpm/hooks/use-command-history"
import { useEdEditor } from "@/modules/cpm/hooks/use-ed-editor"
import { useMBasic } from "@/modules/cpm/hooks/use-mbasic"
import { CrtScreen } from "@/modules/cpm/components/crt-screen"
import { StatusBar } from "@/modules/cpm/components/status-bar"
import { BackButton } from "@/modules/cpm/components/back-button"
import { WordStar } from "@/modules/cpm/editors/wordstar"

interface CPMSimulatorProps {
  onBack: () => void
}

export function CPMSimulator({ onBack }: CPMSimulatorProps) {
  const filesRef = useRef(initialFiles())
  const [drive, setDrive] = useState<Drive>("A")
  const [userNum, setUserNum] = useState(0)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "",
    "CP/M VERSION 2.2",
    "COPYRIGHT (C) 1979, DIGITAL RESEARCH",
    "",
    "62K TPA",
    "",
    "TYPE HELP FOR COMMANDS",
    "",
  ])
  const [ws, setWs] = useState<WSState | null>(null)
  const cmdHistory = useCommandHistory()
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wsRef = useRef<HTMLTextAreaElement>(null)

  const prompt = useCallback(() => `${userNum > 0 ? userNum : ""}${drive}>`, [userNum, drive])

  const appendLines = useCallback((lines: string[]) => {
    setHistory((prev) => [...prev, ...lines.map((l) => l.toUpperCase())])
  }, [])

  const ed = useEdEditor({
    filesRef,
    drive,
    prompt: prompt(),
    appendLines,
  })
  const basic = useMBasic({ appendLines })

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  }, [history, ed.state])

  useEffect(() => {
    if (ws?.active) wsRef.current?.focus()
    else inputRef.current?.focus()
  }, [ws])

  const startWordStar = (target?: string) => {
    if (!target) {
      setWs({ active: true, drive, filename: "UNTITLED.DOC", text: "", showHelp: true })
      return
    }
    const { d, name } = parseRef(target, drive)
    setWs({
      active: true,
      drive: d,
      filename: name,
      text: filesRef.current[d][name] || "",
      showHelp: true,
    })
  }

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) {
      setHistory((prev) => [...prev, prompt()])
      return
    }
    const upper = trimmed.toUpperCase()

    if (/^[AB]:$/.test(upper)) {
      setDrive(upper[0] as Drive)
      setHistory((prev) => [...prev, `${prompt()}${upper}`])
      return
    }

    const parts = upper.split(/\s+/)
    const command = parts[0]
    const args = parts.slice(1)
    let output: string[] = []
    setHistory((prev) => [...prev, `${prompt()}${upper}`])

    switch (command) {
      case "HELP":
        output = HELP_TEXT
        break

      case "DIR": {
        const target = args[0]
        const d: Drive = target && /^[AB]:?$/.test(target) ? (target[0] as Drive) : drive
        const names = Object.keys(filesRef.current[d]).sort()
        if (names.length === 0) {
          output = ["NO FILE"]
          break
        }
        const lines: string[] = [""]
        for (let i = 0; i < names.length; i += 4) {
          const row = names
            .slice(i, i + 4)
            .map((n) => {
              const [base, ext = ""] = n.split(".")
              return `${d}: ${base.padEnd(8)} ${ext.padEnd(3)}`
            })
            .join(" : ")
          lines.push(row)
        }
        output = lines
        break
      }

      case "STAT": {
        const files = Object.entries(filesRef.current[drive])
        const used = files.reduce((s, [, c]) => s + c.length, 0)
        const total = 256 * 1024
        output = [
          "",
          `${drive}: R/W, SPACE: ${Math.floor((total - used) / 1024)}K`,
          `       USED: ${Math.floor(used / 1024)}K   FILES: ${files.length}`,
          `       USER: ${userNum}`,
          "",
        ]
        break
      }

      case "TYPE": {
        if (!args[0]) {
          output = ["TYPE: NO FILE SPECIFIED"]
          break
        }
        const { d, name } = parseRef(args[0], drive)
        const c = filesRef.current[d][name]
        if (!c) output = [`TYPE: NO FILE - ${args[0]}`]
        else output = c.split("\n").map((l) => l.toUpperCase())
        break
      }

      case "ERA": {
        if (!args[0]) {
          output = ["ERA: NO FILE"]
          break
        }
        const { d, name } = parseRef(args[0], drive)
        if (!filesRef.current[d][name]) output = ["NO FILE"]
        else delete filesRef.current[d][name]
        break
      }

      case "REN": {
        const joined = args.join("")
        const eq = joined.indexOf("=")
        if (eq < 1) {
          output = ["USAGE: REN NEW=OLD"]
          break
        }
        const newName = joined.slice(0, eq)
        const oldName = joined.slice(eq + 1)
        const o = parseRef(oldName, drive)
        if (!filesRef.current[o.d][o.name]) {
          output = ["NO FILE"]
          break
        }
        filesRef.current[o.d][newName.toUpperCase()] = filesRef.current[o.d][o.name]
        delete filesRef.current[o.d][o.name]
        break
      }

      case "USER": {
        const n = parseInt(args[0] || "0", 10)
        if (isNaN(n) || n < 0 || n > 15) output = ["USER: 0-15"]
        else setUserNum(n)
        break
      }

      case "PIP": {
        const joined = args.join("")
        const eq = joined.indexOf("=")
        if (eq < 1) {
          output = ["USAGE: PIP DEST=SRC"]
          break
        }
        const destS = joined.slice(0, eq)
        const srcS = joined.slice(eq + 1)
        const src = parseRef(srcS, drive)
        const dest = parseRef(destS || src.name, drive)
        const c = filesRef.current[src.d][src.name]
        if (!c) {
          output = ["NO FILE"]
          break
        }
        filesRef.current[dest.d][dest.name || src.name] = c
        output = [`COPIED ${src.d}:${src.name} -> ${dest.d}:${dest.name || src.name}`]
        break
      }

      case "ED":
        if (!args[0]) {
          output = ["USAGE: ED FILENAME"]
          break
        }
        ed.open(args[0])
        return

      case "WS":
        startWordStar(args[0])
        return

      case "MBASIC":
      case "BASIC":
        basic.start()
        return

      case "ASM":
        output = [`${args[0] || "?"} ASSEMBLED.`, "001H BYTES, NO ERRORS"]
        break

      case "DDT":
        output = [
          "DDT VERS 2.2",
          "NEXT  PC  END",
          "0100 0100 FFFF",
          "(USE 'X' TO EXIT IN REAL DDT - NOT IMPLEMENTED)",
        ]
        break

      case "HISTORY":
        output = HISTORY_TEXT
        break

      case "CLS":
      case "CLEAR":
        setHistory([])
        return

      case "EXIT":
      case "BYE":
        onBack()
        return

      default:
        output = [`${command}?`]
    }
    if (output.length) appendLines(output)
  }

  const handleSubmit = () => {
    const value = input
    setInput("")
    if (ed.active) {
      ed.feed(value)
      return
    }
    if (basic.active) {
      basic.feed(value)
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
    if (ed.active || basic.active) return
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setInput((curr) => cmdHistory.recallPrevious(curr))
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setInput(cmdHistory.recallNext())
    }
  }

  const livePrompt = ed.active
    ? ed.state?.mode === "insert"
      ? `${String((ed.state?.insertAt ?? 0) + 1).padStart(3)}: `
      : "*"
    : basic.active
      ? "OK "
      : prompt()

  const modeLabel = ed.active
    ? `ED ${ed.state?.drive}:${ed.state?.filename} [${ed.state?.mode.toUpperCase()}${ed.state?.dirty ? " *" : ""}]`
    : basic.active
      ? "MBASIC 5.21"
      : ws?.active
        ? `WORDSTAR - ${ws.drive}:${ws.filename}`
        : "CP/M 2.2"

  return (
    <div
      className="min-h-screen text-white font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      <CrtScreen>
        <StatusBar drive={drive} userNum={userNum} modeLabel={modeLabel} />
        <BackButton onClick={onBack} />

        {ws?.active && (
          <WordStar
            state={ws}
            textareaRef={wsRef}
            onChange={(t) => setWs((s) => (s ? { ...s, text: t } : s))}
            onSave={() => {
              if (!ws) return
              filesRef.current[ws.drive][ws.filename || "UNTITLED.DOC"] = ws.text
              appendLines([`SAVED ${ws.drive}:${ws.filename}`])
            }}
            onExit={() => setWs(null)}
            onToggleHelp={() => setWs((s) => (s ? { ...s, showHelp: !s.showHelp } : s))}
          />
        )}

        <div ref={terminalRef} className="h-screen overflow-y-auto p-4 pt-10 pb-20 relative z-10">
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap leading-relaxed">
              {line}
            </div>
          ))}

          <div className="flex">
            <span>{livePrompt}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white caret-white uppercase ml-1"
              autoFocus
            />
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </CrtScreen>
    </div>
  )
}
