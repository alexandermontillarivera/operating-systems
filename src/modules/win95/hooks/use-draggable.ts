"use client"

import { useState, useRef, useEffect, useCallback } from "react"

interface Position {
  x: number
  y: number
}

interface DraggableHandlers {
  onPointerDown: (e: React.PointerEvent) => void
}

export function useDraggable(initial: Position, opts?: { disabled?: boolean }) {
  const [position, setPosition] = useState<Position>(initial)
  const [isDragging, setIsDragging] = useState(false)
  const offset = useRef<Position>({ x: 0, y: 0 })

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (opts?.disabled) return
      offset.current = { x: e.clientX - position.x, y: e.clientY - position.y }
      setIsDragging(true)
    },
    [position.x, position.y, opts?.disabled],
  )

  useEffect(() => {
    if (!isDragging) return
    const move = (e: PointerEvent) => {
      setPosition({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y })
    }
    const up = () => setIsDragging(false)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
  }, [isDragging])

  const handlers: DraggableHandlers = { onPointerDown }
  return { position, setPosition, isDragging, handlers }
}
