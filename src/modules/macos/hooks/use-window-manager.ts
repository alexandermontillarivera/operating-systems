"use client"

import { useCallback, useRef, useState } from "react"
import type { AppId, MacOSWindowState } from "@/modules/macos/types"

interface OpenOpts {
  width?: number
  height?: number
}

export function useWindowManager() {
  const [windows, setWindows] = useState<MacOSWindowState[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const zCounter = useRef(100)
  const nextZ = () => ++zCounter.current

  const openApp = useCallback(
    (id: string, title: string, app: AppId, data?: unknown, opts?: OpenOpts) => {
      setWindows((prev) => {
        const ex = prev.find((w) => w.id === id)
        if (ex) return prev.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: nextZ() } : w))
        return [
          ...prev,
          {
            id,
            title,
            app,
            data,
            x: 120 + (prev.length * 30) % 200,
            y: 50 + (prev.length * 20) % 100,
            width: opts?.width ?? 700,
            height: opts?.height ?? 460,
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
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: nextZ() } : w)))
    setActiveId(id)
  }, [])

  return { windows, activeId, openApp, closeWindow, minimizeWindow, focusWindow }
}
