"use client"

import { CDRomIcon, FloppyIcon, FolderIcon, HardDiskIcon, NetworkIcon, SettingsIcon } from "@/modules/win95/components/icons"

interface MyComputerProps {
  onOpenC: () => void
}

export function MyComputer({ onOpenC }: MyComputerProps) {
  const drives = [
    { icon: <FloppyIcon size={32} />, name: "Disco 3½ (A:)" },
    { icon: <HardDiskIcon size={32} />, name: "Disco local (C:)", onOpen: onOpenC },
    { icon: <CDRomIcon size={32} />, name: "CD-ROM (D:)" },
    { icon: <FolderIcon size={32} />, name: "Panel de control" },
    { icon: <NetworkIcon size={32} />, name: "Red" },
    { icon: <SettingsIcon size={32} />, name: "Acceso telefónico" },
  ]
  return (
    <div className="h-full bg-white flex flex-col" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <div className="bg-[#c0c0c0] px-1 py-0.5 flex gap-2 text-[11px] border-b border-[#808080]">
        {["Archivo", "Edición", "Ver", "Ayuda"].map((m) => (
          <button key={m} className="px-1 hover:bg-[#000080] hover:text-white">
            <u>{m[0]}</u>
            {m.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex-1 p-2">
        <div className="grid grid-cols-4 gap-x-2 gap-y-3">
          {drives.map((d, i) => (
            <button
              key={i}
              onDoubleClick={d.onOpen}
              className="flex flex-col items-center p-1 group"
            >
              <div className="mb-0.5">{d.icon}</div>
              <span className="text-[11px] text-center px-1 group-hover:bg-[#000080] group-hover:text-white">
                {d.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="bg-[#c0c0c0] px-2 py-0.5 text-[11px] border-t border-white flex"
        style={{ boxShadow: "inset 0 -1px 0 0 #808080" }}
      >
        <div
          className="px-2"
          style={{ boxShadow: "inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #fff" }}
        >
          {drives.length} objeto(s)
        </div>
      </div>
    </div>
  )
}
