"use client"

const ITEMS = [
  { icon: "🎨", label: "Apariencia y personalización" },
  { icon: "🌐", label: "Redes e Internet" },
  { icon: "🖱️", label: "Hardware y sonido" },
  { icon: "📦", label: "Programas" },
  { icon: "👤", label: "Cuentas de usuario" },
  { icon: "📅", label: "Reloj e idioma" },
  { icon: "♿", label: "Accesibilidad" },
  { icon: "🛡️", label: "Sistema y seguridad" },
] as const

export function ControlPanel() {
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-white p-4 overflow-auto text-black">
      <h2 className="text-blue-800 font-bold mb-3">Panel de control</h2>
      <div className="grid grid-cols-2 gap-3">
        {ITEMS.map((it, i) => (
          <button key={i} className="flex items-center gap-3 p-3 hover:bg-blue-100 rounded">
            <span className="text-3xl">{it.icon}</span>
            <span className="text-sm text-blue-800">{it.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
