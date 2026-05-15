"use client"

import { NEOFETCH_ART } from "@/modules/arch/lib/ascii-art"

const SYSTEM_INFO: [string, string][] = [
  ["OS", "Arch Linux x86_64"],
  ["Host", "Generic VM"],
  ["Kernel", "6.9.1-arch1-1"],
  ["Uptime", "3 hours, 42 mins"],
  ["Packages", "847 (pacman) + 23 (AUR)"],
  ["Shell", "zsh 5.9"],
  ["Resolution", "1920x1080"],
  ["WM", "i3-gaps"],
  ["Theme", "Arc-Dark"],
  ["Terminal", "alacritty"],
  ["CPU", "AMD Ryzen 7 (8) @ 3.7GHz"],
  ["GPU", "NVIDIA RTX 3060"],
  ["Memory", "2048MiB / 16384MiB"],
]

export function NeofetchPane() {
  return (
    <div className="h-full bg-[#0d1117] p-3 overflow-auto text-xs text-gray-200">
      <div className="flex gap-4">
        <pre className="text-[#1793D1] leading-tight">{NEOFETCH_ART.join("\n")}</pre>
        <div>
          <div>
            <span className="text-[#1793D1]">archer</span>@<span className="text-[#1793D1]">archlinux</span>
          </div>
          <div className="text-gray-500">-----------------</div>
          {SYSTEM_INFO.map(([k, v]) => (
            <div key={k}>
              <span className="text-[#1793D1]">{k}:</span> {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
