"use client"

import { useState, useCallback, useRef } from "react"
import type { AppId, Win95WindowState } from "@/modules/win95/types"

interface OpenOpts {
  width?: number
  height?: number
  x?: number
  y?: number
}

export function useWindowManager() {
  const [windows, setWindows] = useState<Win95WindowState[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const zCounter = useRef(100)

  const nextZ = () => ++zCounter.current

  const openApp = useCallback(
    (id: string, title: string, app: AppId, data?: unknown, opts?: OpenOpts) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id)
        if (existing) {
          return prev.map((w) =>
            w.id === id ? { ...w, minimized: false, zIndex: nextZ() } : w,
          )
        }
        return [
          ...prev,
          {
            id,
            title,
            app,
            data,
            x: opts?.x ?? 60 + (prev.length * 30) % 220,
            y: opts?.y ?? 40 + (prev.length * 20) % 100,
            width: opts?.width ?? 540,
            height: opts?.height ?? 380,
            minimized: false,
            zIndex: nextZ(),
          },
        ]
      })
      setActiveId(id)
    },
    [],
  )

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
    setActiveId((cur) => (cur === id ? null : cur))
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
  }, [])

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: nextZ() } : w)),
    )
    setActiveId(id)
  }, [])

  const toggleMinimize = useCallback(
    (id: string) => {
      const w = windows.find((x) => x.id === id)
      if (!w) return
      if (w.minimized || activeId !== id) focusWindow(id)
      else minimizeWindow(id)
    },
    [windows, activeId, focusWindow, minimizeWindow],
  )

  return {
    windows,
    activeId,
    openApp,
    closeWindow,
    minimizeWindow,
    focusWindow,
    toggleMinimize,
  }
}
