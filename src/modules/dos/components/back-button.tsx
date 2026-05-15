"use client"

interface BackButtonProps {
  onClick: () => void
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-6 py-2 bg-green-900/50 text-green-400 rounded border border-green-700 hover:bg-green-900 transition-colors font-mono self-start"
    >
      {"<"} Volver al Timeline
    </button>
  )
}
