"use client"

const ITEMS = [
  { icon: "🎨", label: "Color" },
  { icon: "🔤", label: "Fonts" },
  { icon: "🖱️", label: "Mouse" },
  { icon: "⌨️", label: "Keyboard" },
  { icon: "🖥️", label: "Display" },
  { icon: "🔊", label: "Sound" },
  { icon: "🖨️", label: "Printers" },
  { icon: "🌐", label: "International" },
  { icon: "📅", label: "Date/Time" },
  { icon: "⚡", label: "386 Enhanced" },
] as const

export function ControlPanel() {
  return (
    <div className="p-3 bg-[#c0c0c0] h-full text-black" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <div className="grid grid-cols-5 gap-3">
        {ITEMS.map((it, i) => (
          <button key={i} className="flex flex-col items-center p-2 hover:bg-[#000080] hover:text-white">
            <span className="text-2xl">{it.icon}</span>
            <span className="text-xs mt-1">{it.label}</span>
          </button>
        ))}
      </div>
      <div className="text-xs mt-3 text-gray-700">
        Settings - select an icon to configure your system.
      </div>
    </div>
  )
}
