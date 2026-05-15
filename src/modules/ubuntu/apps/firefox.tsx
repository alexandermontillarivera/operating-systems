"use client"

import { useState } from "react"

export function Firefox() {
  const [url, setUrl] = useState("https://ubuntu.com")
  return (
    <div className="h-full flex flex-col bg-white text-black">
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 px-2 py-1 flex items-center gap-2">
        <button className="text-gray-600 px-1">◀</button>
        <button className="text-gray-600 px-1">▶</button>
        <button className="text-gray-600 px-1">⟳</button>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-white border border-gray-300 rounded-full px-3 py-1 text-sm"
        />
        <button className="text-gray-600 px-1">≡</button>
      </div>
      <div className="flex-1 bg-gradient-to-br from-orange-50 to-purple-50 p-8 overflow-auto">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#E95420] flex items-center justify-center text-white text-2xl font-bold">
              U
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#772953]">Ubuntu</h1>
              <p className="text-sm text-gray-700">Linux for human beings</p>
            </div>
          </div>
          <p className="text-sm mb-4">
            Ubuntu es una distribución Linux basada en Debian, lanzada por Canonical en 2004 con el objetivo de hacer Linux accesible para todos.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {["Desktop", "Server", "Cloud", "IoT"].map((s) => (
              <div key={s} className="border border-gray-200 rounded-lg p-3 hover:border-[#E95420] cursor-pointer">
                <div className="font-semibold">{s}</div>
                <div className="text-xs text-gray-600">Ubuntu para {s.toLowerCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
