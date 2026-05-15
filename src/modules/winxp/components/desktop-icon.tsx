"use client"

interface DesktopIconProps {
  label: string
  icon: React.ReactNode
  onOpen: () => void
}

export function DesktopIcon({ label, icon, onOpen }: DesktopIconProps) {
  return (
    <button
      onDoubleClick={onOpen}
      className="flex flex-col items-center p-2 hover:bg-white/20 rounded w-20 group"
    >
      <div className="mb-1 drop-shadow-lg">{icon}</div>
      <span
        className="text-white text-xs text-center px-1"
        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.85)" }}
      >
        {label}
      </span>
    </button>
  )
}
