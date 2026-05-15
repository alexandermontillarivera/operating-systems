"use client"

interface CrtScreenProps {
  children: React.ReactNode
}

/** Black bg, amber text, scanlines and vignette — like a VT100 with phosphor glow. */
export function CrtScreen({ children }: CrtScreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black text-amber-400">
      {children}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  )
}
