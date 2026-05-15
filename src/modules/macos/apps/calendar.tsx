"use client"

interface CalendarProps {
  time: Date
}

export function Calendar({ time }: CalendarProps) {
  const today = time.getDate()
  const month = time.getMonth()
  const year = time.getFullYear()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="h-full bg-white flex flex-col text-black">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-2xl font-semibold capitalize">
          {time.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Día</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Semana</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-red-500 text-white">
            Mes
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Año</button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-xs uppercase text-gray-500 border-b border-gray-200">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
          <div key={d} className="px-2 py-1 text-right border-r border-gray-200 last:border-r-0">
            {d}
          </div>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-7 grid-rows-6">
        {cells.map((c, i) => (
          <div key={i} className="border-r border-b border-gray-200 p-1 text-right text-sm">
            {c && (
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${c === today ? "bg-red-500 text-white" : ""}`}
              >
                {c}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
