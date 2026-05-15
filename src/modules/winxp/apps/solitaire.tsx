"use client"

/** Stub Solitaire — full version lives in Win 95 module. */
export function Solitaire() {
  return (
    <div className="h-full bg-green-700 flex items-center justify-center text-white text-sm flex-col gap-2">
      <p>Solitario clásico de Windows XP</p>
      <p className="text-xs opacity-80">Para una versión jugable, abre Solitario en Windows 95.</p>
      <div className="grid grid-cols-7 gap-2 mt-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="w-12 h-16 bg-blue-900 border border-white/30 rounded"
            style={{
              background: "repeating-linear-gradient(45deg, #003090 0 4px, #0050b0 4px 8px)",
            }}
          />
        ))}
      </div>
    </div>
  )
}
