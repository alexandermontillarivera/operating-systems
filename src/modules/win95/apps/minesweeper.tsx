"use client"

import { useState, useEffect, useCallback } from "react"

interface Cell {
  revealed: boolean
  mine: boolean
  count: number
  flagged: boolean
}

const SIZE = 9
const MINES = 10

export function Minesweeper() {
  const [grid, setGrid] = useState<Cell[][]>([])
  const [over, setOver] = useState(false)
  const [won, setWon] = useState(false)
  const [time, setTime] = useState(0)
  const [started, setStarted] = useState(false)

  const init = useCallback(() => {
    const g: Cell[][] = Array(SIZE)
      .fill(0)
      .map(() => Array(SIZE).fill(0).map(() => ({ revealed: false, mine: false, count: 0, flagged: false })))
    let placed = 0
    while (placed < MINES) {
      const x = Math.floor(Math.random() * SIZE)
      const y = Math.floor(Math.random() * SIZE)
      if (!g[y][x].mine) {
        g[y][x].mine = true
        placed++
      }
    }
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (g[y][x].mine) continue
        let n = 0
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy
            const nx = x + dx
            if (ny >= 0 && ny < SIZE && nx >= 0 && nx < SIZE && g[ny][nx].mine) n++
          }
        }
        g[y][x].count = n
      }
    }
    setGrid(g)
    setOver(false)
    setWon(false)
    setTime(0)
    setStarted(false)
  }, [])

  useEffect(() => init(), [init])

  useEffect(() => {
    if (!started || over || won) return
    const id = setInterval(() => setTime((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [started, over, won])

  const reveal = (x: number, y: number) => {
    if (over || won || grid[y][x].revealed || grid[y][x].flagged) return
    if (!started) setStarted(true)
    const ng = grid.map((r) => r.map((c) => ({ ...c })))
    if (ng[y][x].mine) {
      for (let i = 0; i < SIZE; i++)
        for (let j = 0; j < SIZE; j++) if (ng[i][j].mine) ng[i][j].revealed = true
      setGrid(ng)
      setOver(true)
      return
    }
    const flood = (cx: number, cy: number) => {
      if (cx < 0 || cx >= SIZE || cy < 0 || cy >= SIZE) return
      if (ng[cy][cx].revealed || ng[cy][cx].mine) return
      ng[cy][cx].revealed = true
      if (ng[cy][cx].count === 0) {
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) flood(cx + dx, cy + dy)
      }
    }
    flood(x, y)
    setGrid(ng)
    let unrev = 0
    for (let i = 0; i < SIZE; i++)
      for (let j = 0; j < SIZE; j++) if (!ng[i][j].revealed && !ng[i][j].mine) unrev++
    if (unrev === 0) setWon(true)
  }

  const flag = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault()
    if (over || won || grid[y][x].revealed) return
    const ng = grid.map((r) => r.map((c) => ({ ...c })))
    ng[y][x].flagged = !ng[y][x].flagged
    setGrid(ng)
  }

  const colorFor = (n: number) =>
    ["", "#0000FF", "#008000", "#FF0000", "#000080", "#800000", "#008080", "#000000", "#808080"][n] ||
    "black"

  const flagged = grid.flat().filter((c) => c.flagged).length

  return (
    <div className="h-full bg-[#c0c0c0] p-2 flex flex-col items-center" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <div
        className="bg-[#c0c0c0] p-1 flex items-center gap-3 mb-2"
        style={{
          boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #404040, inset -2px -2px 0 0 #dfdfdf",
        }}
      >
        <div
          className="w-12 bg-black text-red-500 font-mono text-lg text-center px-1"
          style={{ fontFamily: "'DSEG7 Classic', 'Courier New', monospace" }}
        >
          {String(MINES - flagged).padStart(3, "0")}
        </div>
        <button
          onClick={init}
          className="w-8 h-8 bg-[#c0c0c0] text-xl flex items-center justify-center"
          style={{
            boxShadow: "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
          }}
        >
          {over ? "😵" : won ? "😎" : "🙂"}
        </button>
        <div
          className="w-12 bg-black text-red-500 font-mono text-lg text-center px-1"
        >
          {String(time).padStart(3, "0")}
        </div>
      </div>
      <div
        className="p-1 bg-[#c0c0c0]"
        style={{
          boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #404040, inset -2px -2px 0 0 #dfdfdf",
        }}
      >
        {grid.map((row, y) => (
          <div key={y} className="flex">
            {row.map((c, x) => (
              <button
                key={x}
                onClick={() => reveal(x, y)}
                onContextMenu={(e) => flag(e, x, y)}
                className={`w-6 h-6 text-sm font-bold flex items-center justify-center bg-[#c0c0c0]`}
                style={{
                  color: colorFor(c.count),
                  boxShadow: c.revealed
                    ? "inset 1px 1px 0 0 #808080"
                    : "inset -1px -1px 0 0 #404040, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
                }}
              >
                {c.revealed ? (c.mine ? "💣" : c.count || "") : c.flagged ? "🚩" : ""}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
