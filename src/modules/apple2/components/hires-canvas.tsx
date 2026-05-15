"use client"

import { useEffect, useRef } from "react"
import { HIRES_COLORS, HIRES_H, HIRES_W } from "@/modules/apple2/lib/palettes"

interface HiresCanvasProps {
  pixels: number[]
}

const SCALE = 1.4

export function HiresCanvas({ pixels }: HiresCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext("2d")
    if (!ctx) return
    const img = ctx.createImageData(HIRES_W, HIRES_H)
    for (let i = 0; i < HIRES_W * HIRES_H; i++) {
      const v = pixels[i]
      const col = HIRES_COLORS[v] || "#000"
      img.data[i * 4] = parseInt(col.slice(1, 3), 16)
      img.data[i * 4 + 1] = parseInt(col.slice(3, 5), 16)
      img.data[i * 4 + 2] = parseInt(col.slice(5, 7), 16)
      img.data[i * 4 + 3] = 255
    }
    const tmp = document.createElement("canvas")
    tmp.width = HIRES_W
    tmp.height = HIRES_H
    tmp.getContext("2d")!.putImageData(img, 0, 0)
    ctx.imageSmoothingEnabled = false
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.drawImage(tmp, 0, 0, c.width, c.height)
  }, [pixels])
  return (
    <canvas
      ref={canvasRef}
      width={HIRES_W * SCALE}
      height={HIRES_H * SCALE}
      className="block"
      style={{ imageRendering: "pixelated" }}
    />
  )
}
