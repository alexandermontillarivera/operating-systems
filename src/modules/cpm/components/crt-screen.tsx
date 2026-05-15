"use client"

interface CrtScreenProps {
  children: React.ReactNode
}

/** Navy-blue CP/M look with subtle scanlines. */
export function CrtScreen({ children }: CrtScreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#000080] text-white">
      {children}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.25) 2px 3px)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  )
}
