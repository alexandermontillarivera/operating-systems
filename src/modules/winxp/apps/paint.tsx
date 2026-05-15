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
  const clear = () => {
    const c = canvasRef.current!
    const ctx = c.getContext("2d")!
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, c.width, c.height)
  }

  return (
    <div className="h-full flex flex-col bg-gray-100 text-black">
      <div className="flex items-center gap-2 p-1 border-b bg-gray-100">
        <div className="flex flex-wrap gap-1 p-1 bg-white border">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-4 h-4 border ${color === c ? "ring-2 ring-blue-500" : ""}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs">Tamaño:</span>
          <input type="range" min="1" max="20" value={size} onChange={(e) => setSize(+e.target.value)} className="w-20" />
        </div>
        <button onClick={clear} className="px-2 py-1 text-xs bg-white border hover:bg-gray-50">Limpiar</button>
      </div>
      <div className="flex-1 p-2 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={520}
          height={340}
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
          className="bg-white border cursor-crosshair w-full h-full"
        />
      </div>
    </div>
  )
}
