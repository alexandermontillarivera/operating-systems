"use client"

import { useState } from "react"

interface NotesProps {
  time: Date
}

const INITIAL = [
  {
    id: 1,
    title: "Historia de los SO",
    body: "macOS está basado en Unix (Darwin/BSD).\n\nCaracterísticas:\n• Dock\n• Spotlight\n• Mission Control\n• iCloud\n• Continuidad",
  },
  { id: 2, title: "Ideas de proyecto", body: "1. Simulador de SO\n2. App de notas\n3. Cliente de música" },
  { id: 3, title: "Lista de compras", body: "- Café\n- Pan\n- Leche\n- Chocolate" },
]

export function Notes({ time }: NotesProps) {
  const [notes, setNotes] = useState(INITIAL)
  const [active, setActive] = useState(INITIAL[0].id)
  const note = notes.find((n) => n.id === active)!
  return (
    <div className="h-full bg-gray-50 flex text-black">
      <div className="w-56 bg-gray-100/80 backdrop-blur-xl border-r border-gray-200">
        <div className="p-3 border-b border-gray-200">
          <input
            type="search"
            placeholder="Buscar"
            className="w-full px-3 py-1.5 bg-gray-200 rounded-lg text-sm outline-none text-black"
          />
        </div>
        <div className="p-2">
          {notes.map((n) => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`w-full p-2 text-left rounded-lg mb-1 ${active === n.id ? "bg-yellow-100" : "hover:bg-gray-200"}`}
            >
              <p className="text-sm font-semibold truncate">{n.title}</p>
              <p className="text-xs text-gray-500 truncate">{n.body.split("\n")[0]}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Hoy a las {time.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <textarea
          value={note.body}
          onChange={(e) => setNotes(notes.map((n) => (n.id === active ? { ...n, body: e.target.value } : n)))}
          className="flex-1 p-4 outline-none resize-none bg-transparent text-sm text-black"
        />
      </div>
    </div>
  )
}
