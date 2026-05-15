"use client"

import { useCallback, useEffect, useState } from "react"
import type { SnakeState } from "@/modules/dos/types"
import { SNAKE_H, SNAKE_W } from "@/modules/dos/types"

const INITIAL_STATE: SnakeState = {
  active: true,
  body: [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ],
  dir: { x: 1, y: 0 },
  food: { x: 12, y: 8 },
  score: 0,
  dead: false,
}

export function useSnake() {
  const [state, setState] = useState<SnakeState | null>(null)

  const start = useCallback(() => setState({ ...INITIAL_STATE, body: [...INITIAL_STATE.body] }), [])
  const stop = useCallback(() => setState(null), [])
  const restart = useCallback(() => setState({ ...INITIAL_STATE, body: [...INITIAL_STATE.body] }), [])

  const setDir = useCallback(
    (d: { x: number; y: number }) => setState((s) => (s ? { ...s, dir: d } : s)),
    [],
  )

  // Tick loop
  useEffect(() => {
    if (!state?.active || state.dead) return
    const id = setInterval(() => {
      setState((s) => {
        if (!s || s.dead) return s
        const head = s.body[0]
        const nh = { x: head.x + s.dir.x, y: head.y + s.dir.y }
        if (nh.x < 0 || nh.x >= SNAKE_W || nh.y < 0 || nh.y >= SNAKE_H) {
          return { ...s, dead: true }
        }
        if (s.body.some((b) => b.x === nh.x && b.y === nh.y)) {
          return { ...s, dead: true }
        }
        const ate = nh.x === s.food.x && nh.y === s.food.y
        const newBody = [nh, ...s.body]
        if (!ate) newBody.pop()
        const newFood = ate
          ? { x: Math.floor(Math.random() * SNAKE_W), y: Math.floor(Math.random() * SNAKE_H) }
          : s.food
        return { ...s, body: newBody, food: newFood, score: s.score + (ate ? 10 : 0) }
      })
    }, 120)
    return () => clearInterval(id)
  }, [state?.active, state?.dead])

  return { state, active: state?.active ?? false, start, stop, restart, setDir }
}
