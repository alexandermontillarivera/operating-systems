"use client"

import { useState } from "react"

const MESSAGES = [
  {
    from: "Apple",
    subject: "Bienvenido a tu nuevo Mac",
    body: "Tu Mac está listo. Explora las nuevas características de macOS Sonoma...",
  },
  {
    from: "iCloud",
    subject: "Verifica tu cuenta",
    body: "Por favor verifica tu cuenta de iCloud para sincronizar tus datos.",
  },
  {
    from: "Apple Music",
    subject: "Tu mix semanal está listo",
    body: "Descubre nueva música basada en lo que escuchaste esta semana.",
  },
  {
    from: "App Store",
    subject: "Actualizaciones disponibles",
    body: "Tienes 3 apps con actualizaciones disponibles.",
  },
]

export function Mail() {
  const [active, setActive] = useState(0)
  return (
    <div className="h-full flex bg-gray-50 text-black">
      <div className="w-44 bg-gray-100/80 p-2 border-r border-gray-200 text-sm">
        <div className="text-xs text-gray-500 font-semibold mb-2">Buzones</div>
        {["Entrada", "Borradores", "Enviados", "Spam", "Papelera"].map((b) => (
          <button
            key={b}
            className="w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded text-left"
          >
            <span>📥</span> {b}
          </button>
        ))}
      </div>
      <div className="w-72 border-r border-gray-200 overflow-auto">
        {MESSAGES.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-full text-left p-3 border-b border-gray-200 ${active === i ? "bg-blue-100" : "hover:bg-gray-100"}`}
          >
            <div className="flex justify-between items-start">
              <strong className="text-sm">{m.from}</strong>
              <span className="text-[10px] text-gray-500">10:30</span>
            </div>
            <div className="text-xs text-gray-700 mt-0.5 truncate">{m.subject}</div>
            <div className="text-xs text-gray-500 mt-0.5 truncate">{m.body.slice(0, 60)}...</div>
          </button>
        ))}
      </div>
      <div className="flex-1 p-6">
        <div className="text-sm text-gray-500 mb-1">De: {MESSAGES[active].from}</div>
        <h3 className="text-xl font-semibold mb-4">{MESSAGES[active].subject}</h3>
        <p className="text-sm leading-relaxed">{MESSAGES[active].body}</p>
      </div>
    </div>
  )
}
