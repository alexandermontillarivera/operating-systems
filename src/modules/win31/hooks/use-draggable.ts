"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface Position {
  x: number
  y: number
}

export function useDraggable(initial: Position) {
  const [position, setPosition] = useState<Position>(initial)
  const [isDragging, setIsDragging] = useState(false)
  const offset = useRef<Position>({ x: 0, y: 0 })

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      offset.current = { x: e.clientX - position.x, y: e.clientY - position.y }
      setIsDragging(true)
    },
    [position.x, position.y],
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

  return { position, isDragging, onPointerDown }
}
