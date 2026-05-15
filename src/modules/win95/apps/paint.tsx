"use client"

import { useState, useRef, useEffect } from "react"

type Tool = "pencil" | "brush" | "eraser" | "fill"

const COLORS = [
  "#000000", "#7F7F7F", "#880015", "#ED1C24", "#FF7F27", "#FFF200",
  "#22B14C", "#00A2E8", "#3F48CC", "#A349A4",
  "#FFFFFF", "#C3C3C3", "#B97A57", "#FFAEC9", "#FFC90E", "#EFE4B0",
  "#B5E61D", "#99D9EA", "#7092BE", "#C8BFE7",
]

export function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState("#000000")
  const [tool, setTool] = useState<Tool>("pencil")
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

  const flood = (sx: number, sy: number, target: string, replace: string) => {
    const c = canvasRef.current!
    const ctx = c.getContext("2d")!
    const img = ctx.getImageData(0, 0, c.width, c.height)
    const stack: [number, number][] = [[Math.floor(sx), Math.floor(sy)]]
    const hex = (v: number) => v.toString(16).padStart(2, "0")
    const colAt = (x: number, y: number) => {
      const i = (y * c.width + x) * 4
      return "#" + hex(img.data[i]) + hex(img.data[i + 1]) + hex(img.data[i + 2])
    }
    const setAt = (x: number, y: number, hexc: string) => {
      const i = (y * c.width + x) * 4
      img.data[i] = parseInt(hexc.slice(1, 3), 16)
      img.data[i + 1] = parseInt(hexc.slice(3, 5), 16)
      img.data[i + 2] = parseInt(hexc.slice(5, 7), 16)
      img.data[i + 3] = 255
    }
    if (target === replace) return
    while (stack.length) {
      const [x, y] = stack.pop()!
      if (x < 0 || x >= c.width || y < 0 || y >= c.height) continue
      if (colAt(x, y) !== target) continue
      setAt(x, y, replace)
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
    }
    ctx.putImageData(img, 0, 0)
  }

  const tools: { id: Tool; icon: string }[] = [
    { id: "pencil", icon: "✏" },
    { id: "brush", icon: "🖌" },
    { id: "fill", icon: "🪣" },
    { id: "eraser", icon: "🩹" },
  ]

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <div className="px-1 py-0.5 flex gap-2 text-[11px] border-b border-[#808080]">
        {["Archivo", "Edición", "Ver", "Imagen", "Opciones", "Ayuda"].map((m) => (
          <button key={m} className="px-1 hover:bg-[#000080] hover:text-white">
            <u>{m[0]}</u>
            {m.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex-1 flex">
        <div
          className="w-14 grid grid-cols-2 gap-1 p-1 m-0.5 bg-[#c0c0c0] content-start"
          style={{
            boxShadow: "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
          }}
        >
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`w-6 h-6 flex items-center justify-center text-xs ${tool === t.id ? "bg-[#dedede]" : "bg-[#c0c0c0]"}`}
              style={{
                boxShadow:
                  tool === t.id
                    ? "inset 1px 1px 0 0 #000, inset -1px -1px 0 0 #fff"
                    : "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
              }}
            >
              {t.icon}
            </button>
          ))}
        </div>
        <div
          className="flex-1 p-2 m-0.5 bg-[#808080]"
          style={{
            boxShadow: "inset 1px 1px 0 0 #404040, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #404040, inset -2px -2px 0 0 #dfdfdf",
          }}
        >
          <canvas
            ref={canvasRef}
            width={520}
            height={320}
            onMouseDown={(e) => {
              const p = pos(e)
              if (tool === "fill") {
                const ctx = canvasRef.current!.getContext("2d")!
                const data = ctx.getImageData(Math.floor(p.x), Math.floor(p.y), 1, 1).data
                const target = "#" + [data[0], data[1], data[2]].map((v) => v.toString(16).padStart(2, "0")).join("")
                flood(p.x, p.y, target, color)
                return
              }
              setDrawing(true)
              last.current = p
            }}
            onMouseMove={(e) => {
              if (!drawing) return
              const ctx = canvasRef.current!.getContext("2d")!
              const p = pos(e)
              ctx.strokeStyle = tool === "eraser" ? "white" : color
              ctx.lineWidth = tool === "brush" ? 6 : tool === "eraser" ? 12 : 2
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
            className="bg-white cursor-crosshair w-full h-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>
      <div
        className="bg-[#c0c0c0] p-1 flex items-center gap-2 m-0.5"
        style={{
          boxShadow: "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
        }}
      >
        <div
          className="w-9 h-9 flex items-center justify-center"
          style={{ boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff" }}
        >
          <div className="w-7 h-7 border border-black" style={{ background: color }} />
        </div>
        <div className="grid grid-cols-10 gap-px">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-4 h-4 border border-gray-700"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
