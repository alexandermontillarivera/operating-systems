"use client"

import { useCallback, useEffect, useState } from "react"
import type { FsNode, ViState } from "@/modules/bsd/types"
import { getNode, resolvePath, setFile } from "@/modules/bsd/lib/filesystem"

interface UseViOptions {
  fsRef: React.MutableRefObject<FsNode>
  cwd: string
  appendOutput: (lines: string[]) => void
}

/**
 * Modal vi editor hook. While `active`, captures global keydown events to
 * implement the normal/insert/command modes. Returns the current state plus
 * `open(filename)` to start an edit session.
 */
export function useViEditor({ fsRef, cwd, appendOutput }: UseViOptions) {
  const [state, setState] = useState<ViState | null>(null)

  const open = useCallback(
    (filename: string) => {
      const path = resolvePath(cwd, filename)
      const node = getNode(fsRef.current, path)
      let buffer: string[] = []
      if (node) {
        if (node.type === "dir") {
          appendOutput([`vi: ${filename}: is a directory`])
          return
        }
        buffer = node.content.split("\n")
      }
      if (buffer.length === 0) buffer = [""]
      setState({
        active: true,
        file: path,
        buffer,
        mode: "normal",
        row: 0,
        col: 0,
        cmdInput: "",
        message: filename + (node ? "" : " [New File]"),
        dirty: false,
      })
    },
    [appendOutput, cwd, fsRef],
  )

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!state) return
      e.preventDefault()
      const next: ViState = { ...state, buffer: [...state.buffer] }

      // ===== COMMAND MODE =====
      if (state.mode === "command") {
        if (e.key === "Enter") {
          const c = next.cmdInput.trim()
          if (c === "w") {
            setFile(fsRef.current, next.file, next.buffer.join("\n"))
            next.dirty = false
            next.message = `"${next.file}" ${next.buffer.length}L written`
          } else if (c === "q") {
            if (next.dirty) next.message = "E37: No write since last change"
            else {
              setState(null)
              return
            }
          } else if (c === "wq" || c === "x") {
            setFile(fsRef.current, next.file, next.buffer.join("\n"))
            setState(null)
            return
          } else if (c === "q!") {
            setState(null)
            return
          } else if (/^\d+$/.test(c)) {
            const n = parseInt(c, 10) - 1
            if (n >= 0 && n < next.buffer.length) {
              next.row = n
              next.col = 0
            }
          } else next.message = "E492: Not an editor command: " + c
          next.cmdInput = ""
          next.mode = "normal"
          setState(next)
          return
        }
        if (e.key === "Escape") {
          next.cmdInput = ""
          next.mode = "normal"
          setState(next)
          return
        }
        if (e.key === "Backspace") {
          next.cmdInput = next.cmdInput.slice(0, -1)
          if (next.cmdInput === "") next.mode = "normal"
          setState(next)
          return
        }
        if (e.key.length === 1) {
          next.cmdInput += e.key
          setState(next)
        }
        return
      }

      // ===== INSERT MODE =====
      if (state.mode === "insert") {
        if (e.key === "Escape") {
          next.mode = "normal"
          next.message = ""
          setState(next)
          return
        }
        if (e.key === "Enter") {
          const line = next.buffer[next.row]
          next.buffer[next.row] = line.slice(0, next.col)
          next.buffer.splice(next.row + 1, 0, line.slice(next.col))
          next.row += 1
          next.col = 0
          next.dirty = true
          setState(next)
          return
        }
        if (e.key === "Backspace") {
          if (next.col > 0) {
            const line = next.buffer[next.row]
            next.buffer[next.row] = line.slice(0, next.col - 1) + line.slice(next.col)
            next.col -= 1
            next.dirty = true
          } else if (next.row > 0) {
            const prev = next.buffer[next.row - 1]
            const cur = next.buffer[next.row]
            next.col = prev.length
            next.buffer[next.row - 1] = prev + cur
            next.buffer.splice(next.row, 1)
            next.row -= 1
            next.dirty = true
          }
          setState(next)
          return
        }
        if (e.key.length === 1) {
          const line = next.buffer[next.row]
          next.buffer[next.row] = line.slice(0, next.col) + e.key + line.slice(next.col)
          next.col += 1
          next.dirty = true
          setState(next)
        }
        return
      }

      // ===== NORMAL MODE =====
      switch (e.key) {
        case "i":
          next.mode = "insert"
          next.message = "-- INSERT --"
          break
        case "a":
          next.mode = "insert"
          next.col = Math.min(state.buffer[state.row].length, state.col + 1)
          next.message = "-- INSERT --"
          break
        case "o":
          next.mode = "insert"
          next.buffer.splice(next.row + 1, 0, "")
          next.row += 1
          next.col = 0
          next.dirty = true
          next.message = "-- INSERT --"
          break
        case "h":
        case "ArrowLeft":
          next.col = Math.max(0, state.col - 1)
          break
        case "l":
        case "ArrowRight":
          next.col = Math.min(state.buffer[state.row].length, state.col + 1)
          break
        case "j":
        case "ArrowDown":
          if (state.row < state.buffer.length - 1) {
            next.row = state.row + 1
            next.col = Math.min(next.col, state.buffer[next.row].length)
          }
          break
        case "k":
        case "ArrowUp":
          if (state.row > 0) {
            next.row = state.row - 1
            next.col = Math.min(next.col, state.buffer[next.row].length)
          }
          break
        case "0":
          next.col = 0
          break
        case "$":
          next.col = state.buffer[state.row].length
          break
        case "G":
          next.row = state.buffer.length - 1
          next.col = 0
          break
        case "x":
          if (state.col < state.buffer[state.row].length) {
            const line = state.buffer[state.row]
            next.buffer[state.row] = line.slice(0, state.col) + line.slice(state.col + 1)
            next.dirty = true
          }
          break
        case "d":
          // Simplified dd: single 'd' deletes the current line
          if (state.buffer.length > 1) {
            next.buffer.splice(state.row, 1)
            if (next.row >= next.buffer.length) next.row = next.buffer.length - 1
          } else next.buffer[0] = ""
          next.dirty = true
          break
        case ":":
          next.mode = "command"
          next.cmdInput = ""
          next.message = ""
          break
        case "Escape":
          next.message = ""
          break
        default:
          break
      }
      setState(next)
    },
    [state, fsRef],
  )

  useEffect(() => {
    if (!state?.active) return
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [state?.active, onKey])

  return { state, active: state?.active ?? false, open }
}
