"use client"

import { useEffect, useRef, useState } from "react"

const COLORS = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
  "#FF00FF", "#00FFFF", "#808080", "#800000", "#008000", "#000080",
]

export function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState("#000000")
  const [size, setSize] = useState(4)
  const [drawing, setDrawing] = useState(false)
  const last = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext("2d")!
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, c.width, c.height)
  }, [])

  const pos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!
    const r = c.getBoundingClientRect()
    return {
      x: ((e.clientX - r.left) / r.width) * c.width,
      y: ((e.clientY - r.top) / r.height) * c.height,
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 text-black">
      <div className="bg-white border-b border-blue-300 p-2 flex items-center gap-2">
        <div className="grid grid-cols-6 gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-4 h-4 border ${color === c ? "ring-2 ring-blue-500" : "border-gray-400"}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <input type="range" min="1" max="20" value={size} onChange={(e) => setSize(+e.target.value)} className="w-20" />
        <button
          onClick={() => {
            const c = canvasRef.current!
            const ctx = c.getContext("2d")!
            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, c.width, c.height)
          }}
          className="px-2 py-0.5 text-xs bg-white border border-gray-400 rounded"
        >
          Limpiar
        </button>
      </div>
      <div className="flex-1 p-2">
        <canvas
          ref={canvasRef}
          width={580}
          height={380}
          onMouseDown={(e) => {
            setDrawing(true)
            last.current = pos(e)
          }}
          onMouseMove={(e) => {
            if (!drawing) return
            const ctx = canvasRef.current!.getContext("2d")!
            const p = pos(e)
            ctx.strokeStyle = color
            ctx.lineWidth = size
            ctx.lineCap = "round"
            if (last.current) {
              ctx.beginPath()
              ctx.moveTo(last.current.x, last.current.y)
              ctx.lineTo(p.x, p.y)
              ctx.stroke()
            }
            last.current = p
          }}
          onMouseUp={() => {
            setDrawing(false)
            last.current = null
          }}
          onMouseLeave={() => {
            setDrawing(false)
            last.current = null
          }}
          className="bg-white border-2 border-blue-300 cursor-crosshair w-full h-full rounded"
        />
      </div>
    </div>
  )
}
