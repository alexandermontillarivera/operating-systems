"use client"

interface GroupIconProps {
  icon: string
  label: string
  onOpen: () => void
}

/** Program Manager group icon — emoji + label, hover-invert. */
export function GroupIcon({ icon, label, onOpen }: GroupIconProps) {
  return (
    <button
      onDoubleClick={onOpen}
      className="flex flex-col items-center w-20 p-2 hover:bg-[#000080] hover:text-white text-black"
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-xs mt-1 text-center">{label}</span>
    </button>
  )
}
