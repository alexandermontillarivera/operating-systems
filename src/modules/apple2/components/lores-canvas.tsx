"use client"

import { useEffect, useRef } from "react"
import { LORES_COLORS, LORES_H, LORES_W } from "@/modules/apple2/lib/palettes"

interface LoresCanvasProps {
  pixels: number[]
}

const SCALE = 6

export function LoresCanvas({ pixels }: LoresCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext("2d")
    if (!ctx) return
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, c.width, c.height)
    for (let y = 0; y < LORES_H; y++) {
      for (let x = 0; x < LORES_W; x++) {
        const v = pixels[y * LORES_W + x]
        if (v) {
          ctx.fillStyle = LORES_COLORS[v]
          ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE)
        }
      }
    }
  }, [pixels])
  return <canvas ref={canvasRef} width={LORES_W * SCALE} height={LORES_H * SCALE} className="block" />
}
