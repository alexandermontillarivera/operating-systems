"use client"

import { RecycleBinIcon } from "@/modules/win95/components/icons"

export function RecycleBin() {
  return (
    <div
      className="h-full bg-white flex flex-col items-center justify-center text-[11px] text-gray-600"
      style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <RecycleBinIcon size={48} />
      <div className="mt-2">La papelera está vacía.</div>
    </div>
  )
}
