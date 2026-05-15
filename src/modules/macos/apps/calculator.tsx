"use client"

import { useState } from "react"

/** macOS-style calculator: dark bg, orange operators, rounded buttons. */
export function Calculator() {
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
    { l: "AC", c: "bg-gray-300 text-black", on: C },
    { l: "±", c: "bg-gray-300 text-black", on: () => setD(String(-parseFloat(d))) },
    { l: "%", c: "bg-gray-300 text-black", on: () => setD(String(parseFloat(d) / 100)) },
    { l: "÷", c: "bg-orange-500 text-white", on: () => setO("÷") },
    { l: "7", c: "bg-gray-700 text-white", on: () => num("7") },
    { l: "8", c: "bg-gray-700 text-white", on: () => num("8") },
    { l: "9", c: "bg-gray-700 text-white", on: () => num("9") },
    { l: "×", c: "bg-orange-500 text-white", on: () => setO("×") },
    { l: "4", c: "bg-gray-700 text-white", on: () => num("4") },
    { l: "5", c: "bg-gray-700 text-white", on: () => num("5") },
    { l: "6", c: "bg-gray-700 text-white", on: () => num("6") },
    { l: "−", c: "bg-orange-500 text-white", on: () => setO("−") },
    { l: "1", c: "bg-gray-700 text-white", on: () => num("1") },
    { l: "2", c: "bg-gray-700 text-white", on: () => num("2") },
    { l: "3", c: "bg-gray-700 text-white", on: () => num("3") },
    { l: "+", c: "bg-orange-500 text-white", on: () => setO("+") },
    { l: "0", c: "bg-gray-700 text-white col-span-2", on: () => num("0") },
    { l: ".", c: "bg-gray-700 text-white", on: () => num(".") },
    { l: "=", c: "bg-orange-500 text-white", on: eq },
  ]

  return (
    <div className="h-full bg-gray-900 p-3 flex flex-col">
      <div className="text-right text-white text-4xl font-light p-3 mb-2 truncate">{d}</div>
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.map((b, i) => (
          <button
            key={i}
            onClick={b.on}
            className={`${b.c} rounded-full text-xl font-medium hover:opacity-80 transition`}
          >
            {b.l}
          </button>
        ))}
      </div>
    </div>
  )
}
