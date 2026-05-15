"use client"

import { useState } from "react"

const BUTTONS = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"] as const

export function Calc() {
  const [d, setD] = useState("0")
  const [p, setP] = useState<number | null>(null)
  const [op, setOp] = useState<string | null>(null)
  const [fresh, setFresh] = useState(true)

  const num = (n: string) => {
    if (fresh) {
      setD(n)
      setFresh(false)
    } else setD(d === "0" ? n : d + n)
  }
  const eq = () => {
    if (p === null || !op) return
    const c = parseFloat(d)
    let r = 0
    switch (op) {
      case "+":
        r = p + c
        break
      case "-":
        r = p - c
        break
      case "*":
        r = p * c
        break
      case "/":
        r = c === 0 ? 0 : p / c
        break
    }
    setD(String(r))
    setP(null)
    setOp(null)
    setFresh(true)
  }
  const setO = (o: string) => {
    setP(parseFloat(d))
    setOp(o)
    setFresh(true)
  }
  const C = () => {
    setD("0")
    setP(null)
    setOp(null)
    setFresh(true)
  }

  return (
    <div className="h-full p-2 bg-[#ECE9D8] flex flex-col text-black">
      <div
        className="bg-white border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white p-2 mb-2 text-right font-mono text-xl"
      >
        {d}
      </div>
      <button
        onClick={C}
        className="bg-[#ECE9D8] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 py-1 text-sm font-bold mb-1"
      >
        C
      </button>
      <div className="grid grid-cols-4 gap-1 flex-1">
        {BUTTONS.map((b, i) => (
          <button
            key={i}
            onClick={() => {
              if (b === "=") eq()
              else if (["+", "-", "*", "/"].includes(b)) setO(b)
              else num(b)
            }}
            className="bg-[#ECE9D8] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 text-sm font-bold"
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  )
}
