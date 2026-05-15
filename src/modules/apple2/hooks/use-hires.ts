"use client"

import { useCallback, useState } from "react"
import { HIRES_H, HIRES_W } from "@/modules/apple2/lib/palettes"

/** HIRES (280x192) pixel buffer with HPLOT line drawing (Bresenham). */
export function useHires() {
  const [pixels, setPixels] = useState<number[]>(() => new Array(HIRES_W * HIRES_H).fill(0))

  const clear = useCallback(() => setPixels(new Array(HIRES_W * HIRES_H).fill(0)), [])

  const hplotLine = useCallback((x1: number, y1: number, x2: number, y2: number, c: number) => {
    setPixels((pix) => {
      const np = [...pix]
      const dx = Math.abs(x2 - x1)
      const dy = Math.abs(y2 - y1)
      const sx = x1 < x2 ? 1 : -1
      const sy = y1 < y2 ? 1 : -1
      let err = dx - dy
      let x = x1
      let y = y1
      while (true) {
        if (x >= 0 && x < HIRES_W && y >= 0 && y < HIRES_H) np[y * HIRES_W + x] = c
        if (x === x2 && y === y2) break
        const e2 = 2 * err
        if (e2 > -dy) {
          err -= dy
          x += sx
        }
        if (e2 < dx) {
          err += dx
          y += sy
        }
      }
      return np
    })
  }, [])

  return { pixels, clear, hplotLine }
}
