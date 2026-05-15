"use client"

import { useEffect } from "react"
import type { SnakeState } from "@/modules/dos/types"
import { SNAKE_H, SNAKE_W } from "@/modules/dos/types"

interface DOSSnakeProps {
  state: SnakeState
  onSetDir: (d: { x: number; y: number }) => void
  onExit: () => void
  onRestart: () => void
}

/** Snake game on an ASCII grid. Uses arrow keys, R to restart, ESC to exit. */
export function DOSSnake({ state, onSetDir, onExit, onRestart }: DOSSnakeProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && state.dir.y === 0) onSetDir({ x: 0, y: -1 })
      if (e.key === "ArrowDown" && state.dir.y === 0) onSetDir({ x: 0, y: 1 })
      if (e.key === "ArrowLeft" && state.dir.x === 0) onSetDir({ x: -1, y: 0 })
      if (e.key === "ArrowRight" && state.dir.x === 0) onSetDir({ x: 1, y: 0 })
      if (e.key === "Escape") onExit()
      if (e.key === "r" || e.key === "R") onRestart()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [state.dir, onSetDir, onExit, onRestart])

  // Build the visible grid
  const grid: string[][] = Array.from({ length: SNAKE_H }, () =>
    Array.from({ length: SNAKE_W }, () => " "),
  )
  state.body.forEach((b, i) => {
    if (b.x >= 0 && b.x < SNAKE_W && b.y >= 0 && b.y < SNAKE_H) {
      grid[b.y][b.x] = i === 0 ? "@" : "*"
    }
  })
  if (state.food.y >= 0 && state.food.y < SNAKE_H) grid[state.food.y][state.food.x] = "$"

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center p-4">
      <div className="text-2xl mb-2">SNAKE.EXE</div>
      <div className="text-sm mb-2">
        Score: {state.score}  {state.dead && "GAME OVER - press R to restart"}
      </div>
      <pre className="border-2 border-green-700 p-2 bg-black leading-none text-xs md:text-sm">
        {grid.map((row, i) => (
          <div key={i}>{row.join("")}</div>
        ))}
      </pre>
      <div className="mt-2 text-xs text-green-500">
        Arrows = move | ESC = exit | R = restart
      </div>
      <button
        onClick={onExit}
        className="mt-4 px-4 py-1 bg-green-900/50 border border-green-700 rounded text-sm"
      >
        ESC Salir
      </button>
    </div>
  )
}
