"use client"

const SECTIONS = [
  { icon: "👤", name: "Apple ID" },
  { icon: "🔵", name: "Wi-Fi" },
  { icon: "🔷", name: "Bluetooth" },
  { icon: "🔔", name: "Notificaciones" },
  { icon: "🔊", name: "Sonido" },
  { icon: "🖥️", name: "Pantalla" },
  { icon: "🔋", name: "Batería" },
  { icon: "🌒", name: "Apariencia" },
  { icon: "♿", name: "Accesibilidad" },
  { icon: "🔒", name: "Privacidad y seguridad" },
] as const

export function Settings() {
  return (
    <div className="h-full flex bg-white text-black">
      <div className="w-56 bg-gray-100/80 backdrop-blur p-2 border-r border-gray-200">
        {SECTIONS.map((s) => (
          <button
            key={s.name}
            className="w-full flex items-center gap-3 px-3 py-1.5 hover:bg-gray-200 rounded text-sm text-left"
          >
            <span className="text-lg">{s.icon}</span>
            {s.name}
          </button>
        ))}
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Apariencia</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-4 max-w-md">
          <div className="text-sm font-medium mb-3">Modo</div>
          <div className="flex gap-3">
            {["Claro", "Oscuro", "Auto"].map((m) => (
              <button key={m} className="flex flex-col items-center gap-2">
                <div
                  className={`w-20 h-14 rounded-lg border-2 ${
                    m === "Claro"
                      ? "border-blue-500 bg-white"
                      : m === "Oscuro"
                        ? "border-gray-300 bg-gray-800"
                        : "border-gray-300 bg-gradient-to-r from-white to-gray-800"
                  }`}
                />
                <span className="text-xs">{m}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
