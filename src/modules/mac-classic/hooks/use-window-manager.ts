"use client"

import { useCallback, useRef, useState } from "react"
import type { AppId, MacWindowState } from "@/modules/mac-classic/types"

interface OpenOpts {
  width?: number
  height?: number
}

export function useWindowManager() {
  const [windows, setWindows] = useState<MacWindowState[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const zCounter = useRef(100)

  const nextZ = () => ++zCounter.current

  const openApp = useCallback(
    (id: string, title: string, app: AppId, data?: unknown, opts?: OpenOpts) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id)
        if (existing) return prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ() } : w))
        return [
          ...prev,
          {
            id,
            title,
            app,
            data,
            x: 80 + (prev.length * 30) % 200,
            y: 50 + (prev.length * 20) % 100,
            width: opts?.width ?? 480,
            height: opts?.height ?? 340,
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

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ() } : w)))
    setActiveId(id)
  }, [])

  return { windows, activeId, openApp, closeWindow, focusWindow }
}
