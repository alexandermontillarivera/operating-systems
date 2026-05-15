"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function MediaPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 2)), 100)
    return () => clearInterval(id)
  }, [playing])

  return (
    <div className="h-full bg-gradient-to-b from-blue-900 via-black to-black flex flex-col text-white">
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-center gap-1 p-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: playing ? `${Math.random() * 80 + 10}%` : "5%" }}
              transition={{ duration: 0.2 }}
              className="w-3 bg-gradient-to-t from-cyan-400 to-blue-300 rounded-t"
            />
          ))}
        </div>
        <div className="relative z-10 text-center">
          <p className="text-cyan-300 text-lg">Windows XP Startup</p>
          <p className="text-cyan-400/70 text-xs">Microsoft Sound Library</p>
        </div>
      </div>
      <div className="p-3 bg-gradient-to-t from-blue-950 to-transparent">
        <div className="h-1 bg-blue-900/60 rounded mb-3">
          <div className="h-full bg-cyan-400 rounded transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="text-xl">⏮</button>
          <button
            onClick={() => setPlaying(!playing)}
            className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center text-blue-950 text-xl"
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button className="text-xl">⏭</button>
        </div>
      </div>
    </div>
  )
}
