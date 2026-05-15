"use client"

import { useState } from "react"

export function Safari() {
  const [url, setUrl] = useState("https://apple.com")
  return (
    <div className="h-full flex flex-col bg-white text-black">
      <div className="bg-gray-100/95 backdrop-blur border-b border-gray-200 px-3 py-2 flex items-center gap-2">
        <button className="text-gray-600 px-1">◀</button>
        <button className="text-gray-600 px-1">▶</button>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-1 text-sm text-center"
        />
        <button className="text-gray-600 px-1">⤴</button>
      </div>
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-white p-8">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-5xl font-light text-gray-900 mb-3 flex items-center justify-center gap-2">
             Apple
          </h1>
          <input
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm mb-4"
            placeholder="Buscar en Google o introducir un sitio web"
          />
          <div className="grid grid-cols-4 gap-3 mt-6">
            {["📰 Noticias", "📷 Fotos", "🎵 Música", "🎬 TV"].map((s) => (
              <button key={s} className="bg-gray-100 hover:bg-gray-200 rounded-xl p-3 text-xs">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
