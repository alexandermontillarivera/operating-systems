"use client"

export function AboutDialog() {
  return (
    <div className="p-4 text-center text-sm h-full bg-[#c0c0c0] text-black" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <div className="grid grid-cols-2 gap-px w-12 h-12 mx-auto mb-3">
        <div className="bg-red-600" />
        <div className="bg-green-600" />
        <div className="bg-blue-600" />
        <div className="bg-yellow-500" />
      </div>
      <h2 className="font-bold mb-1">Microsoft Windows</h2>
      <p>Version 3.1</p>
      <p className="mb-2">Copyright © 1985-1992 Microsoft Corp.</p>
      <div className="border-t border-[#808080] pt-2 text-xs text-left">
        <p>Memory: 8,192 KB</p>
        <p>Free GDI Resources: 87%</p>
        <p>Free User Resources: 91%</p>
      </div>
    </div>
  )
}
