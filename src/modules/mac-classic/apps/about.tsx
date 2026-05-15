"use client"

import { AppleMarkIcon } from "@/modules/mac-classic/components/icons"

export function AboutApp() {
  return (
    <div
      className="h-full bg-[#cfd8d0] p-4 flex flex-col items-center text-sm text-black"
      style={{ fontFamily: "'ChicagoFLF', 'Geneva', sans-serif" }}
    >
      <AppleMarkIcon size={48} />
      <div className="font-bold text-base mb-1 mt-2">Macintosh System Software</div>
      <div className="text-xs mb-3">Version 6.0.8</div>
      <div className="border-t border-black w-full pt-2 text-xs space-y-1">
        <div className="flex justify-between">
          <span>Total Memory:</span>
          <span className="font-mono">512 K</span>
        </div>
        <div className="flex justify-between">
          <span>System Software:</span>
          <span className="font-mono">196 K</span>
        </div>
        <div className="flex justify-between">
          <span>Largest Unused Block:</span>
          <span className="font-mono">316 K</span>
        </div>
      </div>
      <div className="mt-auto text-[10px] text-gray-700">
        © Apple Computer, Inc. 1983-1991
      </div>
    </div>
  )
}
