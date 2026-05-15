"use client"

interface TopBarProps {
  activitiesOpen: boolean
  activeTitle?: string
  time: Date
  onActivities: () => void
  onCalendar: () => void
}

export function TopBar({ activitiesOpen, activeTitle, time, onActivities, onCalendar }: TopBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 h-7 bg-black/60 backdrop-blur-md flex items-center px-3 text-white text-sm z-[2000]">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onActivities()
        }}
        className={`px-2 py-0.5 rounded ${activitiesOpen ? "bg-white/20" : "hover:bg-white/10"}`}
      >
        Activities
      </button>
      <span className="ml-3 text-xs">{activeTitle || "Ubuntu"}</span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onCalendar()
        }}
        className="absolute left-1/2 -translate-x-1/2 px-3 py-0.5 hover:bg-white/10 rounded text-xs"
      >
        {time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}{" "}
        {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
      </button>
      <div className="ml-auto flex items-center gap-2 text-xs">
        <span>📶</span>
        <span>🔊</span>
        <span>🔋</span>
      </div>
    </div>
  )
}
