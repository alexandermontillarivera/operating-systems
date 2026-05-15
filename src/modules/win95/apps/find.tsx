"use client"

import { useState } from "react"

const ALL_FILES = [
  "notepad.exe",
  "calc.exe",
  "winmine.exe",
  "explorer.exe",
  "win.com",
  "sol.exe",
  "mspaint.exe",
  "wordpad.exe",
  "Bienvenida.txt",
  "Carta.rtf",
  "autoexec.bat",
  "config.sys",
]

export function Find() {
  const [q, setQ] = useState("")
  const matches = q ? ALL_FILES.filter((f) => f.toLowerCase().includes(q.toLowerCase())) : []
  return (
    <div
      className="h-full bg-[#c0c0c0] p-3 flex flex-col gap-2 text-[11px]"
      style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <div className="flex gap-2 items-center">
        <span>Nombre:</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 bg-white px-1 py-0.5"
          style={{
            boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff",
          }}
        />
      </div>
      <div
        className="flex-1 bg-white p-2 overflow-auto text-[11px]"
        style={{
          boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #404040, inset -2px -2px 0 0 #dfdfdf",
        }}
      >
        {q && matches.length === 0 && <div className="text-gray-600">No se encontraron archivos.</div>}
        {matches.map((m) => (
          <div key={m} className="px-1 py-0.5 hover:bg-[#000080] hover:text-white">
            📄 {m}
          </div>
        ))}
      </div>
    </div>
  )
}
