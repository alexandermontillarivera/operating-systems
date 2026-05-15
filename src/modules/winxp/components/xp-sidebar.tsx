"use client"

interface XPSidebarProps {
  children: React.ReactNode
}

/** Blue gradient sidebar used in My Computer / My Documents / etc. */
export function XPSidebar({ children }: XPSidebarProps) {
  return (
    <div className="w-48 bg-gradient-to-b from-[#7da2ce] to-[#4477aa] p-2 text-white text-xs">
      {children}
    </div>
  )
}
