"use client"

const ITEMS = [
  { icon: "🎨", label: "Pantalla" },
  { icon: "🔤", label: "Fuentes" },
  { icon: "🖱️", label: "Mouse" },
  { icon: "⌨️", label: "Teclado" },
  { icon: "🔊", label: "Sonido" },
  { icon: "🖨️", label: "Impresoras" },
  { icon: "🌐", label: "Conexiones de red" },
  { icon: "👤", label: "Cuentas de usuario" },
  { icon: "📅", label: "Fecha y hora" },
  { icon: "🛡️", label: "Centro de seguridad" },
  { icon: "📦", label: "Agregar/quitar programas" },
  { icon: "🎮", label: "Dispositivos de juego" },
] as const

export function ControlPanel() {
  return (
    <div className="h-full bg-gradient-to-b from-blue-50 to-blue-100 p-4 overflow-auto text-black">
      <h2 className="text-blue-800 font-bold mb-3">Panel de control</h2>
      <div className="grid grid-cols-4 gap-3">
        {ITEMS.map((it, i) => (
          <button
            key={i}
            className="flex flex-col items-center p-3 hover:bg-blue-200 rounded"
          >
            <span className="text-3xl mb-1">{it.icon}</span>
            <span className="text-xs text-center">{it.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
