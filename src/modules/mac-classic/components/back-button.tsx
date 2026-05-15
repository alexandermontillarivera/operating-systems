"use client"

interface BackButtonProps {
  onClick: () => void
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-4 left-4 px-3 py-1 bg-white border-2 border-black text-sm shadow z-50"
      style={{ fontFamily: "'ChicagoFLF', 'Geneva', sans-serif" }}
    >
      Volver
    </button>
  )
}
