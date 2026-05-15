"use client"

import { useCallback, useRef, useState } from "react"
import type { AppId, SnapMode, Win7WindowState } from "@/modules/win7/types"

interface OpenOpts {
  width?: number
  height?: number
}

export function useWindowManager() {
  const [windows, setWindows] = useState<Win7WindowState[]>([])
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
            x: 100 + (prev.length * 30) % 200,
            y: 60 + (prev.length * 20) % 100,
            width: opts?.width ?? 600,
            height: opts?.height ?? 400,
            minimized: false,
            maximized: false,
            snap: "none",
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

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized, snap: "none" } : w)),
    )
  }, [])

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: nextZ() } : w)))
    setActiveId(id)
  }, [])

  const snapWindow = useCallback((id: string, mode: SnapMode) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, snap: mode, maximized: mode === "max" } : w)))
  }, [])

  const showDesktop = useCallback(() => {
    setWindows((prev) => {
      const allMin = prev.every((w) => w.minimized)
      return prev.map((w) => ({ ...w, minimized: !allMin }))
    })
  }, [])

  return {
    windows,
    activeId,
    openApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    snapWindow,
    showDesktop,
  }
}
