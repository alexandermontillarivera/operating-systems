"use client"

const APPS = [
  { name: "Visual Studio Code", category: "Developer", icon: "💻", rating: 4.8 },
  { name: "GIMP", category: "Graphics", icon: "🎨", rating: 4.5 },
  { name: "Inkscape", category: "Graphics", icon: "✒️", rating: 4.6 },
  { name: "Blender", category: "Graphics", icon: "🟧", rating: 4.7 },
  { name: "VLC", category: "Audio & Video", icon: "🎬", rating: 4.9 },
  { name: "LibreOffice", category: "Office", icon: "📊", rating: 4.4 },
  { name: "Discord", category: "Communication", icon: "💬", rating: 4.5 },
  { name: "Spotify", category: "Audio & Video", icon: "🎵", rating: 4.6 },
] as const

export function Software() {
  return (
    <div className="h-full flex flex-col bg-white text-black">
      <div className="bg-[#f5f5f5] border-b border-gray-300 px-3 py-2 flex items-center gap-2">
        <input
          placeholder="Search..."
          className="flex-1 px-3 py-1 border border-gray-300 rounded-full text-sm bg-white"
        />
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <h3 className="text-sm font-semibold mb-3 text-gray-600 uppercase">Editor&apos;s Picks</h3>
        <div className="grid grid-cols-2 gap-3">
          {APPS.map((a) => (
            <div key={a.name} className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-100">
              <span className="text-3xl">{a.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-sm">{a.name}</div>
                <div className="text-xs text-gray-600">{a.category}</div>
                <div className="text-xs text-yellow-500">
                  {"★".repeat(Math.round(a.rating))} <span className="text-gray-500">{a.rating}</span>
                </div>
              </div>
              <button className="bg-[#E95420] text-white px-3 py-1 rounded text-xs">Install</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
