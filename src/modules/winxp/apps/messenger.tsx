"use client"

import { useState } from "react"

interface Message {
  from: string
  text: string
}

export function Messenger() {
  const [msgs, setMsgs] = useState<Message[]>([
    { from: "MSN", text: "¡Bienvenido a Windows Messenger!" },
  ])
  const [input, setInput] = useState("")

  const send = () => {
    if (!input.trim()) return
    const text = input
    setMsgs((m) => [...m, { from: "Tú", text }])
    setInput("")
    setTimeout(
      () => setMsgs((m) => [...m, { from: "MSN", text: "Mensaje recibido. (auto-respuesta)" }]),
      700,
    )
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 text-black">
      <div className="bg-gradient-to-b from-[#0058e6] to-[#1565b8] text-white p-2 text-xs">
        💬 Messenger - Conectado
      </div>
      <div className="flex-1 overflow-auto p-2 space-y-2 text-sm">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[70%] ${
              m.from === "Tú" ? "bg-blue-500 text-white ml-auto" : "bg-white"
            }`}
          >
            <div className="text-[10px] opacity-70">{m.from}</div>
            <div>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="border-t p-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 border border-gray-400 px-2 py-1 text-sm rounded bg-white"
          placeholder="Escribe un mensaje..."
        />
      </div>
    </div>
  )
}
