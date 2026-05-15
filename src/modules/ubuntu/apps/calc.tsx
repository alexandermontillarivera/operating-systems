"use client"

import { useState } from "react"

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
      case "−":
        r = p - c
        break
      case "×":
        r = p * c
        break
      case "÷":
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

  const buttons = [
    { l: "AC", c: "bg-gray-200", on: C },
    { l: "÷", c: "bg-orange-400 text-white", on: () => setO("÷") },
    { l: "×", c: "bg-orange-400 text-white", on: () => setO("×") },
    { l: "⌫", c: "bg-gray-200", on: () => setD(d.length > 1 ? d.slice(0, -1) : "0") },
    { l: "7", c: "bg-white", on: () => num("7") },
    { l: "8", c: "bg-white", on: () => num("8") },
    { l: "9", c: "bg-white", on: () => num("9") },
    { l: "−", c: "bg-orange-400 text-white", on: () => setO("−") },
    { l: "4", c: "bg-white", on: () => num("4") },
    { l: "5", c: "bg-white", on: () => num("5") },
    { l: "6", c: "bg-white", on: () => num("6") },
    { l: "+", c: "bg-orange-400 text-white", on: () => setO("+") },
    { l: "1", c: "bg-white", on: () => num("1") },
    { l: "2", c: "bg-white", on: () => num("2") },
    { l: "3", c: "bg-white", on: () => num("3") },
    { l: "=", c: "bg-[#E95420] text-white row-span-2", on: eq },
    { l: "0", c: "bg-white col-span-2", on: () => num("0") },
    { l: ".", c: "bg-white", on: () => num(".") },
  ]

  return (
    <div className="h-full bg-[#f5f5f5] p-3 flex flex-col text-black">
      <div className="bg-white border border-gray-300 rounded p-3 mb-2 text-right font-light text-3xl">
        {d}
      </div>
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.map((b, i) => (
          <button
            key={i}
            onClick={b.on}
            className={`${b.c} border border-gray-300 rounded text-lg hover:opacity-80`}
          >
            {b.l}
          </button>
        ))}
      </div>
    </div>
  )
}
