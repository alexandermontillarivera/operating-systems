"use client"

import { useCallback, useEffect, useState } from "react"
import type { Pane, PaneType, SplitMode } from "@/modules/arch/types"

let nextId = 1

const initialPane = (): Pane => ({
  id: nextId++,
  type: "terminal",
  title: "alacritty: ~",
  workspace: 1,
})

/**
 * Manages i3-style panes & workspaces. Listens for Alt-modified shortcuts
 * (Alt is used as Mod since Super is captured by the browser).
 */
export function usePanes() {
  const [panes, setPanes] = useState<Pane[]>(() => [initialPane()])
  const [workspace, setWorkspace] = useState(1)
  const [focusId, setFocusId] = useState(1)
  const [splitMode, setSplitMode] = useState<SplitMode>("h")

  const openPane = useCallback(
    (type: PaneType, title: string) => {
      const id = nextId++
      setPanes((p) => [...p, { id, type, title, workspace }])
      setFocusId(id)
    },
    [workspace],
  )

  const closePane = useCallback((id: number) => {
    setPanes((p) => p.filter((x) => x.id !== id))
  }, [])

  // i3 keybindings (Alt as Mod)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey) return
      if (e.key === "Enter") {
        e.preventDefault()
        openPane("terminal", "alacritty: ~")
      } else if (e.key >= "1" && e.key <= "9") {
        e.preventDefault()
        setWorkspace(parseInt(e.key, 10))
      } else if (e.key === "h") {
        e.preventDefault()
        setSplitMode("h")
      } else if (e.key === "v") {
        e.preventDefault()
        setSplitMode("v")
      } else if (e.key === "q") {
        e.preventDefault()
        closePane(focusId)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [focusId, openPane, closePane])

  const visible = panes.filter((p) => p.workspace === workspace)
  const usedWorkspaces = new Set(panes.map((p) => p.workspace))

  return {
    panes,
    visible,
    workspace,
    setWorkspace,
    splitMode,
    setSplitMode,
    focusId,
    setFocusId,
    openPane,
    closePane,
    usedWorkspaces,
  }
}
