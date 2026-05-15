"use client"

import { ARCH_HISTORY, ARCH_WIKI, I3_CONFIG } from "@/modules/arch/lib/ascii-art"

export function ConfigPane() {
  return (
    <div className="h-full bg-[#0d1117] p-3 overflow-auto text-xs text-gray-300">
      <pre className="whitespace-pre-wrap">{I3_CONFIG.join("\n")}</pre>
    </div>
  )
}

export function WikiPane() {
  return (
    <div className="h-full bg-[#0d1117] p-3 overflow-auto text-xs text-gray-200">
      <pre className="whitespace-pre-wrap">{ARCH_WIKI.join("\n")}</pre>
    </div>
  )
}

export function HistoryPane() {
  return (
    <div className="h-full bg-[#0d1117] p-3 overflow-auto text-xs text-gray-200">
      <pre className="whitespace-pre-wrap">{ARCH_HISTORY.join("\n")}</pre>
    </div>
  )
}
