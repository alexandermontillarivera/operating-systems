"use client"

import { useCallback, useState } from "react"
import type { BasicState } from "@/modules/cpm/types"
import { runBasic } from "@/modules/cpm/lib/basic"

interface UseMBasicOptions {
  appendLines: (lines: string[]) => void
}

export function useMBasic({ appendLines }: UseMBasicOptions) {
  const [state, setState] = useState<BasicState | null>(null)

  const start = useCallback(() => {
    setState({ active: true, program: new Map() })
    appendLines([
      "",
      "MICROSOFT MBASIC VERSION 5.21",
      "(C) COPYRIGHT 1981 BY MICROSOFT",
      "32766 BYTES FREE",
      "TYPE LINE NUMBERS, THEN RUN. SYSTEM TO EXIT.",
      "",
      "OK",
    ])
  }, [appendLines])

  const feed = useCallback(
    (line: string) => {
      setState((current) => {
        if (!current) return current
        const t = line.trim()
        appendLines([`OK ${line.toUpperCase()}`])

        if (t.toUpperCase() === "SYSTEM" || t.toUpperCase() === "BYE") {
          return null
        }
        if (t.toUpperCase() === "LIST") {
          const lines = [...current.program.keys()].sort((a, b) => a - b)
          appendLines(lines.map((n) => `${n} ${current.program.get(n)}`))
          return current
        }
        if (t.toUpperCase() === "RUN") {
          appendLines(runBasic(current.program))
          return current
        }
        if (t.toUpperCase() === "NEW") {
          return { ...current, program: new Map() }
        }
        const m = t.match(/^(\d+)\s*(.*)$/)
        if (m) {
          const ln = parseInt(m[1], 10)
          const stmt = m[2]
          const np = new Map(current.program)
          if (!stmt) np.delete(ln)
          else np.set(ln, stmt)
          return { ...current, program: np }
        }
        appendLines(["?SYNTAX ERROR"])
        return current
      })
    },
    [appendLines],
  )

  return { state, active: state?.active ?? false, start, feed }
}
