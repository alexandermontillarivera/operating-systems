"use client"

import { useEffect, useRef, useState } from "react"
import { MenuBar } from "@/modules/win31/components/menu-bar"

const COLORS = [
  "#000000", "#FFFFFF", "#808080", "#C0C0C0",
  "#FF0000", "#FFFF00", "#00FF00", "#00FFFF",
  "#0000FF", "#FF00FF", "#800000", "#808000",
  "#008000", "#008080", "#000080", "#800080",
]

export function Paintbrush() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState("#000000")
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
    const rect = c.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * c.width,
      y: ((e.clientY - rect.top) / rect.height) * c.height,
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-black" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <MenuBar items={["File", "Edit", "Pick", "Options", "Help"]} />
      <div className="flex-1 flex">
        <div className="w-12 bg-[#c0c0c0] border-r-2 border-[#808080] py-1 px-1 grid grid-cols-1 gap-1">
          {["✏", "🖌", "█", "○", "□", "⬢"].map((t, i) => (
            <button
              key={i}
              className="w-9 h-9 bg-[#c0c0c0] text-base"
              style={{ boxShadow: "inset -1px -1px 0 0 #404040, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf" }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex-1 p-1 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={420}
            height={280}
            onMouseDown={(e) => {
              setDrawing(true)
              last.current = pos(e)
            }}
            onMouseMove={(e) => {
              if (!drawing) return
              const ctx = canvasRef.current!.getContext("2d")!
              const p = pos(e)
              ctx.strokeStyle = color
              ctx.lineWidth = 2
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
            className="w-full h-full bg-white border-2 border-[#404040] cursor-crosshair"
          />
        </div>
      </div>
      <div className="bg-[#c0c0c0] border-t-2 border-[#808080] flex flex-wrap gap-1 px-2 py-1">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-6 h-6 border-2 ${color === c ? "border-black" : "border-[#808080]"}`}
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  )
}
