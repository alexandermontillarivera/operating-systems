"use client"

interface ClockProps {
  time: Date
}

export function ClockGadget({ time }: ClockProps) {
  const hours = (time.getHours() % 12) + time.getMinutes() / 60
  const mins = time.getMinutes() + time.getSeconds() / 60
  const secs = time.getSeconds()
  return (
    <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/20 p-3 flex flex-col items-center text-white">
      <div className="text-xs opacity-70 mb-1">Reloj</div>
      <div className="w-24 h-24 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 border-4 border-gray-700 relative shadow-inner">
        {[12, 3, 6, 9].map((n, i) => {
          const angle = (i / 4) * Math.PI * 2
          const x = 50 + 38 * Math.sin(angle)
          const y = 50 - 38 * Math.cos(angle)
          return (
            <div
              key={n}
              className="absolute text-[8px] font-bold text-black"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            >
              {n}
            </div>
          )
        })}
        <div
          className="absolute left-1/2 top-1/2 origin-bottom bg-black"
          style={{ width: 2, height: 22, transform: `translate(-50%, -100%) rotate(${(hours / 12) * 360}deg)` }}
        />
        <div
          className="absolute left-1/2 top-1/2 origin-bottom bg-black"
          style={{ width: 1.5, height: 30, transform: `translate(-50%, -100%) rotate(${(mins / 60) * 360}deg)` }}
        />
        <div
          className="absolute left-1/2 top-1/2 origin-bottom bg-red-500"
          style={{ width: 1, height: 32, transform: `translate(-50%, -100%) rotate(${(secs / 60) * 360}deg)` }}
        />
        <div className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
}

export function WeatherGadget() {
  return (
    <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/20 p-3 text-white">
      <div className="text-xs opacity-70 mb-1">Clima</div>
      <div className="text-3xl">☀️</div>
      <div className="text-xl font-light">22°</div>
      <div className="text-xs opacity-80">Soleado</div>
      <div className="text-[10px] opacity-60 mt-1">Buenos Aires</div>
    </div>
  )
}

export function CalendarGadget({ time }: ClockProps) {
  const day = time.getDate()
  const monthName = time.toLocaleDateString("es-ES", { month: "long" })
  const dayName = time.toLocaleDateString("es-ES", { weekday: "long" })
  return (
    <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden text-white">
      <div className="bg-red-700 text-center py-1 text-xs uppercase">{monthName}</div>
      <div className="text-center py-2">
        <div className="text-4xl font-light">{day}</div>
        <div className="text-[10px] opacity-80 capitalize">{dayName}</div>
      </div>
    </div>
  )
}
