"use client"

import { useState } from "react"

const SECTIONS: Record<string, { icon: string; name: string }[]> = {
  Recientes: [
    { icon: "📄", name: "Documento.pdf" },
    { icon: "🖼️", name: "Foto.jpg" },
    { icon: "📦", name: "Proyecto.zip" },
    { icon: "🎵", name: "Canción.mp3" },
    { icon: "📝", name: "Notas.txt" },
  ],
  Aplicaciones: [
    { icon: "🧭", name: "Safari" },
    { icon: "✉️", name: "Mail" },
    { icon: "🎵", name: "Música" },
    { icon: "📝", name: "Notas" },
    { icon: "🔢", name: "Calculadora" },
    { icon: "🗓️", name: "Calendario" },
  ],
  Documentos: [
    { icon: "📄", name: "Carta.docx" },
    { icon: "📄", name: "Presupuesto.xlsx" },
    { icon: "📄", name: "Proyecto.pdf" },
  ],
  Descargas: [
    { icon: "📦", name: "macos-installer.dmg" },
    { icon: "🖼️", name: "wallpaper.heic" },
  ],
}

const SIDEBAR = ["AirDrop", "Recientes", "Aplicaciones", "Escritorio", "Documentos", "Descargas"]

export function Finder() {
  const [section, setSection] = useState("Recientes")
  return (
    <div className="h-full bg-gray-50 flex text-black">
      <div className="w-48 bg-gray-100/80 backdrop-blur-xl p-3 border-r border-gray-200 text-sm">
        <div className="text-xs text-gray-500 font-semibold mb-2">Favoritos</div>
        {SIDEBAR.map((item) => (
          <button
            key={item}
            onClick={() => setSection(item in SECTIONS ? item : section)}
            className={`w-full px-2 py-1 text-left hover:bg-gray-200 rounded flex items-center gap-2 ${section === item ? "bg-gray-200" : ""}`}
          >
            <span className="text-gray-500">📁</span>
            {item}
          </button>
        ))}
        <div className="text-xs text-gray-500 font-semibold mb-2 mt-4">iCloud</div>
        {["iCloud Drive", "Compartido"].map((item) => (
          <button key={item} className="w-full px-2 py-1 text-left hover:bg-gray-200 rounded flex items-center gap-2">
            <span className="text-blue-500">☁️</span>
            {item}
          </button>
        ))}
      </div>
      <div className="flex-1 p-4">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b">
          <button className="p-1 hover:bg-gray-200 rounded">◀</button>
          <button className="p-1 hover:bg-gray-200 rounded">▶</button>
          <span className="text-sm font-semibold ml-2">{section}</span>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {(SECTIONS[section] || SECTIONS.Recientes).map((file, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-2 hover:bg-blue-100 rounded-lg cursor-pointer"
            >
              <span className="text-4xl mb-1">{file.icon}</span>
              <span className="text-xs text-center truncate w-full">{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
