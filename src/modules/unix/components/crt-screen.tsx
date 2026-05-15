"use client"

interface CrtScreenProps {
  children: React.ReactNode
}

/**
 * Wrapper that gives the terminal an authentic phosphor look:
 *  - black background
 *  - amber-tinted vignette
 *  - scanlines overlay
 *  - subtle CRT curvature shadow
 */
export function CrtScreen({ children }: CrtScreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black text-amber-400">
      {children}

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.35) 2px 3px)",
        }}
      />

      {/* Phosphor wash */}
      <div
        className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,176,0,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Vignette / curvature */}
      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          boxShadow: "inset 0 0 120px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,176,0,0.08)",
        }}
      />

      {/* Animated flicker (very subtle) */}
      <div
        className="absolute inset-0 pointer-events-none z-50 animate-pulse"
        style={{ background: "rgba(255,176,0,0.015)" }}
      />
    </div>
  )
}
