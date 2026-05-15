"use client"

interface CrtScreenProps {
  children: React.ReactNode
}

/** Black screen w/ green phosphor and CRT framing — feels like a beige IBM PC monitor. */
export function CrtScreen({ children }: CrtScreenProps) {
  return (
    <div className="flex-1 relative overflow-hidden rounded-lg border-8 border-gray-800 shadow-2xl">
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
        }}
      />
      {/* Green phosphor wash */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-green-500/5 mix-blend-overlay" />

      {children}
    </div>
  )
}
