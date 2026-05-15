"use client"

import { useState } from "react"
import { RunIcon } from "@/modules/win95/components/icons"

interface RunProps {
  onRun: (cmd: string) => void
  onCancel: () => void
}

export function Run({ onRun, onCancel }: RunProps) {
  const [text, setText] = useState("")
  return (
    <div
      className="h-full bg-[#c0c0c0] p-3 flex flex-col gap-3 text-[11px]"
      style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <div className="flex gap-3">
        <div className="shrink-0">
          <RunIcon size={32} />
        </div>
        <div className="text-[11px] leading-tight">
          Escribe el nombre de un programa, carpeta o documento, y Windows lo abrirá:
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span>Abrir:</span>
        <input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onRun(text)}
          className="flex-1 bg-white px-1 py-0.5"
          style={{
            boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff, inset 2px 2px 0 0 #404040, inset -2px -2px 0 0 #dfdfdf",
          }}
        />
      </div>
      <div className="text-[10px] text-gray-700">
        Prueba: notepad, calc, mspaint, wordpad, winmine, sol, explorer
      </div>
      <div className="flex gap-2 mt-auto justify-end">
        <Win95Button onClick={() => onRun(text)}>Aceptar</Win95Button>
        <Win95Button onClick={onCancel}>Cancelar</Win95Button>
        <Win95Button>Examinar...</Win95Button>
      </div>
    </div>
  )
}

function Win95Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1 bg-[#c0c0c0] text-[11px] min-w-[70px] active:[box-shadow:inset_1px_1px_0_0_#000,inset_-1px_-1px_0_0_#fff,inset_2px_2px_0_0_#808080]"
      style={{
        boxShadow: "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf",
      }}
    >
      {children}
    </button>
  )
}
