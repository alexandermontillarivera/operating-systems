"use client"

import { useCallback, useRef, useState } from "react"
import type { AppId, Win31WindowState } from "@/modules/win31/types"

interface OpenOpts {
  width?: number
  height?: number
}

export function useWindowManager() {
  const [windows, setWindows] = useState<Win31WindowState[]>([
    {
      id: "progman",
      title: "Program Manager",
      app: "main-group",
      x: 60,
      y: 30,
      width: 620,
      height: 380,
      minimized: false,
      zIndex: 100,
    },
  ])
  const [activeId, setActiveId] = useState<string | null>("progman")
  const zCounter = useRef(101)
  const nextZ = () => ++zCounter.current

  const openApp = useCallback(
    (id: string, title: string, app: AppId, opts?: OpenOpts) => {
      setWindows((prev) => {
        const ex = prev.find((w) => w.id === id)
        if (ex) return prev.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: nextZ() } : w))
        return [
          ...prev,
          {
            id,
            title,
            app,
            x: 100 + (prev.length * 25) % 200,
            y: 80 + (prev.length * 20) % 100,
            width: opts?.width ?? 460,
            height: opts?.height ?? 320,
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
