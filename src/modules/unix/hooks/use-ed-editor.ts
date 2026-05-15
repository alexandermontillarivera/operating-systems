"use client"

import { useCallback, useState } from "react"
import type { EdState, FsNode } from "@/modules/unix/types"
import { getNode, resolvePath, setFile } from "@/modules/unix/lib/filesystem"

interface UseEdOptions {
  fsRef: React.MutableRefObject<FsNode>
  cwd: string
  prompt: string
  appendLines: (lines: string[]) => void
  onCommand: (line: string) => void
}

/**
 * Hook that owns the `ed` line editor state and exposes:
 *  - state          → current editor state (or null when not editing)
 *  - openEditor()   → start editing a file (writes header to terminal)
 *  - feedInput()    → process the next typed line
 *  - active         → true when ed has the keyboard focus
 */
export function useEdEditor({ fsRef, cwd, prompt, appendLines }: UseEdOptions) {
  const [state, setState] = useState<EdState | null>(null)

  const openEditor = useCallback(
    (filename: string) => {
      const fullPath = resolvePath(cwd, filename)
      const node = getNode(fsRef.current, fullPath)
      let buffer: string[] = []
      let bytesMsg = "?"
      if (node) {
        if (node.type === "dir") {
          appendLines([`${prompt}ed ${filename}`, `${filename}: directory`])
          return
        }
        buffer = node.content.split("\n")
        bytesMsg = String(node.content.length)
      }
      setState({
        active: true,
        file: fullPath,
        buffer,
        mode: "command",
        insertAfter: buffer.length,
        currentLine: buffer.length,
        dirty: false,
      })
      appendLines([`${prompt}ed ${filename}`, bytesMsg])
    },
    [appendLines, cwd, fsRef, prompt],
  )

  const feedInput = useCallback(
    (line: string) => {
      setState((current) => {
        if (!current) return current
        const next: EdState = { ...current, buffer: [...current.buffer] }

        // INSERT MODE
        if (current.mode === "insert") {
          if (line === ".") {
            next.mode = "command"
            next.currentLine = next.insertAfter
            appendLines([line])
            return next
          }
          next.buffer.splice(next.insertAfter, 0, line)
          next.insertAfter += 1
          next.dirty = true
          appendLines([line])
          return next
        }

        // COMMAND MODE
        appendLines([line])
        const trimmed = line.trim()

        if (trimmed === "q") {
          if (next.dirty) {
            appendLines(["?"])
            return next
          }
          return null
        }
        if (trimmed === "Q") return null
        if (trimmed === "w") {
          const ok = setFile(fsRef.current, next.file, next.buffer.join("\n"))
          if (!ok) {
            appendLines(["?"])
            return next
          }
          next.dirty = false
          appendLines([String(next.buffer.join("\n").length)])
          return next
        }
        if (trimmed === "wq") {
          const ok = setFile(fsRef.current, next.file, next.buffer.join("\n"))
          if (!ok) {
            appendLines(["?"])
            return next
          }
          appendLines([String(next.buffer.join("\n").length)])
          return null
        }
        if (trimmed === "a") {
          next.mode = "insert"
          return next
        }
        if (trimmed === "i") {
          next.mode = "insert"
          next.insertAfter = Math.max(next.currentLine - 1, 0)
          return next
        }
        if (trimmed === "p" || trimmed === ",p" || trimmed === "1,$p") {
          const lines = trimmed === "p" ? [next.buffer[next.currentLine - 1] ?? ""] : next.buffer
          appendLines(lines)
          return next
        }
        if (trimmed === "=") {
          appendLines([String(next.buffer.length)])
          return next
        }
        if (/^\d+$/.test(trimmed)) {
          const n = parseInt(trimmed, 10)
          if (n < 1 || n > next.buffer.length) {
            appendLines(["?"])
            return next
          }
          next.currentLine = n
          appendLines([next.buffer[n - 1]])
          return next
        }
        if (trimmed === "d") {
          if (next.currentLine < 1 || next.currentLine > next.buffer.length) {
            appendLines(["?"])
            return next
          }
          next.buffer.splice(next.currentLine - 1, 1)
          next.dirty = true
          return next
        }
        if (trimmed === "h" || trimmed === "?") {
          appendLines([
            "ed commands:  a)ppend  i)nsert  p)rint  d)elete  =  w)rite  q)uit  N)goto",
          ])
          return next
        }
        appendLines(["?"])
        return next
      })
    },
    [appendLines, fsRef],
  )

  return {
    state,
    active: state?.active ?? false,
    openEditor,
    feedInput,
  }
}
