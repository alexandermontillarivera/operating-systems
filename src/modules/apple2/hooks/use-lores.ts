"use client"

import { useCallback, useState } from "react"
import { LORES_H, LORES_W } from "@/modules/apple2/lib/palettes"

/** LORES (40x48) pixel buffer with PLOT/HLIN/VLIN ops. */
export function useLores() {
  const [pixels, setPixels] = useState<number[]>(() => new Array(LORES_W * LORES_H).fill(0))

  const clear = useCallback(() => setPixels(new Array(LORES_W * LORES_H).fill(0)), [])

  const plot = useCallback((x: number, y: number, c: number) => {
    if (x < 0 || x >= LORES_W || y < 0 || y >= LORES_H) return
    setPixels((p) => {
      const np = [...p]
      np[y * LORES_W + x] = c
      return np
    })
  }, [])

  const hlin = useCallback((x1: number, x2: number, y: number, c: number) => {
    if (y < 0 || y >= LORES_H) return
    setPixels((p) => {
      const np = [...p]
      const lo = Math.max(0, Math.min(x1, x2))
      const hi = Math.min(LORES_W - 1, Math.max(x1, x2))
      for (let x = lo; x <= hi; x++) np[y * LORES_W + x] = c
      return np
    })
  }, [])

  const vlin = useCallback((y1: number, y2: number, x: number, c: number) => {
    if (x < 0 || x >= LORES_W) return
    setPixels((p) => {
      const np = [...p]
      const lo = Math.max(0, Math.min(y1, y2))
      const hi = Math.min(LORES_H - 1, Math.max(y1, y2))
      for (let y = lo; y <= hi; y++) np[y * LORES_W + x] = c
      return np
    })
  }, [])

  return { pixels, clear, plot, hlin, vlin }
}
