"use client"

import { useEffect, useState } from "react"

/** Win 3.1 analog clock — circle with hour/minute/second hands. */
export function Clock() {
  const [t, setT] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hours = (t.getHours() % 12) + t.getMinutes() / 60
  const mins = t.getMinutes() + t.getSeconds() / 60
  const secs = t.getSeconds()

  return (
    <div className="h-full bg-[#c0c0c0] flex items-center justify-center text-black">
      <div className="w-44 h-44 rounded-full bg-white border-4 border-[#404040] relative shadow-inner">
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => {
          const angle = (i / 12) * Math.PI * 2
          const x = 50 + 42 * Math.sin(angle)
          const y = 50 - 42 * Math.cos(angle)
          return (
            <div
              key={n}
              className="absolute text-[10px] font-bold"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            >
              {n}
            </div>
          )
        })}
        <div
          className="absolute left-1/2 top-1/2 origin-bottom bg-black"
          style={{
            width: 3,
            height: 40,
            transform: `translate(-50%, -100%) rotate(${(hours / 12) * 360}deg)`,
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 origin-bottom bg-black"
          style={{
            width: 2,
            height: 55,
            transform: `translate(-50%, -100%) rotate(${(mins / 60) * 360}deg)`,
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 origin-bottom bg-red-600"
          style={{
            width: 1,
            height: 60,
            transform: `translate(-50%, -100%) rotate(${(secs / 60) * 360}deg)`,
          }}
        />
        <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
}
