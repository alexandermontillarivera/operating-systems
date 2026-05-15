"use client"

import { useEffect, useState } from "react"

const ALBUMS = [
  { title: "Chill Vibes", artist: "Various", color: "from-blue-500 to-purple-500" },
  { title: "Focus Flow", artist: "Lo-Fi Beats", color: "from-green-500 to-teal-500" },
  { title: "Energy Boost", artist: "Workout", color: "from-orange-500 to-red-500" },
  { title: "Late Night", artist: "Jazz", color: "from-purple-500 to-pink-500" },
  { title: "Roadtrip", artist: "Indie", color: "from-yellow-500 to-orange-500" },
  { title: "Sunset", artist: "Ambient", color: "from-pink-500 to-red-500" },
] as const

export function Music() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(35)
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 100)
    return () => clearInterval(id)
  }, [playing])
  return (
    <div className="h-full bg-gradient-to-b from-gray-900 to-black flex flex-col text-white">
      <div className="flex flex-1">
        <div className="w-48 bg-black/50 p-4 border-r border-white/10">
          <h3 className="text-xs text-gray-500 font-semibold mb-2">Biblioteca</h3>
          {["Escuchar ahora", "Explorar", "Radio", "Playlists", "Canciones", "Álbumes", "Artistas"].map((item) => (
            <button key={item} className="w-full px-2 py-1 text-left text-sm hover:bg-white/10 rounded">
              {item}
            </button>
          ))}
        </div>
        <div className="flex-1 p-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-6">Escuchar ahora</h2>
          <div className="grid grid-cols-3 gap-4">
            {ALBUMS.map((album, i) => (
              <div key={i} className="group cursor-pointer">
                <div
                  className={`aspect-square bg-gradient-to-br ${album.color} rounded-lg mb-2 flex items-center justify-center relative overflow-hidden`}
                >
                  <span className="text-6xl">🎵</span>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      onClick={() => setPlaying(!playing)}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                    >
                      <span className="text-black text-2xl">{playing ? "⏸" : "▶"}</span>
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-sm">{album.title}</p>
                <p className="text-xs text-gray-400">{album.artist}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-20 bg-gray-900/80 backdrop-blur border-t border-white/10 flex items-center px-4 gap-4">
        <div className="flex items-center gap-3 w-48">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded flex items-center justify-center">
            🎵
          </div>
          <div>
            <p className="text-sm font-semibold">Now Playing</p>
            <p className="text-xs text-gray-400">Artist Name</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white">⏮</button>
            <button
              onClick={() => setPlaying(!playing)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black"
            >
              {playing ? "⏸" : "▶"}
            </button>
            <button className="text-gray-400 hover:text-white">⏭</button>
          </div>
          <div className="w-full max-w-md flex items-center gap-2">
            <span className="text-xs text-gray-400">1:24</span>
            <div className="flex-1 h-1 bg-gray-700 rounded-full">
              <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-gray-400">3:45</span>
          </div>
        </div>
        <div className="w-32 flex items-center gap-2">
          <span>🔊</span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full">
            <div className="h-full w-2/3 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
