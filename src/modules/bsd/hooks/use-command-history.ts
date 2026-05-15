"use client"

import { useCallback, useState } from "react"

export function useCommandHistory() {
  const [history, setHistory] = useState<string[]>([])
  const [index, setIndex] = useState(-1)

  const push = useCallback((cmd: string) => {
    if (!cmd.trim()) return
    setHistory((h) => [...h, cmd])
    setIndex(-1)
  }, [])

  const recallPrevious = useCallback(
    (current: string): string => {
      if (history.length === 0) return current
      const ni = index < history.length - 1 ? index + 1 : index
      setIndex(ni)
      return history[history.length - 1 - ni] ?? current
    },
    [history, index],
  )

  const recallNext = useCallback((): string => {
    if (index <= 0) {
      setIndex(-1)
      return ""
    }
    const ni = index - 1
    setIndex(ni)
    return history[history.length - 1 - ni] ?? ""
  }, [history, index])

  return { push, recallPrevious, recallNext }
}
