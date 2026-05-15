"use client"

import { useState } from "react"

export function InternetExplorer() {
  const [url, setUrl] = useState("about:home")

  return (
    <div className="h-full flex flex-col bg-white text-black">
      <div className="bg-gradient-to-b from-[#ECE9D8] to-[#D4D0C8] border-b border-[#a09f95] px-2 py-0.5 flex gap-3 text-xs">
        {["Archivo", "Edición", "Ver", "Favoritos", "Herramientas", "Ayuda"].map((m) => (
          <span key={m} className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">{m}</span>
        ))}
      </div>
      <div className="bg-gradient-to-b from-[#ECE9D8] to-[#D4D0C8] px-2 py-1 flex items-center gap-2 border-b border-[#a09f95]">
        <button className="px-2 py-1 text-xs hover:bg-blue-100 rounded">◀ Atrás</button>
        <button className="px-2 py-1 text-xs hover:bg-blue-100 rounded">▶</button>
        <button className="px-2 py-1 text-xs hover:bg-blue-100 rounded">⟳</button>
        <button className="px-2 py-1 text-xs hover:bg-blue-100 rounded">🏠</button>
        <span className="text-xs">Dirección:</span>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!url.startsWith("http") && !url.startsWith("about:")) setUrl("http://" + url)
            }
          }}
          className="flex-1 px-2 py-0.5 border border-gray-500 text-xs"
        />
        <button className="px-3 py-0.5 text-xs bg-gradient-to-b from-green-400 to-green-600 text-white rounded">
          Ir
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {url === "about:home" || url === "" ? (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-full p-6">
            <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto text-center">
              <h1 className="text-2xl font-bold text-blue-700 mb-2">MSN.com</h1>
              <p className="text-sm text-gray-700 mb-4">La página de inicio de Internet Explorer 6</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <button
                  onClick={() => setUrl("https://msn.com/news")}
                  className="border border-blue-300 p-2 rounded hover:bg-blue-50"
                >
                  📰 Noticias
                </button>
                <button
                  onClick={() => setUrl("https://msn.com/sport")}
                  className="border border-blue-300 p-2 rounded hover:bg-blue-50"
                >
                  ⚽ Deportes
                </button>
                <button
                  onClick={() => setUrl("https://hotmail.com")}
                  className="border border-blue-300 p-2 rounded hover:bg-blue-50"
                >
                  📧 Hotmail
                </button>
                <button
                  onClick={() => setUrl("https://msn.com/weather")}
                  className="border border-blue-300 p-2 rounded hover:bg-blue-50"
                >
                  ☀️ Clima
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-sm">
            <h2 className="text-xl font-bold mb-2">⚠️ No se puede mostrar la página</h2>
            <p className="text-gray-700 mb-4">
              Internet Explorer no pudo conectarse a <strong>{url}</strong>.
            </p>
            <p className="text-xs text-gray-500">
              Esta es una simulación local. Volvé a la página de inicio para ver el contenido demo.
            </p>
            <button
              onClick={() => setUrl("about:home")}
              className="mt-3 px-4 py-1 bg-gradient-to-b from-[#ECE9D8] to-[#D4D0C8] border border-gray-500 text-xs"
            >
              Ir a inicio
            </button>
          </div>
        )}
      </div>
      <div className="border-t border-[#a09f95] bg-[#ECE9D8] px-2 py-0.5 text-[10px] text-gray-700 flex justify-between">
        <span>Listo</span>
        <span>MSN.com</span>
      </div>
    </div>
  )
}
