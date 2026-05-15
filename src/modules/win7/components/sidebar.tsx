"use client"

interface SidebarProps {
  items: { icon: string; label: string }[]
}

/** Aero left sidebar used in Computer / Documents windows. */
export function Win7Sidebar({ items }: SidebarProps) {
  return (
    <div className="w-48 bg-gradient-to-b from-blue-50 to-blue-100 p-2 border-r border-blue-200 text-sm">
      <div className="text-xs text-gray-600 mb-2 px-2 font-semibold">Favoritos</div>
      <div className="space-y-1">
        {items.map((it, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-2 px-2 py-1 hover:bg-blue-200 rounded text-xs"
          >
            <span>{it.icon}</span> {it.label}
          </button>
        ))}
      </div>
    </div>
  )
}
