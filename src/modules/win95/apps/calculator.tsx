"use client"

import { useState } from "react"

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
  const setO = (o: string) => {
    setPrev(parseFloat(display))
    setOp(o)
    setFresh(true)
  }
  const eq = () => {
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
  const C = () => {
    setDisplay("0")
    setPrev(null)
    setOp(null)
    setFresh(true)
  }
  const back = () => setDisplay(display.length > 1 ? display.slice(0, -1) : "0")

  const buttons = [
    { l: "Backspace", on: back, color: "text-red-700", colSpan: 2 },
    { l: "CE", on: C, color: "text-red-700" },
    { l: "C", on: C, color: "text-red-700" },
    { l: "MC", color: "text-red-700" },
    { l: "7", on: () => num("7") },
    { l: "8", on: () => num("8") },
    { l: "9", on: () => num("9") },
    { l: "/", on: () => setO("/"), color: "text-red-700" },
    { l: "MR", color: "text-red-700" },
    { l: "4", on: () => num("4") },
    { l: "5", on: () => num("5") },
    { l: "6", on: () => num("6") },
    { l: "*", on: () => setO("*"), color: "text-red-700" },
    { l: "MS", color: "text-red-700" },
    { l: "1", on: () => num("1") },
    { l: "2", on: () => num("2") },
    { l: "3", on: () => num("3") },
    { l: "-", on: () => setO("-"), color: "text-red-700" },
    { l: "M+", color: "text-red-700" },
    { l: "0", on: () => num("0") },
    { l: "+/-", on: () => setDisplay(String(-parseFloat(display))) },
    { l: ".", on: () => num(".") },
    { l: "+", on: () => setO("+"), color: "text-red-700" },
    { l: "=", on: eq, color: "text-red-700" },
  ]

  return (
    <div
      className="h-full bg-[#c0c0c0] p-1 flex flex-col"
      style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <div className="px-1 py-0.5 flex gap-2 text-[11px] border-b border-[#808080]">
        {["Edición", "Ver", "Ayuda"].map((m) => (
          <button key={m} className="px-1 hover:bg-[#000080] hover:text-white">
            <u>{m[0]}</u>
            {m.slice(1)}
          </button>
        ))}
      </div>
      <div
        className="m-1 mb-2 px-2 py-1 bg-white text-right font-mono text-base"
        style={{
          boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #404040, inset -2px -2px 0 0 #dfdfdf",
        }}
      >
        {display}
      </div>
      <div className="grid grid-cols-5 gap-1 px-1 pb-1 flex-1">
        {buttons.map((b, i) => (
          <button
            key={i}
            onClick={b.on}
            className={`bg-[#c0c0c0] text-[11px] font-bold ${b.color ?? ""} ${b.colSpan ? "col-span-2" : ""} active:[box-shadow:inset_1px_1px_0_0_#000,inset_-1px_-1px_0_0_#fff]`}
            style={{
              boxShadow: "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
            }}
          >
            {b.l}
          </button>
        ))}
      </div>
    </div>
  )
}
