"use client"

interface MenuBarProps {
  items: string[]
  onItemClick?: (item: string) => void
}

/** Generic Win 3.1 menu bar (File / Options / Window / Help) with underlined first letter. */
export function MenuBar({ items, onItemClick }: MenuBarProps) {
  return (
    <div className="bg-[#c0c0c0] border-b border-[#808080] px-1 py-0.5 flex gap-3 text-sm text-black select-none">
      {items.map((m) => (
        <button
          key={m}
          onClick={() => onItemClick?.(m)}
          className="hover:bg-[#000080] hover:text-white px-1"
        >
          <u>{m[0]}</u>
          {m.slice(1)}
        </button>
      ))}
    </div>
  )
}
