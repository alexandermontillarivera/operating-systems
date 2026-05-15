"use client"

import { useState } from "react"

const BUTTONS = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"] as const

export function Calculator() {
  const [display, setDisplay] = useState("0")
  const [prev, setPrev] = useState<number | null>(null)
  const [op, setOp] = useState<string | null>(null)
  const [fresh, setFresh] = useState(true)

  const num = (n: string) => {
    if (fresh) {
      setDisplay(n)
      setFresh(false)
    } else setDisplay(display === "0" ? n : display + n)
  }
  const setOpAndStash = (o: string) => {
    setPrev(parseFloat(display))
    setOp(o)
    setFresh(true)
  }
  const equals = () => {
    if (prev === null || !op) return
    const cur = parseFloat(display)
    let r = 0
    switch (op) {
      case "+":
        r = prev + cur
        break
      case "-":
        r = prev - cur
        break
      case "*":
        r = prev * cur
        break
      case "/":
        r = cur === 0 ? 0 : prev / cur
        break
    }
    setDisplay(String(r))
    setPrev(null)
    setOp(null)
    setFresh(true)
  }
  const clear = () => {
    setDisplay("0")
    setPrev(null)
    setOp(null)
    setFresh(true)
  }

  return (
    <div className="h-full p-2 bg-[#c0c0c0] text-black" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <div
        className="bg-white p-2 mb-2 text-right font-mono text-xl"
        style={{ boxShadow: "inset 1px 1px 0 0 #404040, inset -1px -1px 0 0 #fff" }}
      >
        {display}
      </div>
      <div className="flex justify-end mb-1">
        <button
          onClick={clear}
          className="px-2 py-1 text-xs bg-[#c0c0c0] text-black"
          style={{ boxShadow: "inset -1px -1px 0 0 #404040, inset 1px 1px 0 0 #fff" }}
        >
          C
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {BUTTONS.map((b, i) => (
          <button
            key={i}
            onClick={() => {
              if (b === "=") equals()
              else if (["+", "-", "*", "/"].includes(b)) setOpAndStash(b)
              else num(b)
            }}
            className="bg-[#c0c0c0] text-black py-1 text-sm font-bold"
            style={{ boxShadow: "inset -1px -1px 0 0 #404040, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf" }}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  )
}
