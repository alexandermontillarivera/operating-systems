"use client"

interface StatusBarProps {
  user: string
  cwd: string
  modeLabel: string
}

/** Top status strip with user@host:cwd on the left and editor/system label on the right. */
export function StatusBar({ user, cwd, modeLabel }: StatusBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-40 bg-amber-950/40 border-b border-amber-800/40 px-4 py-1 text-xs text-amber-300 flex justify-between font-mono">
      <span>
        {user}@bell-labs:{cwd}
      </span>
      <span>{modeLabel}</span>
    </div>
  )
}
