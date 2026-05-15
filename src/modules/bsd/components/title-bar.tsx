"use client"

interface TitleBarProps {
  user: string
  cwd: string
  onClose: () => void
}

/** ucbvax window header with the macOS-style traffic-light close button. */
export function TitleBar({ user, cwd, onClose }: TitleBarProps) {
  return (
    <div className="bg-[#333] text-white px-4 py-1 flex justify-between items-center border-b border-[#555] shrink-0 z-20 font-mono text-sm">
      <span>
        4.3 BSD - {user}@ucbvax.Berkeley.EDU:{cwd}
      </span>
      <button
        onClick={onClose}
        className="text-[#ff5f56] hover:text-[#ff8880] text-lg leading-none"
        aria-label="close"
      >
        x
      </button>
    </div>
  )
}
