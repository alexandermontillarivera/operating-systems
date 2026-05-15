"use client"

import { useEffect, useRef, useState } from "react"

type Tool = "pencil" | "brush" | "eraser" | "line"

const TOOLS: { id: Tool; label: string; icon: React.ReactNode }[] = [
  {
    id: "pencil",
    label: "Pencil",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" shapeRendering="crispEdges">
        <line x1="2" y1="12" x2="10" y2="4" stroke="black" strokeWidth="1.2" />
        <polygon points="9,3 11,5 12,4 10,2" fill="black" />
        <rect x="1" y="11" width="2" height="2" fill="black" />
      </svg>
    ),
  },
  {
    id: "brush",
    label: "Brush",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" shapeRendering="crispEdges">
        <rect x="2" y="9" width="3" height="3" fill="black" />
        <line x1="5" y1="8" x2="11" y2="2" stroke="black" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "line",
    label: "Line",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" shapeRendering="crispEdges">
        <line x1="2" y1="11" x2="12" y2="3" stroke="black" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "eraser",
    label: "Eraser",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" shapeRendering="crispEdges">
        <rect x="2" y="3" width="10" height="6" fill="white" stroke="black" strokeWidth="1" />
        <rect x="2" y="9" width="10" height="2" fill="#aaa" stroke="black" strokeWidth="1" />
      </svg>
    ),
  },
]

/** MacPaint — black & white canvas with a tool palette on the left. */
export function MacPaint() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState<Tool>("pencil")
  const [drawing, setDrawing] = useState(false)
  const last = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext("2d")
    if (!ctx) return
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

  const onDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true)
    last.current = pos(e)
  }
  const onMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return
    const c = canvasRef.current!
    const ctx = c.getContext("2d")!
    const p = pos(e)
    if (!last.current) {
      last.current = p
      return
    }
    ctx.strokeStyle = tool === "eraser" ? "white" : "black"
    ctx.lineWidth = tool === "brush" ? 6 : tool === "eraser" ? 12 : 2
    ctx.lineCap = "round"
    if (tool !== "line") {
      ctx.beginPath()
      ctx.moveTo(last.current.x, last.current.y)
      ctx.lineTo(p.x, p.y)
      ctx.stroke()
      last.current = p
    }
  }
  const onUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (drawing && tool === "line" && last.current) {
      const ctx = canvasRef.current!.getContext("2d")!
      const p = pos(e)
      ctx.strokeStyle = "black"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(last.current.x, last.current.y)
      ctx.lineTo(p.x, p.y)
      ctx.stroke()
    }
    setDrawing(false)
    last.current = null
  }

  const clear = () => {
    const c = canvasRef.current!
    const ctx = c.getContext("2d")!
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, c.width, c.height)
  }

  return (
    <div className="h-full bg-white flex">
      <div className="w-12 bg-[#cfd8d0] border-r-2 border-black flex flex-col items-center py-1 gap-1">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            title={t.label}
            className={`w-9 h-9 border-2 flex items-center justify-center text-base ${
              tool === t.id ? "border-black bg-white" : "border-gray-500 bg-[#dcdcdc]"
            }`}
          >
            {t.icon}
          </button>
        ))}
        <button
          onClick={clear}
          className="w-9 h-7 border-2 border-gray-500 bg-[#dcdcdc] text-[10px] font-bold mt-2"
        >
          CLR
        </button>
      </div>
      <div className="flex-1 bg-[#cfd8d0] p-1 overflow-hidden">
        <div className="w-full h-full bg-white border-2 border-black overflow-hidden">
          <canvas
            ref={canvasRef}
            width={500}
            height={350}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            className="w-full h-full cursor-crosshair"
          />
        </div>
      </div>
    </div>
  )
}
