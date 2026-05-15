"use client"

const FOLDERS = ["Bandeja de entrada", "Bandeja de salida", "Elementos enviados", "Elementos eliminados", "Borradores"]

const EMAILS = [
  { from: "Bill Gates", subject: "Bienvenido a Windows XP", date: "10/25/2001" },
  { from: "MSN Hotmail", subject: "Verifica tu cuenta de Hotmail", date: "10/26/2001" },
  { from: "Amigo", subject: "RE: Mira esta foto del Bliss", date: "10/27/2001" },
]

export function Outlook() {
  return (
    <div className="h-full flex bg-white text-sm text-black">
      <div className="w-44 bg-gradient-to-b from-blue-50 to-blue-100 p-2 border-r">
        {FOLDERS.map((f) => (
          <button key={f} className="w-full text-left px-2 py-1 hover:bg-blue-200 rounded text-xs">
            📁 {f}
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="border-b">
          {EMAILS.map((e, i) => (
            <div key={i} className="px-3 py-2 border-b hover:bg-blue-50 cursor-pointer">
              <div className="flex justify-between">
                <strong>{e.from}</strong>
                <span className="text-xs text-gray-500">{e.date}</span>
              </div>
              <div className="text-xs text-gray-700">{e.subject}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 p-3 text-xs text-gray-600">Selecciona un mensaje para leerlo</div>
      </div>
    </div>
  )
}
