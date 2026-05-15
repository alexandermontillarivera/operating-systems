"use client"

import { useState } from "react"

const BUTTONS = ["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="] as const

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
    if (op && !fresh) {
      doEquals()
      setTimeout(() => {
        setOp(o)
        setFresh(true)
      }, 0)
    } else {
      setPrev(parseFloat(display))
      setOp(o)
      setFresh(true)
    }
  }
  const doEquals = () => {
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
      case "×":
        r = prev * cur
        break
      case "÷":
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
    <div
      className="h-full bg-[#cfd8d0] p-2 flex flex-col"
      style={{ fontFamily: "'ChicagoFLF', 'Geneva', sans-serif" }}
    >
      <div className="bg-white border-2 border-black p-2 mb-2 text-right font-mono text-2xl text-black">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1 flex-1">
        {BUTTONS.map((b, i) => (
          <button
            key={i}
            onClick={() => {
              if (b === "C") clear()
              else if (b === "=") doEquals()
              else if (["+", "-", "×", "÷"].includes(b)) setOpAndStash(b)
              else if (b === "±") setDisplay(String(-parseFloat(display)))
              else if (b === "%") setDisplay(String(parseFloat(display) / 100))
              else num(b)
            }}
            className={`bg-white border-2 border-black text-base font-bold text-black hover:bg-gray-100 active:bg-gray-300 ${
              b === "0" ? "col-span-2" : ""
            }`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  )
}
