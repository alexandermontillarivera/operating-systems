"use client"

import { AppleMarkIcon } from "@/modules/mac-classic/components/icons"

interface MenuBarProps {
  appleOpen: boolean
  fileOpen: boolean
  onToggleApple: () => void
  onToggleFile: () => void
  activeApp?: string
  time: Date
}

const ITEMS = ["Edit", "View", "Special"] as const

/** Top white menu bar with Apple icon, File menu, app menus, and clock. */
export function MenuBar({
  appleOpen,
  fileOpen,
  onToggleApple,
  onToggleFile,
  activeApp,
  time,
}: MenuBarProps) {
  return (
    <div
      className="h-5 bg-white border-b-2 border-black flex items-center px-2 shadow-sm relative z-[10000] select-none"
      style={{ fontFamily: "'ChicagoFLF', 'Geneva', 'Lucida Grande', sans-serif" }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleApple()
        }}
        className={`px-1.5 ${appleOpen ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
      >
        <span className={appleOpen ? "[&>svg>path]:fill-white" : ""}>
          <AppleMarkIcon size={12} />
        </span>
      </button>

      <div className="flex items-center gap-2 ml-2 text-[12px]">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFile()
          }}
          className={`px-1.5 ${fileOpen ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
        >
          File
        </button>
        {ITEMS.map((m) => (
          <button key={m} className="px-1.5 hover:bg-black hover:text-white">
            {m}
          </button>
        ))}
        {activeApp && <span className="text-xs text-gray-500 ml-2">— {activeApp}</span>}
      </div>

      <div className="ml-auto text-[12px]">
        {time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
    </div>
  )
}
