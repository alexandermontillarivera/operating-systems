"use client"

import { useState } from "react"

export function IE9() {
  const [url, setUrl] = useState("https://bing.com")
  return (
    <div className="h-full flex flex-col bg-white text-black">
      <div className="bg-gradient-to-b from-blue-200 to-blue-300 px-2 py-1 flex items-center gap-2 border-b">
        <button className="px-2 py-1 text-xs bg-white/60 rounded">◀</button>
        <button className="px-2 py-1 text-xs bg-white/60 rounded">▶</button>
        <button className="px-2 py-1 text-xs bg-white/60 rounded">⟳</button>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-2 py-1 border border-blue-400 rounded text-sm"
        />
      </div>
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-white p-6">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-4xl font-light text-blue-700 mb-4">Bing</h1>
          <input className="w-full border-2 border-blue-400 rounded-full px-4 py-2 text-lg" placeholder="Buscar..." />
          <div className="flex justify-center gap-4 mt-4 text-xs text-blue-700">
            <a className="hover:underline">Imágenes</a>
            <a className="hover:underline">Videos</a>
            <a className="hover:underline">Mapas</a>
            <a className="hover:underline">Noticias</a>
          </div>
          <div className="mt-8 text-xs text-gray-500">
            Internet Explorer 9 - &quot;el navegador más rápido de Microsoft&quot;
          </div>
        </div>
      </div>
    </div>
  )
}
