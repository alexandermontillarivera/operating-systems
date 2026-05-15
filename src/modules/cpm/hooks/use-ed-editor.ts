"use client"

import { useCallback, useState } from "react"
import type { Drive, EdState } from "@/modules/cpm/types"
import type { Files } from "@/modules/cpm/lib/filesystem"
import { parseRef } from "@/modules/cpm/lib/filesystem"

interface UseEdOptions {
  filesRef: React.MutableRefObject<Files>
  drive: Drive
  prompt: string
  appendLines: (lines: string[]) => void
}

export function useEdEditor({ filesRef, drive, prompt, appendLines }: UseEdOptions) {
  const [state, setState] = useState<EdState | null>(null)

  const open = useCallback(
    (target: string) => {
      const { d, name } = parseRef(target, drive)
      const existing = filesRef.current[d][name]
      const buffer = existing ? existing.split("\n") : []
      setState({
        active: true,
        drive: d,
        filename: name,
        buffer,
        mode: "command",
        insertAt: buffer.length,
        currentLine: buffer.length,
        dirty: false,
      })
      appendLines([`${prompt}ED ${target.toUpperCase()}`, existing ? `: *` : `NEW FILE`])
    },
    [appendLines, drive, filesRef, prompt],
  )

  const feed = useCallback(
    (line: string) => {
      setState((current) => {
        if (!current) return current
        const next: EdState = { ...current, buffer: [...current.buffer] }

        if (current.mode === "insert") {
          if (line === "") {
            next.mode = "command"
            next.currentLine = next.insertAt
            appendLines([""])
            return next
          }
          next.buffer.splice(next.insertAt, 0, line)
          next.insertAt += 1
          next.dirty = true
          appendLines([`   ${String(next.insertAt).padStart(3)}: ${line}`])
          return next
        }

        appendLines([`*${line.toUpperCase()}`])
        const t = line.trim().toUpperCase()

        if (t === "E") {
          filesRef.current[next.drive][next.filename] = next.buffer.join("\n")
          appendLines(["FILE SAVED."])
          return null
        }
        if (t === "Q" || t === "QUIT") {
          if (next.dirty) {
            appendLines(["? FILE IS DIRTY - USE Q TO ABANDON OR E TO SAVE"])
            next.dirty = false
            return next
          }
          return null
        }
        if (t === "I") {
          next.mode = "insert"
          appendLines(["*INSERT MODE - EMPTY LINE TO EXIT"])
          return next
        }
        if (t === "A" || t === "APPEND") {
          next.mode = "insert"
          next.insertAt = next.buffer.length
          appendLines(["*APPEND MODE - EMPTY LINE TO EXIT"])
          return next
        }
        if (t === "T" || t === "TYPE" || t === "L") {
          appendLines(next.buffer.map((b, i) => `${String(i + 1).padStart(3)}: ${b}`))
          return next
        }
        if (/^\d+$/.test(t)) {
          const n = parseInt(t, 10)
          if (n >= 1 && n <= next.buffer.length) {
            next.currentLine = n
            next.insertAt = n - 1
            appendLines([`${String(n).padStart(3)}: ${next.buffer[n - 1]}`])
          } else appendLines(["? OUT OF RANGE"])
          return next
        }
        if (t === "D") {
          if (next.currentLine < 1 || next.currentLine > next.buffer.length) {
            appendLines(["?"])
            return next
          }
          next.buffer.splice(next.currentLine - 1, 1)
          next.dirty = true
          return next
        }
        if (t === "H" || t === "?") {
          appendLines([
            "ED COMMANDS:",
            "  I = INSERT MODE       A = APPEND MODE",
            "  T = TYPE BUFFER       N = GO TO LINE N",
            "  D = DELETE LINE       E = EXIT (SAVE)",
            "  Q = QUIT (NO SAVE)",
          ])
          return next
        }
        appendLines(["?"])
        return next
      })
    },
    [appendLines, filesRef],
  )

  return {
    state,
    active: state?.active ?? false,
    open,
    feed,
  }
}
