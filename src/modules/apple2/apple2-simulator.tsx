"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { BasicProgram, Mode } from "@/modules/apple2/types"
import { GAMES_TEXT, HELP_TEXT, HISTORY_TEXT } from "@/modules/apple2/lib/help-texts"
import { initialDOS33 } from "@/modules/apple2/lib/initial-files"
import { runProgram } from "@/modules/apple2/lib/basic-runtime"
import { useCommandHistory } from "@/modules/apple2/hooks/use-command-history"
import { useHires } from "@/modules/apple2/hooks/use-hires"
import { useLores } from "@/modules/apple2/hooks/use-lores"
import { CrtScreen } from "@/modules/apple2/components/crt-screen"
import { StatusBar } from "@/modules/apple2/components/status-bar"
import { BackButton } from "@/modules/apple2/components/back-button"
import { LoresCanvas } from "@/modules/apple2/components/lores-canvas"
import { HiresCanvas } from "@/modules/apple2/components/hires-canvas"

interface Apple2SimulatorProps {
  onBack: () => void
}

export function Apple2Simulator({ onBack }: Apple2SimulatorProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "",
    "                **** APPLE ][ ****",
    "",
    "         APPLESOFT BASIC VERSION 2.0",
    "      COPYRIGHT 1978 BY APPLE COMPUTER",
    "",
    "                32767 BYTES FREE",
    "",
    "TYPE 'HELP' OR LOAD A PROGRAM (LOAD HELLO)",
    "",
  ])
  const [program, setProgram] = useState<BasicProgram>({ lines: new Map() })
  const [mode, setMode] = useState<Mode>("text")
  const [color, setColor] = useState(15)
  const [hcolor, setHcolor] = useState(3)
  const [dosMode, setDosMode] = useState(false)
  const filesRef = useRef<Record<string, string>>({ ...initialDOS33 })

  const lores = useLores()
  const hires = useHires()
  const cmdHistory = useCommandHistory()
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  }, [history])
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const print = useCallback((lines: string[]) => {
    setHistory((prev) => [...prev, ...lines.map((l) => l.toUpperCase())])
  }, [])

  const runCurrent = useCallback(() => {
    const out = runProgram(
      program,
      {
        setMode,
        clearLores: lores.clear,
        clearHires: hires.clear,
        plotLores: lores.plot,
        hlinLores: lores.hlin,
        vlinLores: lores.vlin,
        hplotLine: hires.hplotLine,
        clearScreen: () => setHistory([]),
      },
      { initialColor: color, initialHColor: hcolor },
    )
    print(out)
  }, [program, color, hcolor, lores, hires, print])

  const executeCommand = (cmd: string) => {
    const upperCmd = cmd.toUpperCase().trim()
    if (!upperCmd) {
      setHistory((prev) => [...prev, "]"])
      return
    }
    setHistory((prev) => [...prev, `]${upperCmd}`])

    // Line entry: "10 PRINT ..."
    const lineEntry = upperCmd.match(/^(\d+)\s*(.*)$/)
    if (lineEntry) {
      const ln = parseInt(lineEntry[1], 10)
      const stmt = lineEntry[2]
      setProgram((p) => {
        const np = new Map(p.lines)
        if (!stmt) np.delete(ln)
        else np.set(ln, stmt)
        return { lines: np }
      })
      return
    }

    const parts = upperCmd.split(/\s+/)
    const command = parts[0]
    const args = parts.slice(1)
    let output: string[] = []

    switch (command) {
      case "HELP":
        output = HELP_TEXT
        break
      case "PRINT": {
        const rest = cmd.slice(cmd.toUpperCase().indexOf("PRINT") + 5).trim()
        if (rest.startsWith('"') && rest.endsWith('"')) output = [rest.slice(1, -1).toUpperCase()]
        else if (rest === "") output = [""]
        else output = [rest.toUpperCase()]
        break
      }
      case "LIST": {
        const lines = [...program.lines.keys()].sort((a, b) => a - b)
        output = lines.length ? lines.map((n) => `${n} ${program.lines.get(n)}`) : [""]
        break
      }
      case "RUN":
        runCurrent()
        return
      case "NEW":
        setProgram({ lines: new Map() })
        break
      case "HOME":
      case "CLS":
        setHistory([])
        return
      case "TEXT":
        setMode("text")
        break
      case "GR":
        setMode("lores")
        lores.clear()
        break
      case "HGR":
        setMode("hires")
        hires.clear()
        break
      case "COLOR=": {
        const n = parseInt(args[0], 10)
        if (!isNaN(n)) setColor(n & 15)
        break
      }
      case "HCOLOR=": {
        const n = parseInt(args[0], 10)
        if (!isNaN(n)) setHcolor(Math.max(0, Math.min(5, n)))
        break
      }
      case "PLOT": {
        const m = args.join("").split(",").map(Number)
        lores.plot(m[0], m[1], color)
        break
      }
      case "HLIN": {
        const idxAt = args.findIndex((a) => a === "AT")
        if (idxAt < 0) {
          output = ["?SYNTAX"]
          break
        }
        const xs = args.slice(0, idxAt).join("").split(",").map(Number)
        const y = parseInt(args[idxAt + 1], 10)
        lores.hlin(xs[0], xs[1], y, color)
        break
      }
      case "VLIN": {
        const idxAt = args.findIndex((a) => a === "AT")
        if (idxAt < 0) {
          output = ["?SYNTAX"]
          break
        }
        const ys = args.slice(0, idxAt).join("").split(",").map(Number)
        const x = parseInt(args[idxAt + 1], 10)
        lores.vlin(ys[0], ys[1], x, color)
        break
      }
      case "HPLOT": {
        const idxTo = args.findIndex((a) => a === "TO")
        if (idxTo > 0) {
          const a = args.slice(0, idxTo).join("").split(",").map(Number)
          const b = args.slice(idxTo + 1).join("").split(",").map(Number)
          hires.hplotLine(a[0], a[1], b[0], b[1], hcolor)
        } else {
          const a = args.join("").split(",").map(Number)
          hires.hplotLine(a[0], a[1], a[0], a[1], hcolor)
        }
        break
      }
      case "CATALOG":
        output = [
          "",
          "DISK VOLUME 254",
          "",
          ...Object.keys(filesRef.current).map(
            (n, i) => ` A ${String(2 + i * 6).padStart(3, "0")} ${n}`,
          ),
          "",
        ]
        break
      case "LOAD": {
        const name = args[0]
        const text = filesRef.current[name]
        if (!text) {
          output = ["?FILE NOT FOUND"]
          break
        }
        const np = new Map<number, string>()
        for (const line of text.split("\n")) {
          const m = line.match(/^(\d+)\s*(.*)$/)
          if (m) np.set(parseInt(m[1], 10), m[2])
        }
        setProgram({ lines: np })
        output = [""]
        break
      }
      case "SAVE": {
        const name = args[0] || "PROGRAM"
        const lines = [...program.lines.keys()].sort((a, b) => a - b)
        filesRef.current[name] = lines.map((n) => `${n} ${program.lines.get(n)}`).join("\n")
        output = [""]
        break
      }
      case "PR#6":
        setDosMode(true)
        output = ["", "APPLE DOS 3.3", "", "BOOTING SLOT 6...", ""]
        break
      case "GAMES":
        output = GAMES_TEXT
        break
      case "HISTORY":
        output = HISTORY_TEXT
        break
      case "EXIT":
        onBack()
        return
      default:
        output = ["?SYNTAX ERROR"]
    }
    if (output.length) print(output)
  }

  const handleSubmit = () => {
    const value = input
    setInput("")
    cmdHistory.push(value)
    executeCommand(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
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
    <div className="min-h-screen text-[#33ff33] font-mono" onClick={() => inputRef.current?.focus()}>
      <CrtScreen>
        <StatusBar
          dosMode={dosMode}
          mode={mode}
          programLines={program.lines.size}
          color={color}
          hcolor={hcolor}
        />
        <BackButton onClick={onBack} />

        {mode !== "text" && (
          <div className="absolute inset-x-0 top-8 z-30 flex justify-center">
            <div className="bg-black border-2 border-green-800/40 p-2 mt-2">
              {mode === "lores" ? <LoresCanvas pixels={lores.pixels} /> : <HiresCanvas pixels={hires.pixels} />}
              <div className="text-center text-xs text-[#33ff33] mt-1">
                {mode === "lores" ? "LORES 40x48" : "HIRES 280x192"} - TYPE 'TEXT' TO RETURN
              </div>
            </div>
          </div>
        )}

        <div
          ref={terminalRef}
          className={`h-screen overflow-y-auto p-4 pt-10 pb-20 relative z-10 ${mode !== "text" ? "pt-[260px]" : ""}`}
          style={{ fontFamily: "'Apple2', 'Courier New', monospace" }}
        >
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap leading-relaxed uppercase tracking-wider">
              {line}
            </div>
          ))}

          <div className="flex uppercase">
            <span>]</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-[#33ff33] caret-[#33ff33] uppercase tracking-wider ml-1"
              autoFocus
            />
            <span className="animate-pulse">█</span>
          </div>
        </div>
      </CrtScreen>
    </div>
  )
}
