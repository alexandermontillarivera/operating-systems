"use client"

interface CrtScreenProps {
  children: React.ReactNode
}

/** Apple II green-phosphor CRT — black bg, green #33ff33 text, scanlines, curvature. */
export function CrtScreen({ children }: CrtScreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black text-[#33ff33]">
      {children}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.35) 2px 3px)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.7), inset 0 0 30px rgba(51,255,51,0.08)",
        }}
      />
    </div>
  )
}
