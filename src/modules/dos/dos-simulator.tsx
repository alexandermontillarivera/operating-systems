"use client"

import { motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import type { DirEntry, Drive, EditState, FileEntry, FsEntry } from "@/modules/dos/types"
import { initialFs, navigate } from "@/modules/dos/lib/filesystem"
import { HELP_TEXT, HISTORY_TEXT, MEM_TEXT } from "@/modules/dos/lib/help-texts"
import { useCommandHistory } from "@/modules/dos/hooks/use-command-history"
import { useSnake } from "@/modules/dos/hooks/use-snake"
import { CrtScreen } from "@/modules/dos/components/crt-screen"
import { BackButton } from "@/modules/dos/components/back-button"
import { DOSEditor } from "@/modules/dos/apps/editor"
import { DOSSnake } from "@/modules/dos/apps/snake"

interface DOSSimulatorProps {
  onBack: () => void
}

export function DOSSimulator({ onBack }: DOSSimulatorProps) {
  const fsRef = useRef(initialFs())
  const [drive, setDrive] = useState<Drive>("C")
  const [path, setPath] = useState<string[]>([])
  const [lines, setLines] = useState<string[]>([
    "Microsoft(R) MS-DOS(R) Version 6.22",
    "(C)Copyright Microsoft Corp 1981-1994.",
    "",
    'Type "HELP" for commands, "EDIT" for the editor, "SNAKE" to play.',
    "",
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [edit, setEdit] = useState<EditState | null>(null)
  const snake = useSnake()
  const cmdHistory = useCommandHistory()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => inputRef.current?.focus(), [edit, snake.active])

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [lines])

  const cwd = useCallback(() => `${drive}:\\${path.join("\\")}${path.length ? "" : ""}`, [drive, path])
  const promptStr = () => `${cwd()}>`

  const print = (text: string | string[]) =>
    setLines((prev) => [...prev, ...(Array.isArray(text) ? text : [text])])

  const executeCommand = useCallback(
    (input: string) => {
      const trimmed = input.trim()
      print(`${promptStr()}${trimmed}`)
      if (!trimmed) return

      if (/^[ACD]:$/i.test(trimmed)) {
        const d = trimmed[0].toUpperCase() as Drive
        if (d === "A" || d === "C") {
          setDrive(d)
          setPath([])
        }
        return
      }

      const parts = trimmed.split(/\s+/)
      const command = parts[0].toUpperCase()
      const args = parts.slice(1)
      const root = fsRef.current[drive]
      const cwdNode = navigate(root, path)
      const cwdDir = cwdNode?.type === "dir" ? cwdNode : null

      switch (command) {
        case "HELP":
          print(HELP_TEXT)
          break
        case "VER":
          print(["", "MS-DOS Version 6.22", ""])
          break
        case "DATE":
          print([new Date().toLocaleDateString("es-ES")])
          break
        case "TIME":
          print([new Date().toLocaleTimeString("es-ES")])
          break
        case "ECHO":
          print([args.join(" ")])
          break
        case "CLS":
          setLines([])
          return

        case "DIR": {
          if (!cwdDir) {
            print(["Invalid directory"])
            break
          }
          const wide = args.includes("/W")
          const entries = Object.entries(cwdDir.children)
          const out: string[] = [
            "",
            ` Volumen en unidad ${drive} es ${drive === "C" ? "DOS" : "FLOPPY"}`,
            ` Directorio de ${cwd()}`,
            "",
          ]
          if (entries.length === 0) out.push(" El directorio esta vacio.")
          else if (wide) {
            const names = entries.map(([n, e]) => (e.type === "dir" ? `[${n}]` : n))
            for (let i = 0; i < names.length; i += 5) {
              out.push("  " + names.slice(i, i + 5).map((n) => n.padEnd(15)).join(""))
            }
          } else {
            for (const [name, e] of entries) {
              if (e.type === "dir") {
                out.push(`${name.padEnd(13)}<DIR>          06-10-94   6:22a`)
              } else {
                const [base, ext = ""] = name.split(".")
                out.push(
                  `${base.padEnd(8)} ${ext.padEnd(3)} ${String(e.size).padStart(10)} 06-10-94   6:22a`,
                )
              }
            }
          }
          const totalFiles = entries.filter((e) => e[1].type === "file").length
          const totalDirs = entries.filter((e) => e[1].type === "dir").length
          const totalBytes = entries
            .filter((e) => e[1].type === "file")
            .reduce((s, [, e]) => s + (e as FileEntry).size, 0)
          out.push("")
          out.push(
            `         ${String(totalFiles).padStart(2)} archivo(s) ${String(totalBytes).padStart(10)} bytes`,
          )
          out.push(
            `         ${String(totalDirs).padStart(2)} directorio(s)   12,345,678 bytes libres`,
          )
          out.push("")
          print(out)
          break
        }

        case "CD":
        case "CHDIR": {
          if (args.length === 0) {
            print([cwd()])
            break
          }
          const arg = args[0]
          if (arg === "..") {
            setPath((p) => p.slice(0, -1))
            break
          }
          if (arg === "\\") {
            setPath([])
            break
          }
          const argParts = arg.split("\\").filter(Boolean)
          const target = arg.startsWith("\\") ? argParts : [...path, ...argParts]
          const node = navigate(root, target)
          if (!node || node.type !== "dir") {
            print(["Directorio invalido"])
            break
          }
          setPath(target.map((p) => p.toUpperCase()))
          break
        }

        case "MD":
        case "MKDIR": {
          if (!cwdDir || !args[0]) {
            print(["Sintaxis incorrecta"])
            break
          }
          const name = args[0].toUpperCase()
          if (cwdDir.children[name]) {
            print(["Ya existe"])
            break
          }
          cwdDir.children[name] = { type: "dir", children: {} }
          break
        }

        case "RD":
        case "RMDIR": {
          if (!cwdDir || !args[0]) {
            print(["Sintaxis incorrecta"])
            break
          }
          const name = Object.keys(cwdDir.children).find(
            (k) => k.toUpperCase() === args[0].toUpperCase(),
          )
          if (!name) {
            print(["No se encuentra el directorio"])
            break
          }
          const e = cwdDir.children[name]
          if (e.type !== "dir") {
            print(["No es un directorio"])
            break
          }
          if (Object.keys(e.children).length > 0) {
            print(["El directorio no esta vacio"])
            break
          }
          delete cwdDir.children[name]
          break
        }

        case "DEL":
        case "ERASE": {
          if (!cwdDir || !args[0]) {
            print(["Sintaxis incorrecta"])
            break
          }
          const name = Object.keys(cwdDir.children).find(
            (k) => k.toUpperCase() === args[0].toUpperCase(),
          )
          if (!name || cwdDir.children[name].type !== "file") {
            print(["No se encuentra el archivo"])
            break
          }
          delete cwdDir.children[name]
          break
        }

        case "REN":
        case "RENAME": {
          if (!cwdDir || args.length < 2) {
            print(["Sintaxis: REN viejo nuevo"])
            break
          }
          const old = Object.keys(cwdDir.children).find(
            (k) => k.toUpperCase() === args[0].toUpperCase(),
          )
          if (!old) {
            print(["No se encuentra"])
            break
          }
          cwdDir.children[args[1].toUpperCase()] = cwdDir.children[old]
          delete cwdDir.children[old]
          break
        }

        case "COPY": {
          if (!cwdDir || args.length < 2) {
            print(["Sintaxis: COPY origen destino"])
            break
          }
          const srcName = Object.keys(cwdDir.children).find(
            (k) => k.toUpperCase() === args[0].toUpperCase(),
          )
          if (!srcName || cwdDir.children[srcName].type !== "file") {
            print(["No se encuentra"])
            break
          }
          const src = cwdDir.children[srcName] as FileEntry
          cwdDir.children[args[1].toUpperCase()] = { ...src }
          print([`        1 archivo(s) copiado(s)`])
          break
        }

        case "TYPE": {
          if (!cwdDir || !args[0]) {
            print(["Sintaxis incorrecta"])
            break
          }
          const name = Object.keys(cwdDir.children).find(
            (k) => k.toUpperCase() === args[0].toUpperCase(),
          )
          if (!name) {
            print([`Archivo no encontrado - ${args[0]}`])
            break
          }
          const e = cwdDir.children[name]
          if (e.type !== "file") {
            print(["No es un archivo"])
            break
          }
          print(e.content.split("\n"))
          break
        }

        case "TREE": {
          const out: string[] = ["", `Listado de subdirectorios de ${cwd()}`, ""]
          const walk = (node: DirEntry, prefix: string) => {
            const dirs = Object.entries(node.children).filter(([, e]) => e.type === "dir")
            dirs.forEach(([name, e], i) => {
              const last = i === dirs.length - 1
              out.push(prefix + (last ? "+---" : "+---") + name)
              walk(e as DirEntry, prefix + (last ? "    " : "|   "))
            })
          }
          walk(root, "")
          print(out)
          break
        }

        case "MEM":
          print(MEM_TEXT)
          break

        case "EDIT":
          setEdit({
            active: true,
            drive,
            path,
            filename: (args[0] || "UNTITLED.TXT").toUpperCase(),
            text:
              args[0] && cwdDir
                ? ((Object.entries(cwdDir.children).find(
                    ([k]) => k.toUpperCase() === args[0].toUpperCase(),
                  )?.[1] as FileEntry | undefined)?.content ?? "")
                : "",
          })
          return

        case "SNAKE":
          snake.start()
          return

        case "HISTORY":
          print(HISTORY_TEXT)
          break

        case "EXIT":
          onBack()
          return

        default:
          print(["Comando o nombre de archivo incorrecto."])
      }
    },
    [drive, path, cwd, onBack, snake],
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const v = currentInput
      setCurrentInput("")
      cmdHistory.push(v)
      executeCommand(v)
      return
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setCurrentInput((curr) => cmdHistory.recallPrevious(curr))
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setCurrentInput(cmdHistory.recallNext())
    }
  }

  if (edit?.active) {
    return (
      <DOSEditor
        state={edit}
        onSave={(text) => {
          const root = fsRef.current[edit.drive]
          const dir = navigate(root, edit.path)
          if (dir && dir.type === "dir") {
            const entry: FsEntry = { type: "file", content: text, size: text.length }
            dir.children[edit.filename] = entry
          }
          print([`File ${edit.filename} saved.`])
        }}
        onExit={() => setEdit(null)}
      />
    )
  }

  if (snake.active && snake.state) {
    return (
      <DOSSnake
        state={snake.state}
        onSetDir={snake.setDir}
        onExit={snake.stop}
        onRestart={snake.restart}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black p-4 flex flex-col"
    >
      <CrtScreen>
        <div
          ref={containerRef}
          onClick={() => inputRef.current?.focus()}
          className="h-full min-h-[80vh] bg-black p-4 overflow-y-auto cursor-text font-mono text-green-400 text-sm md:text-base"
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap leading-relaxed">
              {line}
            </div>
          ))}

          <div className="flex items-center">
            <span>
              {cwd()}
              {">"}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-green-400 font-mono ml-1 caret-green-400"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </CrtScreen>

      <BackButton onClick={onBack} />
    </motion.div>
  )
}
