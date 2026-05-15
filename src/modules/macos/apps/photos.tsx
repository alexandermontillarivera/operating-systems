"use client"

export function Photos() {
  return (
    <div className="h-full bg-black grid grid-cols-4 gap-1 p-1">
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded"
          style={{
            background: `linear-gradient(${i * 23}deg, hsl(${i * 30}, 70%, 60%), hsl(${i * 50}, 70%, 30%))`,
          }}
        />
      ))}
    </div>
  )
}
